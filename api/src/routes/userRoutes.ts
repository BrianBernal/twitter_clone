import { Router, Router as RouterType } from 'express';
import { getProfile, getFollowersList, getFollowingList } from '../controllers/userController.js';
import { authMiddleware } from '../middleware/auth.js';
import { validateParam } from '../validators/helpers.js';

const router: RouterType = Router();

router.get('/:id', authMiddleware, validateParam('id'), getProfile);
router.get('/:id/followers', authMiddleware, validateParam('id'), getFollowersList);
router.get('/:id/following', authMiddleware, validateParam('id'), getFollowingList);

export default router;
