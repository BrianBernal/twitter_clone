import { Request, Response } from 'express';
import { findAllUsers, findUserById } from '../models/userModel.js';
import { getFollowers, getFollowing } from '../models/followModel.js';

export async function getProfile(req: Request, res: Response): Promise<void> {
  try {
    const userId = Number(req.params.id);
    const user = await findUserById(userId);
    if (!user) {
      res.status(404).json({ error: 'User not found' });
      return;
    }
    res.json({ data: user });
  } catch (err) {
    console.error('getProfile error:', err);
    res.status(500).json({ error: 'Failed to get user profile' });
  }
}

export async function getFollowersList(req: Request, res: Response): Promise<void> {
  try {
    const userId = Number(req.params.id);
    const user = await findUserById(userId);
    if (!user) {
      res.status(404).json({ error: 'User not found' });
      return;
    }
    const followers = await getFollowers(userId);
    res.json({ data: followers });
  } catch (err) {
    console.error('getFollowersList error:', err);
    res.status(500).json({ error: 'Failed to get followers' });
  }
}

export async function getFollowingList(req: Request, res: Response): Promise<void> {
  try {
    const userId = Number(req.params.id);
    const user = await findUserById(userId);
    if (!user) {
      res.status(404).json({ error: 'User not found' });
      return;
    }
    const following = await getFollowing(userId);
    res.json({ data: following });
  } catch (err) {
    console.error('getFollowingList error:', err);
    res.status(500).json({ error: 'Failed to get following list' });
  }
}

export async function getAllUsers(_req: Request, res: Response): Promise<void> {
  try {
    const users = await findAllUsers();
    res.json({ data: users });
  } catch (err) {
    console.error('getAllUsers error:', err);
    res.status(500).json({ error: 'Failed to get users' });
  }
}
