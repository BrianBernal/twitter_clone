import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import {
  getUser,
  getUserFollowers,
  getUserFollowing,
  followUser,
  unfollowUser,
  getAllUsers,
} from '../api/client';

function useUser(id: number) {
  return useQuery({
    queryKey: ['user', id],
    queryFn: () => getUser(id),
    enabled: !!id,
  });
}

function useUserFollowers(id: number) {
  return useQuery({
    queryKey: ['user', id, 'followers'],
    queryFn: () => getUserFollowers(id),
    enabled: !!id,
  });
}

function useUserFollowing(id: number) {
  return useQuery({
    queryKey: ['user', id, 'following'],
    queryFn: () => getUserFollowing(id),
    enabled: !!id,
  });
}

function useAllUsers() {
  return useQuery({
    queryKey: ['users'],
    queryFn: getAllUsers,
  });
}

function useFollowUser() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (followingId: number) => followUser(followingId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['user'] });
    },
  });
}

function useUnfollowUser() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (followingId: number) => unfollowUser(followingId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['user'] });
    },
  });
}

export { useUser, useUserFollowers, useUserFollowing, useAllUsers, useFollowUser, useUnfollowUser };
