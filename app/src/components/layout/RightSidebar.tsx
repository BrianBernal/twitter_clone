import { Link } from '@tanstack/react-router';
import { getStoredUser } from '../../hooks/useAuth';
import { useUser, useAllUsers, useFollowUser, useUnfollowUser } from '../../hooks/useUsers';
import UserCard from '../users/UserCard';

function RightSidebar() {
  const storedUser = getStoredUser();

  if (!storedUser) return null;

  return (
    <aside className="w-[350px] shrink-0">
      <div className="fixed top-0 h-screen w-[350px] overflow-y-auto p-4 space-y-4">
        <ProfileCard userId={storedUser.user_id} />
        <WhoToFollow userId={storedUser.user_id} />
      </div>
    </aside>
  );
}

function ProfileCard({ userId }: { userId: number }) {
  const { data, isLoading } = useUser(userId);
  const user = data?.data;

  if (isLoading || !user) return null;

  return (
    <div className="bg-surface-2 rounded-xl p-4">
      <div className="flex items-center gap-3 mb-3">
        <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center text-white font-bold text-lg">
          {user.first_name[0]}
          {user.last_name[0]}
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-text-primary font-bold truncate">
            {user.first_name} {user.last_name}
          </p>
          <p className="text-text-secondary text-sm">@{user.user_handle}</p>
        </div>
      </div>
      <div className="flex gap-4 text-sm">
        <Link
          to="/users/$id"
          params={{ id: String(userId) }}
          className="text-text-primary hover:underline"
        >
          <span className="font-bold">{user.tweet_count ?? 0}</span>{' '}
          <span className="text-text-secondary">Posts</span>
        </Link>
        <Link to="/following" className="text-text-primary hover:underline">
          <span className="font-bold">{user.following_count ?? 0}</span>{' '}
          <span className="text-text-secondary">Following</span>
        </Link>
        <Link to="/followers" className="text-text-primary hover:underline">
          <span className="font-bold">{user.follower_count}</span>{' '}
          <span className="text-text-secondary">Followers</span>
        </Link>
      </div>
    </div>
  );
}

function WhoToFollow({ userId }: { userId: number }) {
  const { data, isLoading } = useAllUsers();
  const followUser = useFollowUser();
  const unfollowUser = useUnfollowUser();

  const otherUsers = (data?.data ?? []).filter((u) => u.user_id !== userId);

  if (isLoading || otherUsers.length === 0) return null;

  return (
    <div className="bg-surface-2 rounded-xl p-4">
      <h2 className="text-text-primary font-bold text-lg mb-3">Who to follow</h2>
      <div className="space-y-3">
        {otherUsers.slice(0, 3).map((user) => (
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

export default RightSidebar;
