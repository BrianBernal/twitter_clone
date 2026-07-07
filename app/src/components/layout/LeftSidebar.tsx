import { Link, useLocation } from '@tanstack/react-router';
import { getStoredUser, useSignout } from '../../hooks/useAuth';

const navItems = [
  { to: '/', label: 'Home', icon: HomeIcon },
  { to: '/users', label: 'Explore', icon: ExploreIcon },
  { to: '/following', label: 'Following', icon: FollowingIcon },
  { to: '/followers', label: 'Followers', icon: FollowersIcon },
];

function LeftSidebar() {
  const user = getStoredUser();
  const signout = useSignout();
  const location = useLocation();

  return (
    <aside className="fixed top-0 h-screen w-[275px] flex flex-col p-2">
      <div className="p-3 mb-2">
        <span className="text-2xl font-bold text-primary">Chirp</span>
      </div>

      <nav className="flex-1 flex flex-col gap-1">
        {navItems.map((item) => {
          const isActive =
            location.pathname === item.to ||
            (item.to === '/users' && location.pathname.startsWith('/users'));
          return (
            <Link
              key={item.to}
              to={item.to}
              className={`flex items-center gap-4 px-4 py-3 rounded-full text-lg transition-colors ${
                isActive ? 'text-text-primary font-bold' : 'text-text-primary hover:bg-surface-3'
              }`}
            >
              <item.icon active={isActive} />
              <span className="hidden xl:inline">{item.label}</span>
            </Link>
          );
        })}

        {user && (
          <Link
            to="/users/$id"
            params={{ id: String(user.user_id) }}
            className={`flex items-center gap-4 px-4 py-3 rounded-full text-lg transition-colors ${
              location.pathname === `/users/${user.user_id}`
                ? 'text-text-primary font-bold'
                : 'text-text-primary hover:bg-surface-3'
            }`}
          >
            <ProfileIcon active={location.pathname === `/users/${user.user_id}`} />
            <span className="hidden xl:inline">Profile</span>
          </Link>
        )}
      </nav>

      <div className="p-3 mt-auto">
        <button
          onClick={() => signout.mutate()}
          disabled={signout.isPending}
          className="flex items-center gap-4 px-4 py-3 rounded-full text-lg text-text-primary hover:bg-surface-3 transition-colors w-full"
        >
          <SignOutIcon />
          <span className="hidden xl:inline">
            {signout.isPending ? 'Signing out...' : 'Sign Out'}
          </span>
        </button>
      </div>
    </aside>
  );
}

function HomeIcon({ active }: { active?: boolean }) {
  return active ? (
    <svg viewBox="0 0 24 24" width="26" height="26" fill="currentColor">
      <path d="M12 1.696L.622 11.292l.76.98 1.618-1.25V21H9v-6h6v6h5.998V10.972l1.618 1.25.76-.98L12 1.696z" />
    </svg>
  ) : (
    <svg
      viewBox="0 0 24 24"
      width="26"
      height="26"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
    >
      <path d="M12 1.696L.622 11.292l.76.98 1.618-1.25V21H9v-6h6v6h5.998V10.972l1.618 1.25.76-.98L12 1.696z" />
    </svg>
  );
}

function ExploreIcon({ active }: { active?: boolean }) {
  return active ? (
    <svg viewBox="0 0 24 24" width="26" height="26" fill="currentColor">
      <path d="M10.25 3.75c-3.59 0-6.5 2.91-6.5 6.5s2.91 6.5 6.5 6.5c1.795 0 3.419-.726 4.596-1.904 1.178-1.177 1.904-2.801 1.904-4.596 0-3.59-2.91-6.5-6.5-6.5zm-8.5 6.5c0-4.694 3.806-8.5 8.5-8.5s8.5 3.806 8.5 8.5c0 1.986-.682 3.815-1.824 5.262l4.781 4.781-1.414 1.414-4.781-4.781c-1.447 1.142-3.276 1.824-5.262 1.824-4.694 0-8.5-3.806-8.5-8.5z" />
    </svg>
  ) : (
    <svg
      viewBox="0 0 24 24"
      width="26"
      height="26"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
    >
      <path d="M10.25 3.75c-3.59 0-6.5 2.91-6.5 6.5s2.91 6.5 6.5 6.5c1.795 0 3.419-.726 4.596-1.904 1.178-1.177 1.904-2.801 1.904-4.596 0-3.59-2.91-6.5-6.5-6.5zm-8.5 6.5c0-4.694 3.806-8.5 8.5-8.5s8.5 3.806 8.5 8.5c0 1.986-.682 3.815-1.824 5.262l4.781 4.781-1.414 1.414-4.781-4.781c-1.447 1.142-3.276 1.824-5.262 1.824-4.694 0-8.5-3.806-8.5-8.5z" />
    </svg>
  );
}

