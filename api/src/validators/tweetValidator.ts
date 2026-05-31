import { Request } from 'express';

export function validateCreateTweet(req: Request): string | null {
  const { tweet_text } = req.body;
  if (!tweet_text || typeof tweet_text !== 'string' || tweet_text.trim().length === 0) {
    return 'tweet_text is required';
  }
  if (tweet_text.length > 280) {
    return 'tweet_text must be 280 characters or less';
  }
  return null;
}

export function validateFollow(req: Request): string | null {
  const followingId = Number(req.body.following_id);
  if (!Number.isInteger(followingId) || followingId <= 0) {
    return 'following_id must be a positive integer';
  }
  if (req.userId && followingId === req.userId) {
    return 'Cannot follow yourself';
  }
  return null;
}

export function validateIdParam(req: Request): string | null {
  const id = Number(req.params.id || req.params.following_id || req.params.tweet_id);
  if (!Number.isInteger(id) || id <= 0) {
    return 'ID parameter must be a positive integer';
  }
  return null;
}
