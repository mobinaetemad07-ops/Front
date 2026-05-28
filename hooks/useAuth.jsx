'use client';

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { authService } from '../services/auth.service';
import toast from 'react-hot-toast';

export function useAuth() {
  const queryClient = useQueryClient();
  const router = useRouter();

 
  const { data: user, isLoading } = useQuery({
    queryKey: ['me'],
    queryFn: () => authService.getMe(),
    retry: false,
  });


  const loginMutation = useMutation({
    mutationFn: (data) => authService.login(data),
    onSuccess: async () => {
     
      const userData = await authService.getMe();
      queryClient.setQueryData(['me'], userData);
      toast.success('login is successful');
     
      if (userData?.is_teacher === true) {
        router.push('/dashboard/tutor');
      } else {
        router.push('/dashboard/student');
      }
    },
    onError: (error) => {
      const message = error.response?.data?.message ;
      toast.error(message);
    },
  });

  
  const logoutMutation = useMutation({
    mutationFn: () => authService.logout(),
    onSuccess: () => {
      queryClient.setQueryData(['me'], null);
      toast.success('logout');
      router.push('/');
    },
    onError: () => toast.error('error in logout'),
  });

  const role = user?.is_teacher === true ? 'tutor' : user?.is_teacher === false ? 'student' : null;

  return {
    user,
    isLoading,
    isLoggedIn: !!user,
    role,
    isStudent: role === 'student',
    isTutor: role === 'tutor',
    login: loginMutation.mutate,
    isLoggingIn: loginMutation.isPending,
    logout: logoutMutation.mutate,
    isLoggingOut: logoutMutation.isPending,
    error: loginMutation.error,
  };
}