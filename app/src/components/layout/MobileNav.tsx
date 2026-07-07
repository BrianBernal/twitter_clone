import { Link, useLocation } from '@tanstack/react-router';
import { getStoredUser } from '../../hooks/useAuth';

interface MobileNavItem {
  to: string;
  label: string;
  icon: React.ComponentType<{ active?: boolean }>;
  params?: Record<string, string>;
}

function MobileNav() {
  const user = getStoredUser();
  const location = useLocation();
  const pathname = location.pathname;

  const items: MobileNavItem[] = [
    { to: '/', label: 'Home', icon: HomeIcon },
    { to: '/users', label: 'Explore', icon: ExploreIcon },
    { to: '/following', label: 'Following', icon: FollowingIcon },
    { to: '/followers', label: 'Followers', icon: FollowersIcon },
    ...(user
      ? [
          {
            to: '/users/$id',
            params: { id: String(user.user_id) },
            label: 'Profile',
            icon: ProfileIcon,
          },
        ]
      : []),
  ];

  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-surface border-t border-border z-50">
      <div className="flex justify-around items-center py-2">
        {items.map((item) => {
          const hasParams = 'params' in item && item.params;
          const isActive = hasParams
            ? pathname === `/users/${item.params!.id}`
            : pathname === item.to || (item.to === '/users' && pathname.startsWith('/users'));
          return (
            <Link
              key={item.to}
              to={item.to as '/' | '/users' | '/following' | '/followers' | '/users/$id'}
              params={item.params}
              className={`flex flex-col items-center gap-0.5 px-3 py-1 ${
                isActive ? 'text-primary' : 'text-text-secondary'
              }`}
            >
              <item.icon active={isActive} />
              <span className="text-xs">{item.label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}

function HomeIcon({ active }: { active?: boolean }) {
  return (
    <svg
      viewBox="0 0 24 24"
      width="24"
      height="24"
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
      width="24"
      height="24"
      fill={active ? 'currentColor' : 'none'}
      stroke="currentColor"
      strokeWidth={active ? 0 : 2}
    >
      <path d="M10.25 3.75c-3.59 0-6.5 2.91-6.5 6.5s2.91 6.5 6.5 6.5c1.795 0 3.419-.726 4.596-1.904 1.178-1.177 1.904-2.801 1.904-4.596 0-3.59-2.91-6.5-6.5-6.5zm-8.5 6.5c0-4.694 3.806-8.5 8.5-8.5s8.5 3.806 8.5 8.5c0 1.986-.682 3.815-1.824 5.262l4.781 4.781-1.414 1.414-4.781-4.781c-1.447 1.142-3.276 1.824-5.262 1.824-4.694 0-8.5-3.806-8.5-8.5z" />
    </svg>
  );
}

function FollowingIcon({ active }: { active?: boolean }) {
  return (
    <svg
      viewBox="0 0 24 24"
      width="24"
      height="24"
      fill={active ? 'currentColor' : 'none'}
      stroke="currentColor"
      strokeWidth={active ? 0 : 2}
    >
      <path d="M5.5 3.5a2 2 0 1 0 0 4 2 2 0 0 0 0-4zM1.5 5.5a4 4 0 1 1 8 0 4 4 0 0 1-8 0zm16 2a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm-4 2a4 4 0 1 1 8 0 4 4 0 0 1-8 0zm-9 6c-2.07 0-3.5 1.08-4.2 2.6-.36.76-.8 2.09-.8 3.4h13c0-1.31-.44-2.64-.8-3.4-.7-1.52-2.13-2.6-4.2-2.6H4.5z" />
    </svg>
  );
}

function FollowersIcon({ active }: { active?: boolean }) {
  return (
    <svg
      viewBox="0 0 24 24"
      width="24"
      height="24"
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
      width="24"
      height="24"
      fill={active ? 'currentColor' : 'none'}
      stroke="currentColor"
      strokeWidth={active ? 0 : 2}
    >
      <path d="M12 2.5a5.5 5.5 0 0 0-3.096 10.047 9.005 9.005 0 0 0-5.9 8.36.75.75 0 0 0 .75.75h16.492a.75.75 0 0 0 .75-.75 9.005 9.005 0 0 0-5.9-8.36A5.5 5.5 0 0 0 12 2.5zM8.5 8a3.5 3.5 0 1 1 7 0 3.5 3.5 0 0 1-7 0z" />
    </svg>
  );
}

export default MobileNav;
