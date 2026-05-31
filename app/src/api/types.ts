interface User {
  user_id: number;
  user_handle: string;
  email_address: string;
  first_name: string;
  last_name: string;
  phone_number: string | null;
  follower_count: number;
  following_count?: number;
  tweet_count?: number;
  created_at: string;
}

interface Tweet {
  tweet_id: number;
  user_id: number;
  tweet_text: string;
  likes_count: number;
  created_at: string;
  user_handle?: string;
}

interface AuthResponse {
  session_token: string;
  user: User;
}

interface ApiResponse<T> {
  data: T;
}

interface ApiError {
  error: string;
}

export { User, Tweet, AuthResponse, ApiResponse, ApiError };
