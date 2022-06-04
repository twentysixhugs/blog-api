import * as express from 'express';
import * as blogPostController from '../../controllers/BlogPostController';
const router = express.Router();

router.get('/posts', blogPostController.blogPostGETAll);
router.get('/posts/:postId', blogPostController.blogPostGET);

router.post('/posts/new', blogPostController.blogPostCreatePOST);

router.put('/posts/:postId', blogPostController.blogPostUpdatePUT);

router.delete('/posts/:postId', blogPostController.blogPostDELETE);

export default router;
