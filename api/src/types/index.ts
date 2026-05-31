interface User {
  user_id: number;
  user_handle: string;
  email_address: string;
  first_name: string;
  last_name: string;
  phone_number: string | null;
  follower_count: number;
  created_at: string;
}

interface Tweet {
  tweet_id: number;
  user_id: number;
  tweet_text: string;
  likes_count: number;
  created_at: string;
}

interface Follower {
  follower_id: number;
  following_id: number;
}

interface TweetLike {
  user_id: number;
  tweet_id: number;
}

interface Session {
  token: string;
  userId: number;
}

interface ApiResponse<T = unknown> {
  data?: T;
  error?: string;
}

export { User, Tweet, Follower, TweetLike, Session, ApiResponse };
