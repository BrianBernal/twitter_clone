import { useInfiniteQuery } from '@tanstack/react-query';
import { getFeed } from '../api/client';

function useFeed() {
  return useInfiniteQuery({
    queryKey: ['feed'],
    queryFn: ({ pageParam }) => getFeed(20, pageParam),
    initialPageParam: 0,
    getNextPageParam: (lastPage, allPages) => {
      const tweets = lastPage.data;
      if (tweets.length < 20) return undefined;
      return allPages.length * 20;
    },
  });
}

export { useFeed };
