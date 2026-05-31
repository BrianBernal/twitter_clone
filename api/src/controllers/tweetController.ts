import { Request, Response } from 'express';
import { createTweet, deleteTweet, findTweetById, getFeedForUser } from '../models/tweetModel.js';

export async function create(req: Request, res: Response): Promise<void> {
  try {
    const tweet = await createTweet(req.userId!, req.body.tweet_text);
    res.status(201).json({ data: tweet });
  } catch (err) {
    console.error('create tweet error:', err);
    res.status(500).json({ error: 'Failed to create tweet' });
  }
}

export async function remove(req: Request, res: Response): Promise<void> {
  try {
    const tweetId = Number(req.params.id);
    const tweet = await findTweetById(tweetId);
    if (!tweet) {
      res.status(404).json({ error: 'Tweet not found' });
      return;
    }
    if (tweet.user_id !== req.userId) {
      res.status(403).json({ error: 'Not authorized to delete this tweet' });
      return;
    }
    await deleteTweet(tweetId);
    res.json({ data: { message: 'Tweet deleted' } });
  } catch (err) {
    console.error('delete tweet error:', err);
    res.status(500).json({ error: 'Failed to delete tweet' });
  }
}

export async function feed(req: Request, res: Response): Promise<void> {
  try {
    const limit = Math.min(Math.max(parseInt(req.query.limit as string) || 20, 1), 100);
    const offset = Math.max(parseInt(req.query.offset as string) || 0, 0);
    const tweets = await getFeedForUser(req.userId!, limit, offset);
    res.json({ data: tweets });
  } catch (err) {
    console.error('feed error:', err);
    res.status(500).json({ error: 'Failed to get feed' });
  }
}
