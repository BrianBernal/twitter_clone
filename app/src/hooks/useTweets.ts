import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createTweet, deleteTweet, likeTweet, unlikeTweet } from '../api/client';
import { useToast } from '../components/ui/Toast';

function useCreateTweet() {
  const queryClient = useQueryClient();
  const toast = useToast();
  return useMutation({
    mutationFn: (text: string) => createTweet(text),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['feed'] });
    },
    onError: (e) => toast.show(e.message),
  });
}

function useDeleteTweet() {
  const queryClient = useQueryClient();
  const toast = useToast();
  return useMutation({
    mutationFn: (id: number) => deleteTweet(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['feed'] });
    },
    onError: (e) => toast.show(e.message),
  });
}

function useLikeTweet(options?: { onError?: (e: Error) => void }) {
  const queryClient = useQueryClient();
  const toast = useToast();
  return useMutation({
    mutationFn: (id: number) => likeTweet(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['feed'] });
    },
    onError: (e) => {
      toast.show(e.message);
      options?.onError?.(e);
    },
  });
}

function useUnlikeTweet(options?: { onError?: (e: Error) => void }) {
  const queryClient = useQueryClient();
  const toast = useToast();
  return useMutation({
    mutationFn: (id: number) => unlikeTweet(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['feed'] });
    },
    onError: (e) => {
      toast.show(e.message);
      options?.onError?.(e);
    },
  });
}

export { useCreateTweet, useDeleteTweet, useLikeTweet, useUnlikeTweet };
