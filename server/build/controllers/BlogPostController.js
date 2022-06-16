"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteOne = exports.update = exports.create = exports.getAuthorsOwnTotalCount = exports.getTotalCount = exports.getAuthorsOwnPaginated = exports.getPaginated = exports.getAuthorsOwn = exports.get = void 0;
const tslib_1 = require("tslib");
const express_validator_1 = require("express-validator");
const passport_1 = require("../config/passport");
const BlogPost_1 = require("../models/BlogPost");
const User_1 = require("../models/User");
const profanity_filter_1 = require("../config/profanity-filter");
const create = (() => {
    const middlewareChain = [
        passport_1.default.authenticate('jwt', { session: false }),
        (req, res, next) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
            const errors = (0, express_validator_1.validationResult)(req);
            if (!errors.isEmpty()) {
                return res.json({ success: false, errors });
            }
            const blogPost = new BlogPost_1.default({
                title: req.body.title,
                text: req.body.text,
                datePublished: req.body.shouldPublish ? new Date() : null,
                author: req.user.id,
            });
            try {
                yield blogPost.save();
                res.json({ success: true, blogPost });
            }
            catch (err) {
                return next(err);
            }
        }),
    ];
    const validationChain = [
        (0, express_validator_1.body)('title')
            .trim()
            .not()
            .isEmpty()
            .withMessage('Title should not be empty')
            .customSanitizer((value) => profanity_filter_1.default.clean(value)),
        (0, express_validator_1.body)('text')
            .trim()
            .not()
            .isEmpty()
            .withMessage('Text should not be empty. Write something :)')
            .customSanitizer((value) => profanity_filter_1.default.clean(value)),
    ];
    return [...validationChain, ...middlewareChain];
})();
exports.create = create;
const update = (() => {
    const middlewareChain = [
        passport_1.default.authenticate('jwt', { session: false }),
        (req, res, next) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
            const errors = (0, express_validator_1.validationResult)(req);
            if (!errors.isEmpty()) {
                return res.json({ success: false, errors: errors.array() });
            }
            const post = yield BlogPost_1.default.findById(req.params.postId).populate('author');
            if (!post) {
                const err = new Error('Post not found');
                err.status = 404;
                return next(err);
            }
            const author = yield User_1.default.findById(post.author.id);
            if (!author) {
                const err = new Error('Failed to validate the author');
                err.status = 500;
                return next(err);
            }
            if (author.id !== req.user.id) {
                const err = new Error('You are not the author of the post');
                err.status = 403;
                return next(err);
            }
            const blogPost = new BlogPost_1.default({
                title: req.body.title,
                text: req.body.text,
                datePublished: req.body.shouldPublish
                    ? post.datePublished || new Date()
                    : null,
                author: req.user.id,
                _id: req.params.postId,
            });
            try {
                yield BlogPost_1.default.updateOne({ _id: req.params.postId }, blogPost);
                res.json({ success: true, blogPost });
            }
            catch (err) {
                return next(err);
            }
        }),
    ];
    const validationChain = [
        (0, express_validator_1.body)('title')
            .trim()
            .not()
            .isEmpty()
            .withMessage('Title should not be empty')
            .customSanitizer((value) => profanity_filter_1.default.clean(value)),
        (0, express_validator_1.body)('text')
            .trim()
            .not()
            .isEmpty()
            .withMessage('Text should not be empty. Write something :)')
            .customSanitizer((value) => profanity_filter_1.default.clean(value)),
    ];
    return [...validationChain, ...middlewareChain];
})();
exports.update = update;
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
                const postAuthor = yield User_1.default.findById(post.author.id);
                if (!postAuthor) {
                    const err = new Error('Failed to validate the author');
                    err.status = 500;
                    return next(err);
                }
                if (postAuthor.id !== req.user.id) {
                    const err = new Error('You are not the author of the post');
                    err.status = 403;
                    return next(err);
                }
                yield BlogPost_1.default.deleteOne({ _id: post.id });
                return res.json({ success: true });
            }
            catch (err) {
                return next(err);
            }
        }),
    ];
    return [...middlewareChain];
})();
exports.deleteOne = deleteOne;
const get = (req, res, next) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
    try {
        const blogPost = yield BlogPost_1.default.findOne({
            _id: req.params.postId,
            datePublished: { $ne: null },
        }).populate('author', 'username');
        return res.json({ success: blogPost ? true : false, blogPost });
    }
    catch (err) {
        return next(err);
    }
});
exports.get = get;
const getAuthorsOwn = (() => {
    const middlewareChain = [
        passport_1.default.authenticate('jwt', { session: false }),
        (req, res, next) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
            try {
                const blogPost = yield BlogPost_1.default.findOne({
                    author: req.user._id,
                    _id: req.params.postId,
                }).populate('author', 'username');
                return res.json({ success: blogPost ? true : false, blogPost });
            }
            catch (err) {
                return next(err);
            }
        }),
    ];
    return [...middlewareChain];
})();
exports.getAuthorsOwn = getAuthorsOwn;
const getPaginated = (req, res, next) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
    try {
        let perPage = 4;
        if (req.query.perpage && Number(req.query.perpage)) {
            if (Number(req.query.perpage) <= 30) {
                perPage = Number(req.query.perpage);
            }
            else {
                perPage = 30;
            }
        }
        const page = Number(req.query.page) || 0;
        const blogPosts = yield BlogPost_1.default.find({ datePublished: { $ne: null } })
            .limit(perPage)
            .skip(perPage * page)
            .sort({ datePublished: 'desc' })
            .populate('author', 'username');
        return res.json({ success: true, blogPosts: blogPosts });
    }
    catch (err) {
        return next(err);
    }
});
exports.getPaginated = getPaginated;
const getAuthorsOwnPaginated = (() => {
    const MiddlewareChain = [
        passport_1.default.authenticate('jwt', { session: false }),
        (req, res, next) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
            try {
                let perPage = 4;
                if (req.query.perpage && Number(req.query.perpage)) {
                    if (Number(req.query.perpage) <= 30) {
                        perPage = Number(req.query.perpage);
                    }
                    else {
                        perPage = 30;
                    }
                }
                const page = Number(req.query.page) || 0;
                const blogPosts = yield BlogPost_1.default.find({
                    author: req.user._id,
                    datePublished: req.query.type === 'published' ? { $ne: null } : null,
                })
                    .limit(perPage)
                    .skip(perPage * page)
                    .sort({ datePublished: 'desc' })
                    .populate('author', 'username');
                return res.json({ success: true, blogPosts: blogPosts });
            }
            catch (err) {
                return next(err);
            }
        }),
    ];
    return [...MiddlewareChain];
})();
exports.getAuthorsOwnPaginated = getAuthorsOwnPaginated;
const getTotalCount = (req, res, next) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
    try {
        const blogPostsCount = yield BlogPost_1.default.find({
            datePublished: { $ne: null },
        }).count();
        res.json({ success: true, blogPostsCount });
    }
    catch (err) {
        return next(err);
    }
});
exports.getTotalCount = getTotalCount;
const getAuthorsOwnTotalCount = (() => {
    const middlewareChain = [
        passport_1.default.authenticate('jwt', { session: false }),
        (req, res, next) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
            try {
                const blogPostsCount = yield BlogPost_1.default.find({
                    author: req.user._id,
                    datePublished: req.query.type === 'published' ? { $ne: null } : null,
                }).count();
                res.json({ success: true, blogPostsCount });
            }
            catch (err) {
                return next(err);
            }
        }),
    ];
    return [...middlewareChain];
})();
exports.getAuthorsOwnTotalCount = getAuthorsOwnTotalCount;
