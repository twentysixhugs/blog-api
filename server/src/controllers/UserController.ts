import { MiddlewareFn } from '../types';
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

const signupPOST = (() => {
  const validationChain: ValidationChain[] = [
    body('username')
      .trim()
      .escape()
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
  ];

  const middlewareChain: MiddlewareFn[] = [
    async (req, res, next) => {
      const errors = await validationResult(req);

      if (!errors.isEmpty()) {
        return res.json({ ...req.body, success: false, errors: errors });
      }

      try {
        const hashedPassword = await bcrypt.hash(req.body.password, 10);

        const user = new User({
          username: req.body.username,
          password: hashedPassword,
        });

        await user.save();

        const token = jwt.sign({ sub: user.id }, process.env.JWTSECRET!, {
          expiresIn: '24h',
        });

        return res.json({ success: true, token });
      } catch (err) {
        return next(err);
      }
    },
  ];

  return [...validationChain, ...middlewareChain];
})();

const loginPOST = (() => {
  const validationChain: ValidationChain[] = [
    body('username')
      .trim()
      .not()
      .isEmpty()
      .withMessage('Username is required')
      .escape(),
    body('password').not().isEmpty().withMessage('Password is required'),
  ];

  const middlewareChain: MiddlewareFn[] = [
    passport.authenticate('local', { session: false }),
    async (req, res, next) => {
      const errors = validationResult(req);

      if (!errors.isEmpty()) {
        return res.json({ ...req.body, success: false, errors: errors });
      }

      const token = jwt.sign(
        { sub: (req.user as HydratedDocument<IUser>).id },
        process.env.JWTSECRET!,
        {
          expiresIn: '180d',
        },
      );

      return res.json({
        success: true,
        token,
      });
    },
  ];

  return [...validationChain, ...middlewareChain];
})();

export { signupPOST, loginPOST };
