import { Router, Router as RouterType } from 'express';
import { signup, signin, signout } from '../controllers/authController.js';
import { authMiddleware } from '../middleware/auth.js';
import { validationMiddleware } from '../middleware/validation.js';
import { registerValidator } from '../middleware/validation.js';
import { validateSignup, validateSignin } from '../validators/authValidator.js';

registerValidator('POST', '/api/auth/signup', validateSignup);
registerValidator('POST', '/api/auth/signin', validateSignin);

const router: RouterType = Router();

router.post('/signup', validationMiddleware, signup);
router.post('/signin', validationMiddleware, signin);
router.post('/signout', authMiddleware, signout);

export default router;
