import { createRootRoute } from '@tanstack/react-router';
import { Layout } from '../components/Layout';

const Route = createRootRoute({
  component: Layout,
});

export { Route };
