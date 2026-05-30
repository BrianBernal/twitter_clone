import { Request, Response } from 'express';
import { likeTweet, unlikeTweet, hasLiked, getTweetLikes } from '../models/likeModel.js';
import { findTweetById } from '../models/tweetModel.js';
import { updateLikesCount } from '../models/tweetModel.js';

export async function like(req: Request, res: Response): Promise<void> {
  try {
    const tweetId = Number(req.params.id);
    const userId = req.userId!;

    const tweet = await findTweetById(tweetId);
    if (!tweet) {
      res.status(404).json({ error: 'Tweet not found' });
      return;
    }

    const already = await hasLiked(userId, tweetId);
    if (already) {
      res.status(409).json({ error: 'Already liked this tweet' });
      return;
    }

    const ok = await likeTweet(userId, tweetId);
    if (!ok) {
      res.status(409).json({ error: 'Already liked this tweet' });
      return;
    }

    await updateLikesCount(tweetId, 1);
    res.status(201).json({ data: { message: 'Tweet liked' } });
  } catch (err) {
    console.error('like error:', err);
    res.status(500).json({ error: 'Failed to like tweet' });
  }
}

export async function unlike(req: Request, res: Response): Promise<void> {
  try {
    const tweetId = Number(req.params.id);
    const userId = req.userId!;

    const ok = await unlikeTweet(userId, tweetId);
    if (!ok) {
      res.status(404).json({ error: 'Like not found' });
      return;
    }

    await updateLikesCount(tweetId, -1);
    res.json({ data: { message: 'Tweet unliked' } });
  } catch (err) {
    console.error('unlike error:', err);
    res.status(500).json({ error: 'Failed to unlike tweet' });
  }
}

export async function getLikes(req: Request, res: Response): Promise<void> {
  try {
    const tweetId = Number(req.params.id);
    const tweet = await findTweetById(tweetId);
    if (!tweet) {
      res.status(404).json({ error: 'Tweet not found' });
      return;
    }

    const users = await getTweetLikes(tweetId);
    res.json({ data: users });
  } catch (err) {
    console.error('getLikes error:', err);
    res.status(500).json({ error: 'Failed to get likes' });
  }
}
