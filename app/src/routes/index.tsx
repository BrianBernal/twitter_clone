import { useState, useEffect } from 'react';
import { createFileRoute, redirect } from '@tanstack/react-router';
import { getToken } from '../api/client';
import { useFeed } from '../hooks/useFeed';
import TweetCard from '../components/tweets/TweetCard';
import ComposeModal from '../components/tweets/ComposeModal';
import { useToast } from '../components/ui/Toast';

const Route = createFileRoute('/')({
  beforeLoad: () => {
    if (!getToken()) {
      throw redirect({ to: '/signin' });
    }
  },
  component: FeedPage,
});

function FeedPage() {
  const toast = useToast();
  const [composeOpen, setComposeOpen] = useState(false);
  const feed = useFeed();
  const tweets = feed.data?.pages.flatMap((page) => page.data) ?? [];

  useEffect(() => {
    if (feed.error) toast.show(feed.error.message);
  }, [feed.error, toast]);

  return (
    <div>
      <div className="sticky top-0 z-10 bg-surface/80 backdrop-blur border-b border-border">
        <div className="flex items-center justify-between px-4 h-[53px]">
          <h1 className="text-text-primary font-bold text-xl">Home</h1>
        </div>
      </div>

      <div className="divide-y divide-border">
        {feed.isLoading && (
          <div className="flex justify-center py-8">
            <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin" />
          </div>
        )}

        {feed.error && (
          <div className="text-center py-8 text-secondary">
            Failed to load feed. Please try again.
          </div>
        )}

        {!feed.isLoading && tweets.length === 0 && (
          <div className="text-center py-12 text-text-secondary">
            <p className="text-xl mb-2">No chirps yet</p>
            <p>Be the first to share something!</p>
          </div>
        )}

        {tweets.map((tweet) => (
          <TweetCard key={tweet.tweet_id} tweet={tweet} />
        ))}

        {feed.hasNextPage && (
          <div className="flex justify-center py-4">
            <button
              onClick={() => feed.fetchNextPage()}
              disabled={feed.isFetchingNextPage}
              className="bg-surface-2 text-primary font-bold px-6 py-2 rounded-full hover:bg-surface-3 transition-colors disabled:opacity-50"
            >
              {feed.isFetchingNextPage ? 'Loading...' : 'Show more'}
            </button>
          </div>
        )}
      </div>

      <button
        onClick={() => setComposeOpen(true)}
        className="fixed bottom-20 md:bottom-6 right-6 w-14 h-14 bg-primary text-white rounded-full shadow-lg hover:bg-primary-hover transition-colors flex items-center justify-center z-30"
      >
        <svg
          viewBox="0 0 24 24"
          width="24"
          height="24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        >
          <path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z" />
        </svg>
      </button>

      <ComposeModal open={composeOpen} onClose={() => setComposeOpen(false)} />
    </div>
  );
}

export { Route };
