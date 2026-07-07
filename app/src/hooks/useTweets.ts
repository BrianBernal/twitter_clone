import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createTweet, deleteTweet, likeTweet, unlikeTweet } from '../api/client';

function useCreateTweet() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (text: string) => createTweet(text),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['feed'] });
    },
  });
}

function useDeleteTweet() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: number) => deleteTweet(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['feed'] });
    },
  });
}

function useLikeTweet() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: number) => likeTweet(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['feed'] });
    },
  });
}

function useUnlikeTweet() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: number) => unlikeTweet(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['feed'] });
    },
  });
}

export { useCreateTweet, useDeleteTweet, useLikeTweet, useUnlikeTweet };
