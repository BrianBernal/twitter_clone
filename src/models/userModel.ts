import { RowDataPacket, ResultSetHeader } from 'mysql2';
import { getPool } from '../config/index.js';
import { User } from '../types/index.js';

export async function findUserByEmail(email: string): Promise<User | null> {
  const [rows] = await getPool().execute<RowDataPacket[]>(
    'SELECT * FROM users WHERE email_address = ?',
    [email]
  );
  return rows.length ? (rows[0] as User) : null;
}

export async function findUserByHandle(handle: string): Promise<User | null> {
  const [rows] = await getPool().execute<RowDataPacket[]>(
    'SELECT * FROM users WHERE user_handle = ?',
    [handle]
  );
  return rows.length ? (rows[0] as User) : null;
}

export async function findUserById(id: number): Promise<User | null> {
  const [rows] = await getPool().execute<RowDataPacket[]>(
    'SELECT * FROM users WHERE user_id = ?',
    [id]
  );
  return rows.length ? (rows[0] as User) : null;
}

export async function createUser(data: {
  user_handle: string;
  email_address: string;
  first_name: string;
  last_name: string;
  phone_number?: string | null;
}): Promise<User> {
  const [result] = await getPool().execute<ResultSetHeader>(
    `INSERT INTO users (user_handle, email_address, first_name, last_name, phone_number)
     VALUES (?, ?, ?, ?, ?)`,
    [data.user_handle, data.email_address, data.first_name, data.last_name, data.phone_number ?? null]
  );
  const user = await findUserById(result.insertId);
  return user!;
}

export async function updateFollowerCount(userId: number, delta: number): Promise<void> {
  await getPool().execute(
    'UPDATE users SET follower_count = GREATEST(0, follower_count + ?) WHERE user_id = ?',
    [delta, userId]
  );
}
