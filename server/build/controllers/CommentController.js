"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllForAuthorPost = exports.deleteOne = exports.create = exports.getAllForPost = void 0;
const tslib_1 = require("tslib");
const Comment_1 = require("../models/Comment");
const express_validator_1 = require("express-validator");
const passport_1 = require("../config/passport");
const BlogPost_1 = require("../models/BlogPost");
const profanity_filter_1 = require("../config/profanity-filter");
const getAllForPost = (req, res, next) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
    try {
        const comments = yield Comment_1.default.find({ post: req.params.postId })
            .sort({
            date: 'desc',
        })
            .populate('post', 'datePublished');
        if (comments[0] &&
            !comments[0].post
                .datePublished) {
            return res.json({ success: false });
        }
        return res.json({ success: true, comments });
    }
    catch (err) {
        return next(err);
    }
});
exports.getAllForPost = getAllForPost;
const getAllForAuthorPost = (() => {
    const middlewareChain = [
        passport_1.default.authenticate('jwt', { session: false }),
        (req, res, next) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
            try {
                const comments = yield Comment_1.default.find({ post: req.params.postId })
                    .sort({
                    date: 'desc',
                })
                    .populate({
                    path: 'post',
                    populate: { path: 'author', model: 'user' },
                });
                if (comments[0] &&
                    comments[0].post
                        .author.id !== req.user.id) {
                    return res.json({ success: false });
                }
                return res.json({ success: true, comments });
            }
            catch (err) {
                return next(err);
            }
        }),
    ];
    return [...middlewareChain];
})();
exports.getAllForAuthorPost = getAllForAuthorPost;
const create = (() => {
    const validationChain = [
        (0, express_validator_1.body)('author')
            .trim()
            .customSanitizer((value) => {
            if (!value) {
                return 'Anonymous';
            }
            return profanity_filter_1.default.clean(value);
        }),
        (0, express_validator_1.body)('text')
            .trim()
            .not()
            .isEmpty()
            .withMessage('Comment should contain something, right?')
            .customSanitizer((value) => profanity_filter_1.default.clean(value)),
    ];
    const middlewareChain = [
        (req, res, next) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
            const errors = (0, express_validator_1.validationResult)(req);
            if (!errors.isEmpty()) {
                return res.json({ success: false, errors: errors.array() });
            }
            const post = yield BlogPost_1.default.findOne({
                _id: req.params.postId,
                datePublished: { $ne: null },
            });
            if (!post) {
                const err = new Error();
                err.status = 404;
                res.status(404);
                return next(err);
            }
            if (!post.datePublished) {
                return res.json({ success: false });
            }
            const comment = new Comment_1.default({
                text: req.body.text,
                author: req.body.author,
                post: req.params.postId,
                date: new Date(),
            });
            try {
                yield comment.save();
                return res.json({ success: true, comment });
            }
            catch (err) {
                return next(err);
            }
        }),
    ];
    return [...validationChain, ...middlewareChain];
})();
exports.create = create;
const deleteOne = (() => {
    const middlewareChain = [
        passport_1.default.authenticate('jwt', { session: false }),
        (req, res, next) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
            try {
                const post = yield BlogPost_1.default.findById(req.params.postId).populate('author');
                if (!post) {
                    const err = new Error('Post not found');
                    err.status = 404;
                    return next(err);
                }
                if (post.author.id !== req.user.id) {
                    const err = new Error('You are not the author of the post');
                    err.status = 401;
                }
                yield Comment_1.default.deleteOne({ _id: req.params.commentId });
                res.json({ success: true });
            }
            catch (err) {
                return next(err);
            }
        }),
    ];
    return [...middlewareChain];
})();
exports.deleteOne = deleteOne;
