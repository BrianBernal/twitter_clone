import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useNavigate } from '@tanstack/react-router';
import { signin, signout, signup, setToken, clearToken } from '../api/client';

export function useSignup() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      user_handle,
      email_address,
      first_name,
      last_name,
    }: {
      user_handle: string;
      email_address: string;
      first_name: string;
      last_name: string;
    }) => signup(user_handle, email_address, first_name, last_name),
    onSuccess: (res) => {
      setToken(res.data.session_token);
      queryClient.invalidateQueries({ queryKey: ['auth'] });
      navigate({ to: '/' });
    },
  });
}

export function useSignin() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ email_address }: { email_address: string }) => signin(email_address),
    onSuccess: (res) => {
      setToken(res.data.session_token);
      queryClient.invalidateQueries({ queryKey: ['auth'] });
      navigate({ to: '/' });
    },
  });
}

export function useSignout() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: signout,
    onSuccess: () => {
      clearToken();
      queryClient.clear();
      navigate({ to: '/signin' });
    },
  });
}
