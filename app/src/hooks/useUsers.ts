import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { getUser, getUserFollowers, getUserFollowing, followUser, unfollowUser, getAllUsers } from '../api/client'

export function useUser(id: number) {
  return useQuery({
    queryKey: ['user', id],
    queryFn: () => getUser(id),
    enabled: !!id,
  })
}

export function useUserFollowers(id: number) {
  return useQuery({
    queryKey: ['user', id, 'followers'],
    queryFn: () => getUserFollowers(id),
    enabled: !!id,
  })
}

export function useUserFollowing(id: number) {
  return useQuery({
    queryKey: ['user', id, 'following'],
    queryFn: () => getUserFollowing(id),
    enabled: !!id,
  })
}

export function useAllUsers() {
  return useQuery({
    queryKey: ['users'],
    queryFn: getAllUsers,
  })
}

export function useFollowUser() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (followingId: number) => followUser(followingId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['user'] })
    },
  })
}

export function useUnfollowUser() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (followingId: number) => unfollowUser(followingId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['user'] })
    },
  })
}
