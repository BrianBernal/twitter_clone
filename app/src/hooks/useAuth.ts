import { useMutation } from '@tanstack/react-query';
import { useNavigate } from '@tanstack/react-router';
import { signin, signup, signout, setToken, clearToken } from '../api/client';
import type { User } from '../api/types';
import { useToast } from '../components/ui/Toast';

function useSignin() {
  const navigate = useNavigate();
  return useMutation({
    mutationFn: (email: string) => signin(email),
    onSuccess: (data) => {
      setToken(data.data.session_token);
      localStorage.setItem('twitter_clone_user', JSON.stringify(data.data.user));
      navigate({ to: '/' });
    },
  });
}

function useSignup() {
  const navigate = useNavigate();
  return useMutation({
    mutationFn: (params: {
      user_handle: string;
      email_address: string;
      first_name: string;
      last_name: string;
    }) => signup(params.user_handle, params.email_address, params.first_name, params.last_name),
    onSuccess: (data) => {
      setToken(data.data.session_token);
      localStorage.setItem('twitter_clone_user', JSON.stringify(data.data.user));
      navigate({ to: '/' });
    },
  });
}

function useSignout() {
  const navigate = useNavigate();
  const toast = useToast();
  return useMutation({
    mutationFn: () => signout(),
    onSuccess: () => {
      clearToken();
      localStorage.removeItem('twitter_clone_user');
      navigate({ to: '/signin' });
    },
    onError: (e) => toast.show(e.message),
  });
}

function getStoredUser(): User | null {
  try {
    const stored = localStorage.getItem('twitter_clone_user');
    return stored ? JSON.parse(stored) : null;
  } catch {
    return null;
  }
}

export { useSignin, useSignup, useSignout, getStoredUser };
