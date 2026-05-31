import { useState } from 'react'
import { createFileRoute, Navigate, Link } from '@tanstack/react-router'
import { getToken } from '../api/client'
import { useSignin } from '../hooks/useAuth'

export const Route = createFileRoute('/signin')({
  component: SigninPage,
})

function SigninPage() {
  const [email_address, setEmailAddress] = useState('')
  const signin = useSignin()

  if (getToken()) {
    return <Navigate to="/" />
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    signin.mutate({ email_address })
  }

  return (
    <div>
      <h2>Sign in</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <input
            type="email"
            placeholder="Email"
            value={email_address}
            onChange={(e) => setEmailAddress(e.target.value)}
            required
          />
        </div>
        {signin.error && <p style={{ color: 'red' }}>{signin.error.message}</p>}
        <button type="submit" disabled={signin.isPending}>
          {signin.isPending ? 'Signing in...' : 'Sign in'}
        </button>
      </form>
      <p>
        Don't have an account? <Link to="/signup">Sign up</Link>
      </p>
    </div>
  )
}
