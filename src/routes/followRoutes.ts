import { Router, Router as RouterType } from 'express';
import { follow, unfollow } from '../controllers/followController.js';
import { authMiddleware } from '../middleware/auth.js';
import { validationMiddleware } from '../middleware/validation.js';
import { registerValidator } from '../middleware/validation.js';
import { validateFollow } from '../validators/tweetValidator.js';
import { validateParam } from '../validators/helpers.js';

registerValidator('POST', '/api/followers', validateFollow);

const router: RouterType = Router();

router.post('/', authMiddleware, validationMiddleware, follow);
router.delete('/:following_id', authMiddleware, validateParam('following_id'), unfollow);

export default router;
