import { RowDataPacket, ResultSetHeader } from 'mysql2';
import { getPool } from '../config/index.js';
import { User } from '../types/index.js';

export async function followUser(followerId: number, followingId: number): Promise<boolean> {
  try {
    const [result] = await getPool().execute<ResultSetHeader>(
      'INSERT INTO followers (follower_id, following_id) VALUES (?, ?)',
      [followerId, followingId]
    );
    return result.affectedRows > 0;
  } catch {
    return false;
  }
}

export async function unfollowUser(followerId: number, followingId: number): Promise<boolean> {
  const [result] = await getPool().execute<ResultSetHeader>(
    'DELETE FROM followers WHERE follower_id = ? AND following_id = ?',
    [followerId, followingId]
  );
  return result.affectedRows > 0;
}

export async function isFollowing(followerId: number, followingId: number): Promise<boolean> {
  const [rows] = await getPool().execute<RowDataPacket[]>(
    'SELECT 1 FROM followers WHERE follower_id = ? AND following_id = ?',
    [followerId, followingId]
  );
  return rows.length > 0;
}

export async function getFollowers(userId: number): Promise<User[]> {
  const [rows] = await getPool().execute<RowDataPacket[]>(
    `SELECT u.* FROM users u
     JOIN followers f ON u.user_id = f.follower_id
     WHERE f.following_id = ?`,
    [userId]
  );
  return rows as User[];
}

export async function getFollowing(userId: number): Promise<User[]> {
  const [rows] = await getPool().execute<RowDataPacket[]>(
    `SELECT u.* FROM users u
     JOIN followers f ON u.user_id = f.following_id
     WHERE f.follower_id = ?`,
    [userId]
  );
  return rows as User[];
}
