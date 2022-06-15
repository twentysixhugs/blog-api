import * as express from 'express';
import * as blogPostController from '../../controllers/BlogPostController';
import * as commentController from '../../controllers/CommentController';
const router = express.Router();

/* Posts */
router.get('/posts', blogPostController.getPaginated);
router.get('/posts/count', blogPostController.getTotalCount);

router.get('/posts/author', blogPostController.getAuthorsOwnPaginated);
router.get(
  '/author/posts/count',
  blogPostController.getAuthorsOwnTotalCount,
);
router.delete('/author/posts/:postId', blogPostController.deleteOne);

/* Single post */

router.get('/posts/:postId', blogPostController.get);

router.get('/author/posts/:postId', blogPostController.getAuthorsOwn);

router.post('/posts/new', blogPostController.create);

router.put('/posts/:postId', blogPostController.update);

/* Comments */

router.delete(
  'author/posts/:postId/comments/:commentId',
  commentController.deleteOne,
);

router.get(
  '/author/posts/:postId/comments',
  commentController.getAllForAuthorPost,
);
router.get('/posts/:postId/comments', commentController.getAllForPost);
router.post('/posts/:postId/comments/new', commentController.create);

export default router;
