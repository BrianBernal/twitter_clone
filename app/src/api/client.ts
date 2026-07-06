import type { ApiResponse, AuthResponse, User, Tweet } from './types';

const TOKEN_KEY = 'twitter_clone_token';

function getToken(): string | null {
  return localStorage.getItem(TOKEN_KEY);
}

function setToken(token: string): void {
  localStorage.setItem(TOKEN_KEY, token);
  window.dispatchEvent(new Event('auth-change'));
}

function clearToken(): void {
  localStorage.removeItem(TOKEN_KEY);
  window.dispatchEvent(new Event('auth-change'));
}

async function request<T>(path: string, options: RequestInit = {}): Promise<T> {
  const token = getToken();
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    ...(options.headers as Record<string, string>),
  };
  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  const res = await fetch(path, { ...options, headers });

  const body = await res.json();

  if (!res.ok) {
    throw new Error(body.error ?? 'Request failed');
  }

  return body as T;
}

// Auth
function signup(user_handle: string, email_address: string, first_name: string, last_name: string) {
  return request<ApiResponse<AuthResponse>>('/api/auth/signup', {
    method: 'POST',
    body: JSON.stringify({ user_handle, email_address, first_name, last_name }),
  });
}

function signin(email_address: string) {
  return request<ApiResponse<AuthResponse>>('/api/auth/signin', {
    method: 'POST',
    body: JSON.stringify({ email_address }),
  });
}

function signout() {
  return request<ApiResponse<{ message: string }>>('/api/auth/signout', { method: 'POST' });
}

// Users
function getUser(id: number) {
  return request<ApiResponse<User>>(`/api/users/${id}`);
}

function getUserFollowers(id: number) {
  return request<ApiResponse<User[]>>(`/api/users/${id}/followers`);
}

function getUserFollowing(id: number) {
  return request<ApiResponse<User[]>>(`/api/users/${id}/following`);
}

function getAllUsers() {
  return request<ApiResponse<User[]>>('/api/getAllUsers');
}

// Tweets
function createTweet(tweet_text: string) {
  return request<ApiResponse<Tweet>>('/api/tweets', {
    method: 'POST',
    body: JSON.stringify({ tweet_text }),
  });
}

function deleteTweet(id: number) {
  return request<ApiResponse<{ message: string }>>(`/api/tweets/${id}`, { method: 'DELETE' });
}

function likeTweet(id: number) {
  return request<ApiResponse<{ message: string }>>(`/api/tweets/${id}/like`, { method: 'POST' });
}

function unlikeTweet(id: number) {
  return request<ApiResponse<{ message: string }>>(`/api/tweets/${id}/like`, { method: 'DELETE' });
}

function getTweetLikes(id: number) {
  return request<ApiResponse<User[]>>(`/api/tweets/${id}/likes`);
}

// Feed
function getFeed(limit = 20, offset = 0) {
  return request<ApiResponse<Tweet[]>>(`/api/feed?limit=${limit}&offset=${offset}`);
}

// Follows
function followUser(following_id: number) {
  return request<ApiResponse<{ message: string }>>('/api/followers', {
    method: 'POST',
    body: JSON.stringify({ following_id }),
  });
}

function unfollowUser(followingId: number) {
  return request<ApiResponse<{ message: string }>>(`/api/followers/${followingId}`, {
    method: 'DELETE',
  });
}

export {
  getToken,
  setToken,
  clearToken,
  signup,
  signin,
  signout,
  getUser,
  getUserFollowers,
  getUserFollowing,
  getAllUsers,
  createTweet,
  deleteTweet,
  likeTweet,
  unlikeTweet,
  getTweetLikes,
  getFeed,
  followUser,
  unfollowUser,
};
