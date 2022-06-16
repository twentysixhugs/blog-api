"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.login = exports.signup = void 0;
const tslib_1 = require("tslib");
const express_validator_1 = require("express-validator");
const passport_1 = require("../config/passport");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const User_1 = require("../models/User");
const signup = (() => {
    const validationChain = [
        (0, express_validator_1.body)('username')
            .trim()
            .not()
            .isEmpty()
            .withMessage('Username is required')
            .bail()
            .isAlphanumeric()
            .withMessage('Username can contain only letters and numbers')
            .customSanitizer((value) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
            return value.replace('fuck', '').replace('ass', '');
        }))
            .custom((value, { req }) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
            const userCheck = yield User_1.default.findOne({
                username: req.body.username,
            });
            if (userCheck) {
                return Promise.reject();
            }
        }))
            .withMessage('Username already exists'),
        (0, express_validator_1.body)('password')
            .not()
            .isEmpty()
            .withMessage('Password is required')
            .isLength({ min: 6 })
            .withMessage('Password should be at least 6 characters long'),
        (0, express_validator_1.body)('passwordConfirm')
            .not()
            .isEmpty()
            .withMessage('Password confirmation is required')
            .custom((value, { req }) => value === req.body.password)
            .withMessage('Passwords do not match'),
    ];
    const middlewareChain = [
        (req, res, next) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
            const errors = yield (0, express_validator_1.validationResult)(req);
            if (!errors.isEmpty()) {
                return res.json(Object.assign(Object.assign({}, req.body), { success: false, errors: errors.array() }));
            }
            try {
                const hashedPassword = yield bcrypt.hash(req.body.password, 10);
                const user = new User_1.default({
                    username: req.body.username,
                    password: hashedPassword,
                });
                yield user.save();
                const token = jwt.sign({ sub: user.id }, process.env.JWTSECRET, {
                    expiresIn: '4383h',
                });
                return res.json({ success: true, token });
            }
            catch (err) {
                return next(err);
            }
        }),
    ];
    return [...validationChain, ...middlewareChain];
})();
exports.signup = signup;
const login = (() => {
    const validationChain = [
        (0, express_validator_1.body)('username')
            .trim()
            .not()
            .isEmpty()
            .withMessage('Username is required'),
        (0, express_validator_1.body)('password').not().isEmpty().withMessage('Password is required'),
    ];
    const middlewareChain = [
        (req, res, next) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
            const errors = (0, express_validator_1.validationResult)(req);
            if (!errors.isEmpty()) {
                return res.json(Object.assign(Object.assign({}, req.body), { success: false, errors: errors.array() }));
            }
            return next();
        }),
        (req, res, next) => {
            passport_1.default.authenticate('local', {
                session: false,
            }, (err, user, info) => {
                if (err) {
                    return next(err);
                }
                if (!user) {
                    return res.json({
                        success: false,
                        errors: [{ msg: info.message, status: 401 }],
                    });
                }
                else {
                    const token = jwt.sign({ sub: user.id }, process.env.JWTSECRET, {
                        expiresIn: '180d',
                    });
                    return res.json({
                        success: true,
                        token,
                    });
                }
            })(req, res, next);
        },
    ];
    return [...validationChain, ...middlewareChain];
})();
exports.login = login;
