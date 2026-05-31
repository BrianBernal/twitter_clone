import { useState } from 'react'
import { createFileRoute, Navigate, Link } from '@tanstack/react-router'
import { getToken } from '../api/client'
import { useSignup } from '../hooks/useAuth'

export const Route = createFileRoute('/signup')({
  component: SignupPage,
})

function SignupPage() {
  const [user_handle, setUserHandle] = useState('')
  const [email_address, setEmailAddress] = useState('')
  const [first_name, setFirstName] = useState('')
  const [last_name, setLastName] = useState('')
  const signup = useSignup()

  if (getToken()) {
    return <Navigate to="/" />
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    signup.mutate({ user_handle, email_address, first_name, last_name })
  }

  return (
    <div>
      <h2>Sign up</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <input
            placeholder="Handle"
            value={user_handle}
            onChange={(e) => setUserHandle(e.target.value)}
            required
          />
        </div>
        <div>
          <input
            placeholder="First name"
            value={first_name}
            onChange={(e) => setFirstName(e.target.value)}
            required
          />
        </div>
        <div>
          <input
            placeholder="Last name"
            value={last_name}
            onChange={(e) => setLastName(e.target.value)}
            required
          />
        </div>
        <div>
          <input
            type="email"
            placeholder="Email"
            value={email_address}
            onChange={(e) => setEmailAddress(e.target.value)}
            required
          />
        </div>
        {signup.error && <p style={{ color: 'red' }}>{signup.error.message}</p>}
        <button type="submit" disabled={signup.isPending}>
          {signup.isPending ? 'Creating account...' : 'Sign up'}
        </button>
      </form>
      <p>
        Already have an account? <Link to="/signin">Sign in</Link>
      </p>
    </div>
  )
}
