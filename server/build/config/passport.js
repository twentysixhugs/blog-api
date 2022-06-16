"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const bcrypt = require("bcrypt");
const passport = require("passport");
const passport_jwt_1 = require("passport-jwt");
const passport_local_1 = require("passport-local");
const User_1 = require("../models/User");
require("dotenv/config");
passport.use(new passport_local_1.Strategy({ session: false }, (username, password, done) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield User_1.default.findOne({ username });
        if (!user) {
            return done(null, false, { message: 'Username not found' });
        }
        const isPasswordCorrect = yield bcrypt.compare(password, user.password);
        if (!isPasswordCorrect) {
            return done(null, false, {
                message: 'Incorrect password',
            });
        }
        return done(null, user);
    }
    catch (err) {
        return done(err);
    }
})));
passport.use(new passport_jwt_1.Strategy({
    jwtFromRequest: passport_jwt_1.ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: process.env.JWTSECRET,
}, (payload, done) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield User_1.default.findOne({ _id: payload.sub });
        if (!user) {
            return done(null, false);
        }
        return done(null, user);
    }
    catch (err) {
        return done(err);
    }
})));
exports.default = passport;
