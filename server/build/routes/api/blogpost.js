"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const blogPostController = require("../../controllers/BlogPostController");
const commentController = require("../../controllers/CommentController");
const router = express.Router();
router.get('/posts', blogPostController.getPaginated);
router.get('/posts/count', blogPostController.getTotalCount);
router.get('/posts/author', blogPostController.getAuthorsOwnPaginated);
router.get('/author/posts/count', blogPostController.getAuthorsOwnTotalCount);
router.delete('/author/posts/:postId', blogPostController.deleteOne);
router.get('/posts/:postId', blogPostController.get);
router.get('/author/posts/:postId', blogPostController.getAuthorsOwn);
router.post('/posts/new', blogPostController.create);
router.put('/posts/:postId', blogPostController.update);
router.delete('/author/posts/:postId/comments/:commentId', commentController.deleteOne);
router.get('/author/posts/:postId/comments', commentController.getAllForAuthorPost);
router.get('/posts/:postId/comments', commentController.getAllForPost);
router.post('/posts/:postId/comments/new', commentController.create);
exports.default = router;