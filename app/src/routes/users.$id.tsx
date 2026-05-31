import { createFileRoute, Navigate } from '@tanstack/react-router';
import { useUser } from '../hooks/useUsers';
import { getToken } from '../api/client';

const Route = createFileRoute('/users/$id')({
  component: UserProfilePage,
});

function UserProfilePage() {
  const { id } = Route.useParams();
  const { data, isLoading } = useUser(Number(id));

  if (!getToken()) {
    return <Navigate to="/signin" />;
  }

  if (isLoading) return <div>Loading...</div>;

  const user = data?.data;

  if (!user) return <div>User not found</div>;

  return (
    <div>
      <h2>
        {user.first_name} {user.last_name}
      </h2>
      <p style={{ color: '#657786' }}>@{user.user_handle}</p>
      <p>{user.email_address}</p>
      <div style={{ display: 'flex', gap: 24, marginTop: 16 }}>
        <span>
          <strong>{user.tweet_count ?? 0}</strong> Tweets
        </span>
        <span>
          <strong>{user.follower_count ?? 0}</strong> Followers
        </span>
        <span>
          <strong>{user.following_count ?? 0}</strong> Following
        </span>
      </div>
    </div>
  );
}

export { Route };
