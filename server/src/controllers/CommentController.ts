import { MiddlewareFn, ResponseError } from '../types';
import Comment from '../models/Comment';
import { IUser } from '../models/User';
import {
  ValidationChain,
  body,
  validationResult,
} from 'express-validator';
import passport from '../config/passport';
import BlogPost, { IBlogPost } from '../models/BlogPost';
import { HydratedDocument } from 'mongoose';
import profanityFilter from '../config/profanity-filter';

const getAllForPost: MiddlewareFn = async (req, res, next) => {
  try {
    const comments = await Comment.find({ post: req.params.postId })
      .sort({
        date: 'desc',
      })
      .populate('post');

    if (
      comments[0] &&
      !(comments[0].post as unknown as HydratedDocument<IBlogPost>)
        .datePublished
    ) {
      return res.json({ success: false });
    }

    return res.json({ success: true, comments });
  } catch (err) {
    return next(err);
  }
};

const getAllForAuthorPost = (() => {
  const middlewareChain: MiddlewareFn[] = [
    passport.authenticate('jwt', { session: false }),
    async (req, res, next) => {
      try {
        const comments = await Comment.find({ post: req.params.postId })
          .sort({
            date: 'desc',
          })
          .populate({
            path: 'post',
            populate: { path: 'author', model: 'user' },
          });

        // Make sure the author queries their own posts only
        if (
          comments[0] &&
          (comments[0].post as unknown as HydratedDocument<IBlogPost>)
            .author.id !== (req.user as HydratedDocument<IUser>).id
        ) {
          return res.json({ success: false });
        }

        return res.json({ success: true, comments });
      } catch (err) {
        return next(err);
      }
    },
  ];

  return [...middlewareChain];
})();

const create = (() => {
  const validationChain: ValidationChain[] = [
    body('author')
      .trim()
      .customSanitizer((value) => {
        if (!value) {
          return 'Anonymous';
        }
        return profanityFilter.clean(value);
      }),
    body('text')
      .trim()
      .not()
      .isEmpty()
      .withMessage('Comment should contain something, right?')
      .customSanitizer((value) => profanityFilter.clean(value)),
  ];

  const middlewareChain: MiddlewareFn[] = [
    async (req, res, next) => {
      const errors = validationResult(req);

      if (!errors.isEmpty()) {
        return res.json({ success: false, errors: errors.array() });
      }

      const post = await BlogPost.findOne({ _id: req.params.postId });

      if (!post) {
        const err: ResponseError = new Error();
        err.status = 404;
        res.status(404);
        return next(err);
      }

      if (!post.datePublished) {
        return res.json({ success: false });
      }

      const comment = new Comment({
        text: req.body.text,
        author: req.body.author,
        post: req.params.postId,
        date: new Date(),
      });
      try {
        await comment.save();

        return res.json({ success: true, comment });
      } catch (err) {
        return next(err);
      }
    },
  ];

  return [...validationChain, ...middlewareChain];
})();

const deleteOne = (() => {
  // Comments can be deleted by the post author only
  const middlewareChain: MiddlewareFn[] = [
    passport.authenticate('jwt', { session: false }),
    async (req, res, next) => {
      try {
        const post = await BlogPost.findById(req.params.postId).populate(
          'author',
        );

        if (!post) {
          const err: ResponseError = new Error('Post not found');
          err.status = 404;
          return next(err);
        }

        if (post.author.id !== (req.user as HydratedDocument<IUser>).id) {
          const err: ResponseError = new Error(
            'You are not the author of the post',
          );
          err.status = 401;
        }

        await Comment.deleteOne({ _id: req.params.commentId });

        res.json({ success: true });
      } catch (err) {
        return next(err);
      }
    },
  ];

  return [...middlewareChain];
})();

export { getAllForPost, create, deleteOne, getAllForAuthorPost };
