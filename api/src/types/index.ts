export interface User {
  user_id: number;
  user_handle: string;
  email_address: string;
  first_name: string;
  last_name: string;
  phone_number: string | null;
  follower_count: number;
  created_at: string;
}

export interface Tweet {
  tweet_id: number;
  user_id: number;
  tweet_text: string;
  likes_count: number;
  created_at: string;
}

export interface Follower {
  follower_id: number;
  following_id: number;
}

export interface TweetLike {
  user_id: number;
  tweet_id: number;
}

export interface Session {
  token: string;
  userId: number;
}

export interface ApiResponse<T = unknown> {
  data?: T;
  error?: string;
}
