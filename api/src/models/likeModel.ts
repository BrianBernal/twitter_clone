import { RowDataPacket, ResultSetHeader } from 'mysql2';
import { getPool } from '../config/index.js';
import { User } from '../types/index.js';

export async function likeTweet(userId: number, tweetId: number): Promise<boolean> {
  try {
    const [result] = await getPool().execute<ResultSetHeader>(
      'INSERT INTO tweet_likes (user_id, tweet_id) VALUES (?, ?)',
      [userId, tweetId]
    );
    return result.affectedRows > 0;
  } catch {
    return false;
  }
}

export async function unlikeTweet(userId: number, tweetId: number): Promise<boolean> {
  const [result] = await getPool().execute<ResultSetHeader>(
    'DELETE FROM tweet_likes WHERE user_id = ? AND tweet_id = ?',
    [userId, tweetId]
  );
  return result.affectedRows > 0;
}

export async function hasLiked(userId: number, tweetId: number): Promise<boolean> {
  const [rows] = await getPool().execute<RowDataPacket[]>(
    'SELECT 1 FROM tweet_likes WHERE user_id = ? AND tweet_id = ?',
    [userId, tweetId]
  );
  return rows.length > 0;
}

export async function getTweetLikes(tweetId: number): Promise<User[]> {
  const [rows] = await getPool().execute<RowDataPacket[]>(
    `SELECT u.* FROM users u
     JOIN tweet_likes tl ON u.user_id = tl.user_id
     WHERE tl.tweet_id = ?`,
    [tweetId]
  );
  return rows as User[];
}
