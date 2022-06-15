import { MiddlewareFn, ResponseError } from '../types';
import {
  ValidationChain,
  validationResult,
  body,
} from 'express-validator';

import passport from '../config/passport';
import * as jwt from 'jsonwebtoken';
import * as bcrypt from 'bcrypt';

import User, { IUser } from '../models/User';
import { HydratedDocument } from 'mongoose';

const signup = (() => {
  const validationChain: ValidationChain[] = [
    body('username')
      .trim()
      .not()
      .isEmpty()
      .withMessage('Username is required')
      .bail()
      .isAlphanumeric()
      .withMessage('Username can contain only letters and numbers')
      .custom(async (value: string, { req }) => {
        const userCheck = await User.findOne({
          username: req.body.username,
        });

        if (userCheck) {
          return Promise.reject();
        }
      })
      .withMessage('Username already exists'),
    body('password')
      .not()
      .isEmpty()
      .withMessage('Password is required')
      .isLength({ min: 6 })
      .withMessage('Password should be at least 6 characters long'),
    body('passwordConfirm')
      .not()
      .isEmpty()
      .withMessage('Password confirmation is required')
      .custom((value, { req }) => value === req.body.password)
      .withMessage('Passwords do not match'),
  ];

  const middlewareChain: MiddlewareFn[] = [
    async (req, res, next) => {
      const errors = await validationResult(req);

      if (!errors.isEmpty()) {
        return res.json({
          ...req.body,
          success: false,
          errors: errors.array(),
        });
      }

      try {
        const hashedPassword = await bcrypt.hash(req.body.password, 10);

        const user = new User({
          username: req.body.username,
          password: hashedPassword,
        });

        await user.save();

        const token = jwt.sign({ sub: user.id }, process.env.JWTSECRET!, {
          expiresIn: '4383h',
        });

        return res.json({ success: true, token });
      } catch (err) {
        return next(err);
      }
    },
  ];

  return [...validationChain, ...middlewareChain];
})();

const login = (() => {
  const validationChain: ValidationChain[] = [
    body('username')
      .trim()
      .not()
      .isEmpty()
      .withMessage('Username is required'),
    body('password').not().isEmpty().withMessage('Password is required'),
  ];

  const middlewareChain: MiddlewareFn[] = [
    async (req, res, next) => {
      const errors = validationResult(req);

      if (!errors.isEmpty()) {
        return res.json({
          ...req.body,
          success: false,
          errors: errors.array(),
        });
      }

      return next();
    },
    (req, res, next) => {
      passport.authenticate(
        'local',
        {
          session: false,
        },
        (
          err: ResponseError,
          user: Express.User,
          info: { message: string },
        ) => {
          if (err) {
            return next(err);
          }

          if (!user) {
            return res.json({
              success: false,
              errors: [{ msg: info.message, status: 401 }],
            });
          } else {
            const token = jwt.sign(
              { sub: (user as HydratedDocument<IUser>).id },
              process.env.JWTSECRET!,
              {
                expiresIn: '180d',
              },
            );

            return res.json({
              success: true,
              token,
            });
          }
        },
      )(req, res, next);
    },
  ];

  return [...validationChain, ...middlewareChain];
})();

export { signup, login };
