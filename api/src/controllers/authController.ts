import { Request, Response } from 'express';
import { createSession, destroySession } from '../middleware/auth.js';
import { createUser, findUserByEmail, findUserByHandle } from '../models/userModel.js';

async function signup(req: Request, res: Response): Promise<void> {
  try {
    const { user_handle, email_address, first_name, last_name, phone_number } = req.body;

    const existingEmail = await findUserByEmail(email_address);
    if (existingEmail) {
      res.status(409).json({ error: 'Email already in use' });
      return;
    }

    const existingHandle = await findUserByHandle(user_handle);
    if (existingHandle) {
      res.status(409).json({ error: 'User handle already taken' });
      return;
    }

    const user = await createUser({
      user_handle,
      email_address,
      first_name,
      last_name,
      phone_number,
    });
    const session = createSession(user.user_id);
    res.status(201).json({ data: { session_token: session.token, user } });
  } catch (err) {
    console.error('signup error:', err);
    res.status(500).json({ error: 'Failed to create user' });
  }
}

async function signin(req: Request, res: Response): Promise<void> {
  try {
    const { email_address } = req.body;
    const user = await findUserByEmail(email_address);
    if (!user) {
      res.status(401).json({ error: 'Invalid credentials' });
      return;
    }

    const session = createSession(user.user_id);
    res.json({ data: { session_token: session.token, user } });
  } catch (err) {
    console.error('signin error:', err);
    res.status(500).json({ error: 'Failed to sign in' });
  }
}

function signout(req: Request, res: Response): void {
  const header = req.headers.authorization;
  if (header && header.startsWith('Bearer ')) {
    destroySession(header.slice(7));
  }
  res.json({ data: { message: 'Signed out' } });
}

export { signup, signin, signout };
