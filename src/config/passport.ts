import * as bcrypt from 'bcrypt';

import * as passport from 'passport';
import { ExtractJwt, Strategy as JWTStrategy } from 'passport-jwt';

import { Strategy as LocalStrategy } from 'passport-local';

import User from '../models/User';
import 'dotenv/config';

passport.use(
  new LocalStrategy(
    { session: false },
    async (username, password, done) => {
      try {
        const user = await User.findOne({ username });

        if (!user) {
          return done(null, false, { message: 'User not found' });
        }

        const isPasswordCorrect = await bcrypt.compare(
          password,
          user.password,
        );

        if (!isPasswordCorrect) {
          return done(null, false, { message: 'Incorrect password' });
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
