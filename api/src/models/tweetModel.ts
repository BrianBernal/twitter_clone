import { RowDataPacket, ResultSetHeader } from 'mysql2';
import { getPool } from '../config/index.js';
import { Tweet } from '../types/index.js';

async function findTweetById(id: number): Promise<Tweet | null> {
  const [rows] = await getPool().execute<RowDataPacket[]>(
    'SELECT * FROM tweets WHERE tweet_id = ?',
    [id],
  );
  return rows.length ? (rows[0] as Tweet) : null;
}

async function createTweet(userId: number, tweetText: string): Promise<Tweet> {
  const [result] = await getPool().execute<ResultSetHeader>(
    'INSERT INTO tweets (user_id, tweet_text) VALUES (?, ?)',
    [userId, tweetText],
  );
  const tweet = await findTweetById(result.insertId);
  return tweet!;
}

async function deleteTweet(tweetId: number): Promise<boolean> {
  const [result] = await getPool().execute<ResultSetHeader>(
    'DELETE FROM tweets WHERE tweet_id = ?',
    [tweetId],
  );
  return result.affectedRows > 0;
}

async function getFeedForUser(
  userId: number,
  limit = 20,
  offset = 0,
): Promise<(Tweet & { user_handle: string })[]> {
  const [rows] = await getPool().execute<RowDataPacket[]>(
    `SELECT t.*, u.user_handle
     FROM tweets t
     JOIN users u ON t.user_id = u.user_id
     JOIN followers f ON f.following_id = t.user_id
     WHERE f.follower_id = ?
     ORDER BY t.created_at DESC
     LIMIT ? OFFSET ?`,
    [userId, String(limit), String(offset)],
  );
  return rows as (Tweet & { user_handle: string })[];
}

async function updateLikesCount(tweetId: number, delta: number): Promise<void> {
  await getPool().execute(
    'UPDATE tweets SET likes_count = GREATEST(0, likes_count + ?) WHERE tweet_id = ?',
    [delta, tweetId],
  );
}

export { findTweetById, createTweet, deleteTweet, getFeedForUser, updateLikesCount };
