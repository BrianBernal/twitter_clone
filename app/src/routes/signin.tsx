import { useState } from 'react';
import { createFileRoute, Link } from '@tanstack/react-router';
import { useSignin } from '../hooks/useAuth';

const seedAccounts = [
  { handle: 'alice', email: 'alice@example.com', name: 'Alice Johnson' },
  { handle: 'bob', email: 'bob@example.com', name: 'Bob Smith' },
  { handle: 'charlie', email: 'charlie@example.com', name: 'Charlie Brown' },
  { handle: 'diana', email: 'diana@example.com', name: 'Diana Prince' },
  { handle: 'eve', email: 'eve@example.com', name: 'Eve Davis' },
];

const Route = createFileRoute('/signin')({
  component: SignInPage,
});

function SignInPage() {
  const [email, setEmail] = useState('');
  const signin = useSignin();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;
    signin.mutate(email.trim());
  };

  return (
    <div className="w-full max-w-md">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold text-primary mb-2">Chirp</h1>
        <p className="text-text-secondary">Sign in to your account</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="email" className="block text-text-secondary text-sm mb-1">
            Email address
          </label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@example.com"
            required
            className="w-full bg-surface-2 text-text-primary border border-border rounded-lg px-4 py-3 focus:outline-none focus:border-primary transition-colors placeholder-text-secondary"
          />
        </div>

        {signin.error && <p className="text-secondary text-sm">{signin.error.message}</p>}

        <button
          type="submit"
          disabled={!email.trim() || signin.isPending}
          className="w-full bg-primary text-white font-bold py-3 rounded-full hover:bg-primary-hover disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          {signin.isPending ? 'Signing in...' : 'Sign In'}
        </button>
      </form>

      <div className="mt-8">
        <p className="text-text-secondary text-sm mb-3 text-center">
          Quick sign in with a seed account
        </p>
        <div className="flex flex-wrap gap-2 justify-center">
          {seedAccounts.map((account) => (
            <button
              key={account.email}
              onClick={() => setEmail(account.email)}
              className="bg-surface-2 text-text-primary border border-border px-4 py-2 rounded-full text-sm hover:bg-surface-3 transition-colors"
            >
              <span className="font-bold">{account.handle}</span>
              <span className="text-text-secondary ml-1">{account.name}</span>
            </button>
          ))}
        </div>
      </div>

      <p className="mt-8 text-center text-text-secondary text-sm">
        Don't have an account?{' '}
        <Link to="/signup" className="text-primary hover:underline font-bold">
          Sign up
        </Link>
      </p>
    </div>
  );
}

export { Route };
