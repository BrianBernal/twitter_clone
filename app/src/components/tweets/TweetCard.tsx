import { useState } from 'react';
import { Link } from '@tanstack/react-router';
import type { Tweet } from '../../api/types';
import { getStoredUser } from '../../hooks/useAuth';
import { useLikeTweet, useUnlikeTweet, useDeleteTweet } from '../../hooks/useTweets';

interface TweetCardProps {
  tweet: Tweet;
}

function timeAgo(dateString: string): string {
  const now = Date.now();
  const date = new Date(dateString).getTime();
  const diff = Math.max(0, now - date);
  const minutes = Math.floor(diff / 60000);
  const hours = Math.floor(diff / 3600000);
  const days = Math.floor(diff / 86400000);

  if (minutes < 1) return 'now';
  if (minutes < 60) return `${minutes}m`;
  if (hours < 24) return `${hours}h`;
  if (days < 7) return `${days}d`;
  return new Date(dateString).toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
}

function TweetCard({ tweet }: TweetCardProps) {
  const currentUser = getStoredUser();
  const isOwner = currentUser?.user_id === tweet.user_id;
  const [liked, setLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(tweet.likes_count);
  const likeTweet = useLikeTweet();
  const unlikeTweet = useUnlikeTweet();
  const deleteTweet = useDeleteTweet();

  const handleLike = () => {
    if (liked) {
      setLiked(false);
      setLikeCount((c) => Math.max(0, c - 1));
      unlikeTweet.mutate(tweet.tweet_id);
    } else {
      setLiked(true);
      setLikeCount((c) => c + 1);
      likeTweet.mutate(tweet.tweet_id);
    }
  };

  const handleDelete = () => {
    if (window.confirm('Delete this chirp?')) {
      deleteTweet.mutate(tweet.tweet_id);
    }
  };

  return (
    <article className="px-4 py-3 border-b border-border hover:bg-surface-3/50 transition-colors group">
      <div className="flex gap-3">
        <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center text-white font-bold text-sm shrink-0">
          {tweet.user_handle?.[0]?.toUpperCase() ?? '?'}
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 text-sm">
            <Link
              to="/users/$id"
              params={{ id: String(tweet.user_id) }}
              className="font-bold text-text-primary hover:underline truncate"
            >
              @{tweet.user_handle ?? 'unknown'}
            </Link>
            <span className="text-text-secondary shrink-0">{timeAgo(tweet.created_at)}</span>
          </div>

          <p className="mt-1 text-text-primary text-[15px] leading-5 whitespace-pre-wrap break-words">
            {tweet.tweet_text}
          </p>

          <div className="flex items-center gap-6 mt-3">
            <button
              onClick={handleLike}
              className={`flex items-center gap-1 text-sm transition-colors ${
                liked ? 'text-secondary' : 'text-text-secondary hover:text-secondary'
              }`}
            >
              <svg
                viewBox="0 0 24 24"
                width="18"
                height="18"
                fill={liked ? 'currentColor' : 'none'}
                stroke="currentColor"
                strokeWidth={liked ? 0 : 2}
              >
                <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
              </svg>
              <span>{likeCount > 0 ? likeCount : ''}</span>
            </button>

            {isOwner && (
              <button
                onClick={handleDelete}
                disabled={deleteTweet.isPending}
                className="text-text-secondary hover:text-secondary transition-colors opacity-0 group-hover:opacity-100 text-sm"
              >
                <svg
                  viewBox="0 0 24 24"
                  width="18"
                  height="18"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d="M20 6h-4V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v1H4v2h1v10a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8h1V6zm-6 0h-4V5h4v1z" />
                </svg>
              </button>
            )}
          </div>
        </div>
      </div>
    </article>
  );
}

export default TweetCard;
