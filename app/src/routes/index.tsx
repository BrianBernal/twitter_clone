import { createFileRoute, Navigate } from '@tanstack/react-router';
import { getToken } from '../api/client';
import { Feed } from '../components/Feed';

export const Route = createFileRoute('/')({
  component: IndexRoute,
});

function IndexRoute() {
  const isAuthenticated = !!getToken();

  if (!isAuthenticated) {
    return <Navigate to="/signin" />;
  }

  return <Feed />;
}
