import { useEffect } from 'react';
import { createFileRoute, redirect, Link } from '@tanstack/react-router';
import { getToken } from '../api/client';
import { useAllUsers } from '../hooks/useUsers';
import { getStoredUser } from '../hooks/useAuth';
import { useToast } from '../components/ui/Toast';

const Route = createFileRoute('/users/')({
  beforeLoad: () => {
    if (!getToken()) throw redirect({ to: '/signin' });
  },
  component: UsersPage,
});

function UsersPage() {
  const currentUser = getStoredUser();
  const toast = useToast();
  const { data, isLoading, error } = useAllUsers();
  const users = (data?.data ?? []).filter((u) => u.user_id !== currentUser?.user_id);

  useEffect(() => {
    if (error) toast.show(error.message);
  }, [error, toast]);

  return (
    <div>
      <div className="sticky top-0 z-10 bg-surface/80 backdrop-blur border-b border-border">
        <div className="flex items-center px-4 h-[53px]">
          <h1 className="text-text-primary font-bold text-xl">Explore</h1>
        </div>
      </div>

      <div className="px-4 py-2">
        {isLoading && (
          <div className="flex justify-center py-8">
            <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin" />
          </div>
        )}

        {users.map((user) => (
          <Link
            key={user.user_id}
            to="/users/$id"
            params={{ id: String(user.user_id) }}
            className="flex items-center gap-3 py-3 border-b border-border hover:bg-surface-3/50 transition-colors"
          >
            <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center text-white font-bold text-sm shrink-0">
              {user.first_name[0]}
              {user.last_name[0]}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-text-primary font-bold truncate">
                {user.first_name} {user.last_name}
              </p>
              <p className="text-text-secondary text-sm truncate">@{user.user_handle}</p>
            </div>
            <svg
              viewBox="0 0 24 24"
              width="18"
              height="18"
              className="text-text-secondary shrink-0"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M9 18l6-6-6-6" />
            </svg>
          </Link>
        ))}
      </div>
    </div>
  );
}

export { Route };
