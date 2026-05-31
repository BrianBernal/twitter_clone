import { Router, Router as RouterType } from 'express';
import { create as createTweet, remove as removeTweet } from '../controllers/tweetController.js';
import { like, unlike, getLikes } from '../controllers/likeController.js';
import { authMiddleware } from '../middleware/auth.js';
import { validationMiddleware } from '../middleware/validation.js';
import { registerValidator } from '../middleware/validation.js';
import { validateCreateTweet } from '../validators/tweetValidator.js';
import { validateParam } from '../validators/helpers.js';

registerValidator('POST', '/api/tweets', validateCreateTweet);

const router: RouterType = Router();

router.post('/', authMiddleware, validationMiddleware, createTweet);
router.delete('/:id', authMiddleware, validateParam('id'), removeTweet);
router.post('/:id/like', authMiddleware, validateParam('id'), like);
router.delete('/:id/like', authMiddleware, validateParam('id'), unlike);
router.get('/:id/likes', authMiddleware, validateParam('id'), getLikes);

export default router;
