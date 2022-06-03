import * as express from 'express';
import * as userController from '../../controllers/UserController';

const router = express.Router();

router.post('/login', userController.loginPOST);
router.post('/signup', userController.signupPOST);

export default router;
