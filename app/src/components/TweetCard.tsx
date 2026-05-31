import type { Tweet } from '../api/types';
import { useLikeTweet } from '../hooks/useTweets';
import styles from './TweetCard.module.css';

interface TweetCardProps {
  tweet: Tweet;
}

export function TweetCard({ tweet }: TweetCardProps) {
  const likeMutation = useLikeTweet();

  const handleLike = () => {
    likeMutation.mutate(tweet.tweet_id);
  };

  return (
    <div className={styles.tweet}>
      <div className={styles.tweetHeader}>
        <span className={styles.handle}>@{tweet.user_handle}</span>
      </div>
      <div className={styles.content}>{tweet.tweet_text}</div>
      <div className={styles.actions}>
        <button onClick={handleLike}>♡ {tweet.likes_count}</button>
      </div>
    </div>
  );
}
