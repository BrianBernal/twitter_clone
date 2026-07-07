import { useState } from 'react';
import { createFileRoute, Link } from '@tanstack/react-router';
import { useSignup } from '../hooks/useAuth';

const Route = createFileRoute('/signup')({
  component: SignUpPage,
});

function SignUpPage() {
  const [form, setForm] = useState({
    user_handle: '',
    email_address: '',
    first_name: '',
    last_name: '',
  });
  const signup = useSignup();

  const updateField = (field: string, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (
      !form.user_handle.trim() ||
      !form.email_address.trim() ||
      !form.first_name.trim() ||
      !form.last_name.trim()
    )
      return;
    signup.mutate(form);
  };

  return (
    <div className="w-full max-w-md">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold text-primary mb-2">Join Chirp</h1>
        <p className="text-text-secondary">Create your account</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="handle" className="block text-text-secondary text-sm mb-1">
            Handle
          </label>
          <input
            id="handle"
            type="text"
            value={form.user_handle}
            onChange={(e) => updateField('user_handle', e.target.value)}
            placeholder="yourhandle"
            required
            className="w-full bg-surface-2 text-text-primary border border-border rounded-lg px-4 py-3 focus:outline-none focus:border-primary transition-colors placeholder-text-secondary"
          />
        </div>

        <div>
          <label htmlFor="email" className="block text-text-secondary text-sm mb-1">
            Email
          </label>
          <input
            id="email"
            type="email"
            value={form.email_address}
            onChange={(e) => updateField('email_address', e.target.value)}
            placeholder="you@example.com"
            required
            className="w-full bg-surface-2 text-text-primary border border-border rounded-lg px-4 py-3 focus:outline-none focus:border-primary transition-colors placeholder-text-secondary"
          />
        </div>

        <div className="flex gap-3">
          <div className="flex-1">
            <label htmlFor="firstName" className="block text-text-secondary text-sm mb-1">
              First name
            </label>
            <input
              id="firstName"
              type="text"
              value={form.first_name}
              onChange={(e) => updateField('first_name', e.target.value)}
              placeholder="First"
              required
              className="w-full bg-surface-2 text-text-primary border border-border rounded-lg px-4 py-3 focus:outline-none focus:border-primary transition-colors placeholder-text-secondary"
            />
          </div>
          <div className="flex-1">
            <label htmlFor="lastName" className="block text-text-secondary text-sm mb-1">
              Last name
            </label>
            <input
              id="lastName"
              type="text"
              value={form.last_name}
              onChange={(e) => updateField('last_name', e.target.value)}
              placeholder="Last"
              required
              className="w-full bg-surface-2 text-text-primary border border-border rounded-lg px-4 py-3 focus:outline-none focus:border-primary transition-colors placeholder-text-secondary"
            />
          </div>
        </div>

        {signup.error && <p className="text-secondary text-sm">{signup.error.message}</p>}

        <button
          type="submit"
          disabled={
            !form.user_handle.trim() ||
            !form.email_address.trim() ||
            !form.first_name.trim() ||
            !form.last_name.trim() ||
            signup.isPending
          }
          className="w-full bg-primary text-white font-bold py-3 rounded-full hover:bg-primary-hover disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          {signup.isPending ? 'Creating account...' : 'Sign Up'}
        </button>
      </form>

      <p className="mt-8 text-center text-text-secondary text-sm">
        Already have an account?{' '}
        <Link to="/signin" className="text-primary hover:underline font-bold">
          Sign in
        </Link>
      </p>
    </div>
  );
}

export { Route };
