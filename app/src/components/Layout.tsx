import { Link, Outlet } from '@tanstack/react-router';
import { getToken } from '../api/client';
import { useSignout } from '../hooks/useAuth';
import styles from './Layout.module.css';

function Layout() {
  const isAuthenticated = !!getToken();
  const signout = useSignout();

  return (
    <div>
      <header className={styles.header}>
        <h1>
          <Link to="/">Twitter Clone</Link>
        </h1>
        <nav>
          {isAuthenticated ? (
            <>
              <Link to="/">Feed</Link>
              <Link to="/users">Users</Link>
              <button onClick={() => signout.mutate()}>Sign out</button>
            </>
          ) : (
            <>
              <Link to="/signin">Sign in</Link>
              <Link to="/signup">Sign up</Link>
            </>
          )}
        </nav>
      </header>
      <main className={styles.main}>
        <Outlet />
      </main>
    </div>
  );
}

export { Layout };
