import { Request, Response } from 'express';
import { followUser, unfollowUser, isFollowing } from '../models/followModel.js';
import { findUserById } from '../models/userModel.js';
import { updateFollowerCount } from '../models/userModel.js';

async function follow(req: Request, res: Response): Promise<void> {
  try {
    const followingId = Number(req.body.following_id);
    const followerId = req.userId!;

    if (followingId === followerId) {
      res.status(400).json({ error: 'Cannot follow yourself' });
      return;
    }

    const targetUser = await findUserById(followingId);
    if (!targetUser) {
      res.status(404).json({ error: 'User to follow not found' });
      return;
    }

    const already = await isFollowing(followerId, followingId);
    if (already) {
      res.status(409).json({ error: 'Already following this user' });
      return;
    }

    const ok = await followUser(followerId, followingId);
    if (!ok) {
      res.status(409).json({ error: 'Already following this user' });
      return;
    }

    await updateFollowerCount(followingId, 1);
    res.status(201).json({ data: { message: 'Now following user' } });
  } catch (err) {
    console.error('follow error:', err);
    res.status(500).json({ error: 'Failed to follow user' });
  }
}

async function unfollow(req: Request, res: Response): Promise<void> {
  try {
    const followingId = Number(req.params.following_id);
    const followerId = req.userId!;

    const ok = await unfollowUser(followerId, followingId);
    if (!ok) {
      res.status(404).json({ error: 'Follow relationship not found' });
      return;
    }

    await updateFollowerCount(followingId, -1);
    res.json({ data: { message: 'Unfollowed user' } });
  } catch (err) {
    console.error('unfollow error:', err);
    res.status(500).json({ error: 'Failed to unfollow user' });
  }
}

export { follow, unfollow };
