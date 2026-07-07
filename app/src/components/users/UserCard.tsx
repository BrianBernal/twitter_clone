import { Link } from '@tanstack/react-router';
import type { User } from '../../api/types';

interface UserCardProps {
  user: User;
  showFollowButton?: boolean;
  onFollow?: () => void;
  onUnfollow?: () => void;
  isFollowPending?: boolean;
  isFollowing?: boolean;
}

function UserCard({
  user,
  showFollowButton,
  onFollow,
  onUnfollow,
  isFollowPending,
  isFollowing: initialFollowing,
}: UserCardProps) {
  return (
    <div className="flex items-center gap-3 py-2">
      <Link to="/users/$id" params={{ id: String(user.user_id) }} className="shrink-0">
        <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center text-white font-bold text-sm">
          {user.first_name[0]}
          {user.last_name[0]}
        </div>
      </Link>

      <div className="flex-1 min-w-0">
        <Link to="/users/$id" params={{ id: String(user.user_id) }} className="hover:underline">
          <p className="text-text-primary font-bold truncate text-sm">
            {user.first_name} {user.last_name}
          </p>
          <p className="text-text-secondary text-sm truncate">@{user.user_handle}</p>
        </Link>
      </div>

      {showFollowButton && onFollow && onUnfollow && (
        <button
          onClick={initialFollowing ? onUnfollow : onFollow}
          disabled={isFollowPending}
          className={`shrink-0 px-4 py-1.5 rounded-full text-sm font-bold transition-colors ${
            initialFollowing
              ? 'border border-border text-text-primary hover:border-secondary hover:text-secondary'
              : 'bg-primary text-white hover:bg-primary-hover'
          } disabled:opacity-50`}
        >
          {isFollowPending ? '...' : initialFollowing ? 'Unfollow' : 'Follow'}
        </button>
      )}
    </div>
  );
}

export default UserCard;
