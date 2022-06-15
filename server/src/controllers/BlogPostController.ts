import {
  ValidationChain,
  validationResult,
  body,
} from 'express-validator';
import passport from '../config/passport';
import BlogPost from '../models/BlogPost';
import User, { IUser } from '../models/User';
import { MiddlewareFn, ResponseError } from '../types';
import { HydratedDocument } from 'mongoose';

const create = (() => {
  const middlewareChain: MiddlewareFn[] = [
    passport.authenticate('jwt', { session: false }),
    async (req, res, next) => {
      const errors = validationResult(req);

      if (!errors.isEmpty()) {
        return res.json({ success: false, errors });
      }

      const blogPost = new BlogPost({
        title: req.body.title,
        text: req.body.text,
        datePublished: req.body.shouldPublish ? new Date() : null,
        author: (req.user as HydratedDocument<IUser>).id,
      });

      try {
        await blogPost.save();

        res.json({ success: true, blogPost });
      } catch (err) {
        return next(err);
      }
    },
  ];

  const validationChain: ValidationChain[] = [
    body('title')
      .trim()
      .not()
      .isEmpty()
      .withMessage('Title should not be empty'),
    body('text')
      .trim()
      .not()
      .isEmpty()
      .withMessage('Text should not be empty. Write something :)'),
  ];

  return [...validationChain, ...middlewareChain];
})();

const update = (() => {
  const middlewareChain: MiddlewareFn[] = [
    passport.authenticate('jwt', { session: false }),
    async (req, res, next) => {
      const errors = validationResult(req);

      if (!errors.isEmpty()) {
        return res.json({ success: false, errors: errors.array() });
      }

      const post = await BlogPost.findById(req.params.postId).populate(
        'author',
      );

      if (!post) {
        const err: ResponseError = new Error('Post not found');
        err.status = 404;
        return next(err);
      }

      const author = await User.findById(post.author.id);

      if (!author) {
        const err: ResponseError = new Error(
          'Failed to validate the author',
        );
        err.status = 500;
        return next(err);
      }

      if (author.id !== (req.user as HydratedDocument<IUser>).id) {
        const err: ResponseError = new Error(
          'You are not the author of the post',
        );
        err.status = 403;

        return next(err);
      }

      const blogPost = new BlogPost({
        title: req.body.title,
        text: req.body.text,
        datePublished: req.body.shouldPublish
          ? post.datePublished || new Date()
          : null,
        author: (req.user as HydratedDocument<IUser>).id,
        _id: req.params.postId,
      });

      try {
        await BlogPost.updateOne({ _id: req.params.postId }, blogPost);

        res.json({ success: true, blogPost });
      } catch (err) {
        return next(err);
      }
    },
  ];

  const validationChain: ValidationChain[] = [
    body('title')
      .trim()
      .not()
      .isEmpty()
      .withMessage('Title should not be empty'),
    body('text')
      .trim()
      .not()
      .isEmpty()
      .withMessage('Text should not be empty. Write something :)'),
  ];

  return [...validationChain, ...middlewareChain];
})();

const deleteOne = (() => {
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

        const postAuthor = await User.findById(post.author.id);

        if (!postAuthor) {
          const err: ResponseError = new Error(
            'Failed to validate the author',
          );
          err.status = 500;

          return next(err);
        }

        if (postAuthor.id !== (req.user as HydratedDocument<IUser>).id) {
          const err: ResponseError = new Error(
            'You are not the author of the post',
          );
          err.status = 403;

          return next(err);
        }

        await BlogPost.deleteOne({ _id: post.id });

        return res.json({ success: true });
      } catch (err) {
        return next(err);
      }
    },
  ];

  return [...middlewareChain];
})();

const get: MiddlewareFn = async (req, res, next) => {
  try {
    const blogPost = await BlogPost.findOne({
      _id: req.params.postId,
      datePublished: { $ne: null },
    }).populate('author', 'username');

    return res.json({ success: blogPost ? true : false, blogPost });
  } catch (err) {
    return next(err);
  }
};

const getAuthorsOwn = (() => {
  const middlewareChain: MiddlewareFn[] = [
    passport.authenticate('jwt', { session: false }),
    async (req, res, next) => {
      try {
        const blogPost = await BlogPost.findOne({
          author: (req.user as HydratedDocument<IUser>)._id,
          _id: req.params.postId,
        }).populate('author', 'username');

        return res.json({ success: blogPost ? true : false, blogPost });
      } catch (err) {
        return next(err);
      }
    },
  ];

  return [...middlewareChain];
})();

const getPaginated: MiddlewareFn = async (req, res, next) => {
  try {
    let perPage = 4;

    if (req.query.perpage && Number(req.query.perpage)) {
      if (Number(req.query.perpage) <= 30) {
        perPage = Number(req.query.perpage);
      } else {
        perPage = 30;
      }
    }

    const page = Number(req.query.page) || 0;

    const blogPosts = await BlogPost.find({ datePublished: { $ne: null } })
      .limit(perPage)
      .skip(perPage * page)
      .sort({ datePublished: 'desc' })
      .populate('author', 'username');

    return res.json({ success: true, blogPosts: blogPosts });
  } catch (err) {
    return next(err);
  }
};

const getAuthorsOwnPaginated = (() => {
  const MiddlewareChain: MiddlewareFn[] = [
    passport.authenticate('jwt', { session: false }),
    async (req, res, next) => {
      try {
        let perPage = 4;

        if (req.query.perpage && Number(req.query.perpage)) {
          if (Number(req.query.perpage) <= 30) {
            perPage = Number(req.query.perpage);
          } else {
            perPage = 30;
          }
        }

        const page = Number(req.query.page) || 0;

        const blogPosts = await BlogPost.find({
          author: (req.user as HydratedDocument<IUser>)._id,
          datePublished:
            req.query.type === 'published' ? { $ne: null } : null,
        })
          .limit(perPage)
          .skip(perPage * page)
          .sort({ datePublished: 'desc' })
          .populate('author', 'username');

        return res.json({ success: true, blogPosts: blogPosts });
      } catch (err) {
        return next(err);
      }
    },
  ];

  return [...MiddlewareChain];
})();

const getTotalCount: MiddlewareFn = async (req, res, next) => {
  try {
    const blogPostsCount = await BlogPost.find({
      datePublished: { $ne: null },
    }).count();

    res.json({ success: true, blogPostsCount });
  } catch (err) {
    return next(err);
  }
};

const getAuthorsOwnTotalCount = (() => {
  const middlewareChain: MiddlewareFn[] = [
    passport.authenticate('jwt', { session: false }),
    async (req, res, next) => {
      try {
        const blogPostsCount = await BlogPost.find({
          author: (req.user as HydratedDocument<IUser>)._id,
          datePublished:
            req.query.type === 'published' ? { $ne: null } : null,
        }).count();

        res.json({ success: true, blogPostsCount });
      } catch (err) {
        return next(err);
      }
    },
  ];

  return [...middlewareChain];
})();

export {
  get,
  getAuthorsOwn,
  getPaginated,
  getAuthorsOwnPaginated,
  getTotalCount,
  getAuthorsOwnTotalCount,
  create,
  update,
  deleteOne,
};
