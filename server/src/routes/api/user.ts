import * as express from 'express';
import * as userController from '../../controllers/UserController';

const router = express.Router();

router.post('/login', userController.login);
router.post('/signup', userController.signup);

export default router;
