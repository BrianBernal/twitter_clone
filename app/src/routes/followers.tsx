import { createFileRoute, redirect } from '@tanstack/react-router';
import { getToken } from '../api/client';
import { getStoredUser } from '../hooks/useAuth';
import { useUserFollowers, useFollowUser, useUnfollowUser } from '../hooks/useUsers';
import UserCard from '../components/users/UserCard';

const Route = createFileRoute('/followers')({
  beforeLoad: () => {
    if (!getToken()) throw redirect({ to: '/signin' });
  },
  component: FollowersPage,
});

function FollowersPage() {
  const currentUser = getStoredUser();
  const { data, isLoading } = useUserFollowers(currentUser?.user_id ?? 0);
  const followUser = useFollowUser();
  const unfollowUser = useUnfollowUser();
  const followers = data?.data ?? [];

  return (
    <div>
      <div className="sticky top-0 z-10 bg-surface/80 backdrop-blur border-b border-border">
        <div className="flex items-center px-4 h-[53px]">
          <h1 className="text-text-primary font-bold text-xl">Followers</h1>
        </div>
      </div>

      <div className="px-4 py-2">
        {isLoading && (
          <div className="flex justify-center py-8">
            <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin" />
          </div>
        )}

        {!isLoading && followers.length === 0 && (
          <div className="text-center py-12 text-text-secondary">
            <p className="text-xl mb-2">No followers yet</p>
          </div>
        )}

        {followers.map((user) => (
          <UserCard
            key={user.user_id}
            user={user}
            showFollowButton
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
