import { useState } from 'react';
import { useFeed } from '../hooks/useFeed';
import { useCreateTweet } from '../hooks/useTweets';
import { TweetCard } from './TweetCard';
import styles from './Feed.module.css';

function Feed() {
  const [content, setContent] = useState('');
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading } = useFeed();
  const createTweet = useCreateTweet();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!content.trim()) return;
    createTweet.mutate(content, {
      onSuccess: () => setContent(''),
    });
  };

  if (isLoading) return <div>Loading...</div>;

  const tweets = data?.pages.flatMap((page) => page.data) ?? [];

  return (
    <div>
      <form onSubmit={handleSubmit} className={styles.newTweet}>
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="What's happening?"
          maxLength={280}
          rows={3}
        />
        <button type="submit" disabled={!content.trim() || createTweet.isPending}>
          Tweet
        </button>
      </form>

      {tweets.map((tweet) => (
        <TweetCard key={tweet.tweet_id} tweet={tweet} />
      ))}

      {hasNextPage && (
        <button
          onClick={() => fetchNextPage()}
          disabled={isFetchingNextPage}
          className={styles.loadMore}
        >
          {isFetchingNextPage ? 'Loading...' : 'Load more'}
        </button>
      )}
    </div>
  );
}

export { Feed };
