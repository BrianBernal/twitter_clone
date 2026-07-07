import { Link, useLocation } from '@tanstack/react-router';
import { getStoredUser, useSignout } from '../../hooks/useAuth';

interface MobileDrawerProps {
  open: boolean;
  onClose: () => void;
}

interface NavItemProps {
  to: string;
  params?: Record<string, string>;
  label: string;
  icon: React.ComponentType<{ active?: boolean }>;
  active: boolean;
  onClick: () => void;
}

function NavItem({ to, params, label, icon: Icon, active, onClick }: NavItemProps) {
  return (
    <Link
      to={to as '/' | '/users' | '/following' | '/followers' | '/users/$id'}
      params={params}
      onClick={onClick}
      className={`flex items-center gap-4 px-4 py-3 rounded-full text-lg transition-colors ${
        active ? 'text-text-primary font-bold' : 'text-text-primary hover:bg-surface-3'
      }`}
    >
      <Icon active={active} />
      <span>{label}</span>
    </Link>
  );
}

function MobileDrawer({ open, onClose }: MobileDrawerProps) {
  const user = getStoredUser();
  const signout = useSignout();
  const location = useLocation();
  const pathname = location.pathname;

  const isActive = (to: string) =>
    pathname === to || (to === '/users' && pathname.startsWith('/users'));

  return (
    <>
      {open && <div className="fixed inset-0 bg-black/50 z-40 md:hidden" onClick={onClose} />}

      <div
        className={`fixed top-0 left-0 h-full w-72 bg-surface z-50 transform transition-transform duration-300 md:hidden ${
          open ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="p-4 border-b border-border">
          <span className="text-2xl font-bold text-primary">Chirp</span>
        </div>

        <nav className="p-2 space-y-1">
          <NavItem to="/" label="Home" icon={HomeIcon} active={isActive('/')} onClick={onClose} />
          <NavItem
            to="/users"
            label="Explore"
            icon={ExploreIcon}
            active={isActive('/users')}
            onClick={onClose}
          />
          <NavItem
            to="/following"
            label="Following"
            icon={FollowingIcon}
            active={isActive('/following')}
            onClick={onClose}
          />
          <NavItem
            to="/followers"
            label="Followers"
            icon={FollowersIcon}
            active={isActive('/followers')}
            onClick={onClose}
          />
          {user && (
            <NavItem
              to="/users/$id"
              params={{ id: String(user.user_id) }}
              label="Profile"
              icon={ProfileIcon}
              active={isActive(`/users/${user.user_id}`)}
              onClick={onClose}
            />
          )}
        </nav>

        <div className="absolute bottom-4 left-0 right-0 px-2">
          <button
            onClick={() => {
              signout.mutate();
              onClose();
            }}
            disabled={signout.isPending}
            className="flex items-center gap-4 px-4 py-3 rounded-full text-lg text-text-primary hover:bg-surface-3 transition-colors w-full"
          >
            <SignOutIcon />
            <span>{signout.isPending ? 'Signing out...' : 'Sign Out'}</span>
          </button>
        </div>
      </div>
    </>
  );
}

function HomeIcon({ active }: { active?: boolean }) {
  return (
    <svg
      viewBox="0 0 24 24"
      width="26"
      height="26"
      fill={active ? 'currentColor' : 'none'}
      stroke="currentColor"
      strokeWidth={active ? 0 : 2}
    >
      <path d="M12 1.696L.622 11.292l.76.98 1.618-1.25V21H9v-6h6v6h5.998V10.972l1.618 1.25.76-.98L12 1.696z" />
    </svg>
  );
}

function ExploreIcon({ active }: { active?: boolean }) {
  return (
    <svg
      viewBox="0 0 24 24"
      width="26"
      height="26"
      fill={active ? 'currentColor' : 'none'}
      stroke="currentColor"
      strokeWidth={active ? 0 : 2}
    >
      <path d="M10.25 3.75c-3.59 0-6.5 2.91-6.5 6.5s2.91 6.5 6.5 6.5c1.795 0 3.419-.726 4.596-1.904 1.178-1.177 1.904-2.801 1.904-4.596 0-3.59-2.91-6.5-6.5-6.5z" />
    </svg>
  );
}

function FollowingIcon({ active }: { active?: boolean }) {
  return (
    <svg
      viewBox="0 0 24 24"
      width="26"
      height="26"
      fill={active ? 'currentColor' : 'none'}
      stroke="currentColor"
      strokeWidth={active ? 0 : 2}
    >
      <path d="M5.5 3.5a2 2 0 1 0 0 4 2 2 0 0 0 0-4zM1.5 5.5a4 4 0 1 1 8 0 4 4 0 0 1-8 0zm16 2a2 2 0 1 0 0 4 2 2 0 0 0 0-4z" />
    </svg>
  );
}

function FollowersIcon({ active }: { active?: boolean }) {
  return (
    <svg
      viewBox="0 0 24 24"
      width="26"
      height="26"
      fill={active ? 'currentColor' : 'none'}
      stroke="currentColor"
      strokeWidth={active ? 0 : 2}
    >
      <path d="M5.5 3.5a2 2 0 1 0 0 4 2 2 0 0 0 0-4zM1.5 5.5a4 4 0 1 1 8 0 4 4 0 0 1-8 0zm9.5 2.5h2a5.4 5.4 0 0 1 3.5 1.32 5.4 5.4 0 0 1 3.5-1.32h2c1.77 0 3.5 1.06 3.5 3.5v1h-2v-1c0-.87-.6-1.5-1.5-1.5h-2c-.9 0-1.5.63-1.5 1.5v1h-2v-1c0-.87-.6-1.5-1.5-1.5h-2c-.9 0-1.5.63-1.5 1.5v1h-2v-1c0-2.44 1.73-3.5 3.5-3.5z" />
    </svg>
  );
}

function ProfileIcon({ active }: { active?: boolean }) {
  return (
    <svg
      viewBox="0 0 24 24"
      width="26"
      height="26"
      fill={active ? 'currentColor' : 'none'}
      stroke="currentColor"
      strokeWidth={active ? 0 : 2}
    >
      <path d="M12 2.5a5.5 5.5 0 0 0-3.096 10.047 9.005 9.005 0 0 0-5.9 8.36.75.75 0 0 0 .75.75h16.492a.75.75 0 0 0 .75-.75 9.005 9.005 0 0 0-5.9-8.36A5.5 5.5 0 0 0 12 2.5z" />
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

export default MobileDrawer;
