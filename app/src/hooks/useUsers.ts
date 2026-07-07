import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import {
  getUser,
  getUserFollowers,
  getUserFollowing,
  getAllUsers,
  followUser,
  unfollowUser,
} from '../api/client';
import { useToast } from '../components/ui/Toast';

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
    queryFn: () => getAllUsers(),
  });
}

function useFollowUser() {
  const queryClient = useQueryClient();
  const toast = useToast();
  return useMutation({
    mutationFn: (id: number) => followUser(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['user'] });
      queryClient.invalidateQueries({ queryKey: ['users'] });
    },
    onError: (e) => toast.show(e.message),
  });
}

function useUnfollowUser() {
  const queryClient = useQueryClient();
  const toast = useToast();
  return useMutation({
    mutationFn: (id: number) => unfollowUser(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['user'] });
      queryClient.invalidateQueries({ queryKey: ['users'] });
    },
    onError: (e) => toast.show(e.message),
  });
}

export { useUser, useUserFollowers, useUserFollowing, useAllUsers, useFollowUser, useUnfollowUser };
