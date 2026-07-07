import { createFileRoute, redirect, Link } from '@tanstack/react-router';
import { getToken } from '../api/client';
import { useUser, useUserFollowers, useUserFollowing } from '../hooks/useUsers';
import { getStoredUser } from '../hooks/useAuth';

const Route = createFileRoute('/users/$id')({
  beforeLoad: () => {
    if (!getToken()) throw redirect({ to: '/signin' });
  },
  component: UserProfilePage,
});

function UserProfilePage() {
  const { id } = Route.useParams();
  const userId = Number(id);
  const currentUser = getStoredUser();
  const { data: userData, isLoading } = useUser(userId);
  const { data: followersData } = useUserFollowers(userId);
  const { data: followingData } = useUserFollowing(userId);
  const user = userData?.data;
  const followers = followersData?.data ?? [];
  const following = followingData?.data ?? [];
  const isOwnProfile = currentUser?.user_id === userId;

  if (isLoading) {
    return (
      <div className="flex justify-center py-8">
        <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (!user) {
    return (
      <div className="text-center py-12 text-text-secondary">
        <p className="text-xl">User not found</p>
      </div>
    );
  }

  return (
    <div>
      <div className="sticky top-0 z-10 bg-surface/80 backdrop-blur border-b border-border">
        <div className="flex items-center px-4 h-[53px]">
          <Link to="/users" className="text-text-primary hover:text-primary transition-colors mr-4">
            <svg
              viewBox="0 0 24 24"
              width="20"
              height="20"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M19 12H5m7-7l-7 7 7 7" />
            </svg>
          </Link>
          <div>
            <h1 className="text-text-primary font-bold text-lg leading-tight">
              {user.first_name} {user.last_name}
            </h1>
            <p className="text-text-secondary text-sm">@{user.user_handle}</p>
          </div>
        </div>
      </div>

      <div className="h-32 bg-surface-3" />

      <div className="px-4 -mt-12 mb-4">
        <div className="w-24 h-24 rounded-full bg-primary border-4 border-surface flex items-center justify-center text-white font-bold text-3xl">
          {user.first_name[0]}
          {user.last_name[0]}
        </div>
      </div>

      <div className="px-4 mb-4">
        <h2 className="text-text-primary font-bold text-xl">
          {user.first_name} {user.last_name}
        </h2>
        <p className="text-text-secondary">@{user.user_handle}</p>
      </div>

      <div className="flex gap-6 px-4 mb-4 text-sm">
        <div>
          <span className="font-bold text-text-primary">{user.tweet_count ?? 0}</span>{' '}
          <span className="text-text-secondary">Posts</span>
        </div>
        {isOwnProfile ? (
          <>
            <Link to="/following" className="hover:underline">
              <span className="font-bold text-text-primary">{user.following_count ?? 0}</span>{' '}
              <span className="text-text-secondary">Following</span>
            </Link>
            <Link to="/followers" className="hover:underline">
              <span className="font-bold text-text-primary">{user.follower_count}</span>{' '}
              <span className="text-text-secondary">Followers</span>
            </Link>
          </>
        ) : (
          <>
            <div>
              <span className="font-bold text-text-primary">{user.following_count ?? 0}</span>{' '}
              <span className="text-text-secondary">Following</span>
            </div>
            <div>
              <span className="font-bold text-text-primary">{user.follower_count}</span>{' '}
              <span className="text-text-secondary">Followers</span>
            </div>
          </>
        )}
      </div>

      {followers.length > 0 && (
        <div className="px-4 mb-4">
          <h3 className="text-text-primary font-bold text-sm mb-2">Followers</h3>
          <div className="flex flex-wrap gap-2">
            {followers.slice(0, 5).map((f) => (
              <Link
                key={f.user_id}
                to="/users/$id"
                params={{ id: String(f.user_id) }}
                className="w-8 h-8 rounded-full bg-surface-3 flex items-center justify-center text-text-secondary text-xs font-bold hover:bg-surface-2 transition-colors"
                title={`@${f.user_handle}`}
              >
                {f.first_name[0]}
              </Link>
            ))}
            {followers.length > 5 && (
              <span className="text-text-secondary text-xs flex items-center">
                +{followers.length - 5} more
              </span>
            )}
          </div>
        </div>
      )}

      {following.length > 0 && (
        <div className="px-4">
          <h3 className="text-text-primary font-bold text-sm mb-2">Following</h3>
          <div className="flex flex-wrap gap-2">
            {following.slice(0, 5).map((f) => (
              <Link
                key={f.user_id}
                to="/users/$id"
                params={{ id: String(f.user_id) }}
                className="w-8 h-8 rounded-full bg-surface-3 flex items-center justify-center text-text-secondary text-xs font-bold hover:bg-surface-2 transition-colors"
                title={`@${f.user_handle}`}
              >
                {f.first_name[0]}
              </Link>
            ))}
            {following.length > 5 && (
              <span className="text-text-secondary text-xs flex items-center">
                +{following.length - 5} more
              </span>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export { Route };
