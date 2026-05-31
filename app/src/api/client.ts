import type {
  ApiResponse,
  AuthResponse,
  User,
  Tweet,
} from './types'

const TOKEN_KEY = 'twitter_clone_token'

export function getToken(): string | null {
  return localStorage.getItem(TOKEN_KEY)
}

export function setToken(token: string): void {
  localStorage.setItem(TOKEN_KEY, token)
}

export function clearToken(): void {
  localStorage.removeItem(TOKEN_KEY)
}

async function request<T>(
  path: string,
  options: RequestInit = {},
): Promise<T> {
  const token = getToken()
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    ...(options.headers as Record<string, string>),
  }
  if (token) {
    headers['Authorization'] = `Bearer ${token}`
  }

  const res = await fetch(path, { ...options, headers })

  const body = await res.json()

  if (!res.ok) {
    throw new Error(body.error ?? 'Request failed')
  }

  return body as T
}

// Auth
export function signup(user_handle: string, email_address: string, first_name: string, last_name: string) {
  return request<ApiResponse<AuthResponse>>('/api/auth/signup', {
    method: 'POST',
    body: JSON.stringify({ user_handle, email_address, first_name, last_name }),
  })
}

export function signin(email_address: string) {
  return request<ApiResponse<AuthResponse>>('/api/auth/signin', {
    method: 'POST',
    body: JSON.stringify({ email_address }),
  })
}

export function signout() {
  return request<ApiResponse<{ message: string }>>('/api/auth/signout', { method: 'POST' })
}

// Users
export function getUser(id: number) {
  return request<ApiResponse<User>>(`/api/users/${id}`)
}

export function getUserFollowers(id: number) {
  return request<ApiResponse<User[]>>(`/api/users/${id}/followers`)
}

export function getUserFollowing(id: number) {
  return request<ApiResponse<User[]>>(`/api/users/${id}/following`)
}

export function getAllUsers() {
  return request<ApiResponse<User[]>>('/api/getAllUsers')
}

// Tweets
export function createTweet(tweet_text: string) {
  return request<ApiResponse<Tweet>>('/api/tweets', {
    method: 'POST',
    body: JSON.stringify({ tweet_text }),
  })
}

export function deleteTweet(id: number) {
  return request<ApiResponse<{ message: string }>>(`/api/tweets/${id}`, { method: 'DELETE' })
}

export function likeTweet(id: number) {
  return request<ApiResponse<{ message: string }>>(`/api/tweets/${id}/like`, { method: 'POST' })
}

export function unlikeTweet(id: number) {
  return request<ApiResponse<{ message: string }>>(`/api/tweets/${id}/like`, { method: 'DELETE' })
}

export function getTweetLikes(id: number) {
  return request<ApiResponse<User[]>>(`/api/tweets/${id}/likes`)
}

// Feed
export function getFeed(limit = 20, offset = 0) {
  return request<ApiResponse<Tweet[]>>(`/api/feed?limit=${limit}&offset=${offset}`)
}

// Follows
export function followUser(following_id: number) {
  return request<ApiResponse<{ message: string }>>('/api/followers', {
    method: 'POST',
    body: JSON.stringify({ following_id }),
  })
}

export function unfollowUser(followingId: number) {
  return request<ApiResponse<{ message: string }>>(`/api/followers/${followingId}`, { method: 'DELETE' })
}
