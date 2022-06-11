import * as express from 'express';
import * as blogPostController from '../../controllers/BlogPostController';
import * as commentController from '../../controllers/CommentController';
const router = express.Router();

/* Posts */
router.get('/posts', blogPostController.getPaginated);
router.get('/posts/author', blogPostController.getAuthorsOwnPaginated);
router.get('/posts/count', blogPostController.getTotalCount);

/* Single post */

router.get('/posts/:postId', blogPostController.get);

router.get('/posts/author/:postId', blogPostController.getAuthorsOwn);

router.post('/posts/new', blogPostController.create);

router.put('/posts/:postId', blogPostController.update);

router.delete('/posts/:postId', blogPostController.deleteOne);

/* Comments */

router.get('/posts/:postId/comments', commentController.getAllForPost);
router.post('/posts/:postId/comments/new', commentController.create);
router.delete(
  '/posts/:postId/comments/:commentId',
  commentController.deleteOne,
);

export default router;
