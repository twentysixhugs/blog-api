import * as express from 'express';
import * as blogPostController from '../../controllers/BlogPostController';
import * as commentController from '../../controllers/CommentController';
const router = express.Router();

/* Posts */
router.get('/posts', blogPostController.blogPostGETAll);

/* Single post */

router.get('/posts/:postId', blogPostController.blogPostGET);

router.post('/posts/new', blogPostController.blogPostCreatePOST);

router.put('/posts/:postId', blogPostController.blogPostUpdatePUT);

router.delete('/posts/:postId', blogPostController.blogPostDELETE);

/* Comments */

router.get(
  '/posts/:postId/comments',
  commentController.commentAllBlogPostGET,
);
router.post(
  '/posts/:postId/comments/new',
  commentController.commentCREATE,
);
router.delete(
  '/posts/:postId/comments/:commentId',
  commentController.commentDELETE,
);

export default router;
