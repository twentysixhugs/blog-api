import * as bcrypt from 'bcrypt';

import * as passport from 'passport';
import { ExtractJwt, Strategy as JWTStrategy } from 'passport-jwt';

import { Strategy as LocalStrategy } from 'passport-local';

import User from '../models/User';
import 'dotenv/config';
import { ResponseError } from '../types';

passport.use(
  new LocalStrategy(
    { session: false },
    async (username, password, done) => {
      try {
        const user = await User.findOne({ username });

        if (!user) {
          const err: ResponseError = new Error('User not found');
          err.status = 404;
          return done(err, false);
        }

        const isPasswordCorrect = await bcrypt.compare(
          password,
          user.password,
        );

        if (!isPasswordCorrect) {
          const err: ResponseError = new Error('Incorrect password');
          err.status = 401;
          return done(err, false);
        }

        return done(null, user);
      } catch (err) {
        return done(err);
      }
    },
  ),
);

passport.use(
  new JWTStrategy(
    {
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: process.env.JWTSECRET,
    },
    async (payload, done) => {
      try {
        const user = await User.findOne({ _id: payload.sub });

        if (!user) {
          return done(null, false);
        }

        return done(null, user);
      } catch (err) {
        return done(err);
      }
    },
  ),
);

export default passport;
