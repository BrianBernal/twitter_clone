import { createFileRoute, Link } from '@tanstack/react-router';
import { useAllUsers } from '../hooks/useUsers';
import { getToken } from '../api/client';
import { Navigate } from '@tanstack/react-router';

const Route = createFileRoute('/users/')({
  component: UsersPage,
});

function UsersPage() {
  const { data, isLoading } = useAllUsers();

  if (!getToken()) {
    return <Navigate to="/signin" />;
  }

  if (isLoading) return <div>Loading...</div>;

  const users = data?.data ?? [];

  return (
    <div>
      <h2>All Users</h2>
      {users.map((user) => (
        <div key={user.user_id} style={{ padding: '8px 0', borderBottom: '1px solid #e1e8ed' }}>
          <Link to="/users/$id" params={{ id: String(user.user_id) }}>
            <strong>
              {user.first_name} {user.last_name}
            </strong>{' '}
            <span style={{ color: '#657786' }}>@{user.user_handle}</span>
          </Link>
        </div>
      ))}
    </div>
  );
}

export { Route };
