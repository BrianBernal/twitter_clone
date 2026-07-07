import { createFileRoute, redirect } from '@tanstack/react-router';
import { getToken } from '../api/client';
import { getStoredUser } from '../hooks/useAuth';
import { useUserFollowing, useFollowUser, useUnfollowUser } from '../hooks/useUsers';
import UserCard from '../components/users/UserCard';

const Route = createFileRoute('/following')({
  beforeLoad: () => {
    if (!getToken()) throw redirect({ to: '/signin' });
  },
  component: FollowingPage,
});

function FollowingPage() {
  const currentUser = getStoredUser();
  const { data, isLoading } = useUserFollowing(currentUser?.user_id ?? 0);
  const followUser = useFollowUser();
  const unfollowUser = useUnfollowUser();
  const following = data?.data ?? [];

  return (
    <div>
      <div className="sticky top-0 z-10 bg-surface/80 backdrop-blur border-b border-border">
        <div className="flex items-center px-4 h-[53px]">
          <h1 className="text-text-primary font-bold text-xl">Following</h1>
        </div>
      </div>

      <div className="px-4 py-2">
        {isLoading && (
          <div className="flex justify-center py-8">
            <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin" />
          </div>
        )}

        {!isLoading && following.length === 0 && (
          <div className="text-center py-12 text-text-secondary">
            <p className="text-xl mb-2">Not following anyone yet</p>
          </div>
        )}

        {following.map((user) => (
          <UserCard
            key={user.user_id}
            user={user}
            showFollowButton
            isFollowing
            onFollow={() => followUser.mutate(user.user_id)}
            onUnfollow={() => unfollowUser.mutate(user.user_id)}
            isFollowPending={followUser.isPending || unfollowUser.isPending}
          />
        ))}
      </div>
    </div>
  );
}

export { Route };
