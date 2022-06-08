import { MiddlewareFn, ResponseError } from '../types';
import Comment from '../models/Comment';
import { IUser } from '../models/User';
import {
  ValidationChain,
  body,
  validationResult,
} from 'express-validator';
import passport from '../config/passport';
import BlogPost from '../models/BlogPost';
import { HydratedDocument } from 'mongoose';

const allBlogPostCommentsGET: MiddlewareFn = async (req, res, next) => {
  try {
    const comments = await Comment.find({ post: req.params.postId });
    return res.json({ success: true, comments });
  } catch (err) {
    return next(err);
  }
};

const commentCREATE = (() => {
  const validationChain: ValidationChain[] = [
    body('author')
      .trim()
      .customSanitizer((value) => {
        if (!value) {
          return 'Anonymous';
        }
        return value;
      }),
    body('text')
      .trim()
      .not()
      .isEmpty()
      .withMessage('Comment should contain something, right?'),
  ];

  const middlewareChain: MiddlewareFn[] = [
    async (req, res, next) => {
      const errors = validationResult(req);

      if (!errors.isEmpty()) {
        return res.json({ success: false, errors: errors.mapped() });
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

const commentDELETE = (() => {
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

export { allBlogPostCommentsGET, commentCREATE, commentDELETE };