function FollowingIcon({ active }: { active?: boolean }) {
  return active ? (
    <svg viewBox="0 0 24 24" width="26" height="26" fill="currentColor">
      <path d="M5.5 3.5a2 2 0 1 0 0 4 2 2 0 0 0 0-4zM1.5 5.5a4 4 0 1 1 8 0 4 4 0 0 1-8 0zm16 2a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm-4 2a4 4 0 1 1 8 0 4 4 0 0 1-8 0zm-9 6c-2.07 0-3.5 1.08-4.2 2.6-.36.76-.8 2.09-.8 3.4h13c0-1.31-.44-2.64-.8-3.4-.7-1.52-2.13-2.6-4.2-2.6H4.5zm-4.5.5c1.14-1.93 3.66-3.5 6.5-3.5h2c2.84 0 5.36 1.57 6.5 3.5.46.78.99 2.1.99 4H0c0-1.9.53-3.22.99-4z" />
    </svg>
  ) : (
    <svg
      viewBox="0 0 24 24"
      width="26"
      height="26"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
    >
      <path d="M5.5 3.5a2 2 0 1 0 0 4 2 2 0 0 0 0-4zM1.5 5.5a4 4 0 1 1 8 0 4 4 0 0 1-8 0zm16 2a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm-4 2a4 4 0 1 1 8 0 4 4 0 0 1-8 0zm-9 6c-2.07 0-3.5 1.08-4.2 2.6-.36.76-.8 2.09-.8 3.4h13c0-1.31-.44-2.64-.8-3.4-.7-1.52-2.13-2.6-4.2-2.6H4.5z" />
    </svg>
  );
}

function FollowersIcon({ active }: { active?: boolean }) {
  return active ? (
    <svg viewBox="0 0 24 24" width="26" height="26" fill="currentColor">
      <path d="M5.5 3.5a2 2 0 1 0 0 4 2 2 0 0 0 0-4zM1.5 5.5a4 4 0 1 1 8 0 4 4 0 0 1-8 0zm9.5 2.5h2a5.4 5.4 0 0 1 3.5 1.32 5.4 5.4 0 0 1 3.5-1.32h2c1.77 0 3.5 1.06 3.5 3.5v1h-2v-1c0-.87-.6-1.5-1.5-1.5h-2c-.9 0-1.5.63-1.5 1.5v1h-2v-1c0-.87-.6-1.5-1.5-1.5h-2c-.9 0-1.5.63-1.5 1.5v1h-2v-1c0-2.44 1.73-3.5 3.5-3.5zm-4.5 6c-2.07 0-3.5 1.08-4.2 2.6-.36.76-.8 2.09-.8 3.4h13c0-1.31-.44-2.64-.8-3.4-.7-1.52-2.13-2.6-4.2-2.6H6.5zm-4.5.5c1.14-1.93 3.66-3.5 6.5-3.5h2c2.84 0 5.36 1.57 6.5 3.5.46.78.99 2.1.99 4H2c0-1.9.53-3.22.99-4z" />
    </svg>
  ) : (
    <svg
      viewBox="0 0 24 24"
      width="26"
      height="26"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
    >
      <path d="M5.5 3.5a2 2 0 1 0 0 4 2 2 0 0 0 0-4zM1.5 5.5a4 4 0 1 1 8 0 4 4 0 0 1-8 0zm9.5 2.5h2a5.4 5.4 0 0 1 3.5 1.32 5.4 5.4 0 0 1 3.5-1.32h2c1.77 0 3.5 1.06 3.5 3.5v1h-2v-1c0-.87-.6-1.5-1.5-1.5h-2c-.9 0-1.5.63-1.5 1.5v1h-2v-1c0-.87-.6-1.5-1.5-1.5h-2c-.9 0-1.5.63-1.5 1.5v1h-2v-1c0-2.44 1.73-3.5 3.5-3.5z" />
    </svg>
  );
}

function ProfileIcon({ active }: { active?: boolean }) {
  return active ? (
    <svg viewBox="0 0 24 24" width="26" height="26" fill="currentColor">
      <path d="M12 2.5a5.5 5.5 0 0 0-3.096 10.047 9.005 9.005 0 0 0-5.9 8.36.75.75 0 0 0 .75.75h16.492a.75.75 0 0 0 .75-.75 9.005 9.005 0 0 0-5.9-8.36A5.5 5.5 0 0 0 12 2.5zM8.5 8a3.5 3.5 0 1 1 7 0 3.5 3.5 0 0 1-7 0z" />
    </svg>
  ) : (
    <svg
      viewBox="0 0 24 24"
      width="26"
      height="26"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
    >
      <path d="M12 2.5a5.5 5.5 0 0 0-3.096 10.047 9.005 9.005 0 0 0-5.9 8.36.75.75 0 0 0 .75.75h16.492a.75.75 0 0 0 .75-.75 9.005 9.005 0 0 0-5.9-8.36A5.5 5.5 0 0 0 12 2.5zM8.5 8a3.5 3.5 0 1 1 7 0 3.5 3.5 0 0 1-7 0z" />
    </svg>
  );
}

function SignOutIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      width="26"
      height="26"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
    >
      <path d="M5 21h14a2 2 0 0 0 2-2V5a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v1h2V5h14v14H5v-1H3v1a2 2 0 0 0 2 2zM3 11h12.5l-3.5-3.5L13 6l5 5-5 5-1-1.5 3.5-3.5H3v-2z" />
    </svg>
  );
}

export default LeftSidebar;
