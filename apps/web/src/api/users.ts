import { apiClient } from "./client";
import type { User, UpdateUserRequest } from "./types";

export type { UpdateUserRequest };

export const usersApi = {
  async getById(id: number): Promise<User> {
    const response = await apiClient.get<User>(`/users/${id}`);
    return response.data;
  },

  async update(id: number, data: UpdateUserRequest): Promise<User> {
    const response = await apiClient.patch<User>(`/users/${id}`, data);
    return response.data;
  },

  async delete(id: number): Promise<void> {
    await apiClient.delete(`/users/${id}`);
  },
};
