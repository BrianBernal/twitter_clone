import { Request, Response, NextFunction } from 'express';
import { Session } from '../types/index.js';

const sessions = new Map<string, number>();

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace Express {
    interface Request {
      userId?: number;
    }
  }
}

export function createSession(userId: number): Session {
  const token = crypto.randomUUID();
  sessions.set(token, userId);
  return { token, userId };
}

export function destroySession(token: string): void {
  sessions.delete(token);
}

export function authMiddleware(req: Request, res: Response, next: NextFunction): void {
  const header = req.headers.authorization;
  if (!header || !header.startsWith('Bearer ')) {
    res.status(401).json({ error: 'Authentication required' });
    return;
  }

  const token = header.slice(7);
  const userId = sessions.get(token);
  if (!userId) {
    res.status(401).json({ error: 'Invalid or expired session' });
    return;
  }

  req.userId = userId;
  next();
}
