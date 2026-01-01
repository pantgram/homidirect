import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { authApi, type LoginRequest, type RegisterRequest, type User } from "@/api";
import { getApiError } from "@/api/client";

export const authKeys = {
  all: ["auth"] as const,
  user: () => [...authKeys.all, "user"] as const,
};

export function useCurrentUser() {
  return useQuery({
    queryKey: authKeys.user(),
    queryFn: async () => {
      try {
        return await authApi.getMe();
      } catch (error) {
        console.error("Failed to fetch current user:", error);
        throw error;
      }
    },
    enabled: authApi.isAuthenticated(),
    retry: false,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
}

export function useLogin() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: LoginRequest) => authApi.login(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: authKeys.user() });
    },
    onError: (error) => {
      console.error("Login mutation error:", error);
      return getApiError(error);
    },
  });
}

export function useRegister() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: RegisterRequest) => authApi.register(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: authKeys.user() });
    },
    onError: (error) => {
      return getApiError(error);
    },
  });
}

export function useLogout() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async () => {
      authApi.logout();
    },
    onSuccess: () => {
      queryClient.setQueryData(authKeys.user(), null);
      queryClient.clear();
    },
  });
}
