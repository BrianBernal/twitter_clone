import { useMutation, useQueryClient } from '@tanstack/react-query'
import { createTweet, deleteTweet, likeTweet, unlikeTweet } from '../api/client'

export function useCreateTweet() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (tweet_text: string) => createTweet(tweet_text),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['feed'] })
    },
  })
}

export function useDeleteTweet() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (id: number) => deleteTweet(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['feed'] })
    },
  })
}

export function useLikeTweet() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (id: number) => likeTweet(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['feed'] })
    },
  })
}

export function useUnlikeTweet() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (id: number) => unlikeTweet(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['feed'] })
    },
  })
}
