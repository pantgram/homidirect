import type { User, UserRole } from "./user";

export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  role: UserRole;
}

export interface RefreshTokenRequest {
  refreshToken: string;
}

export interface AuthTokens {
  accessToken: string;
  refreshToken: string;
}

export interface LoginResponse {
  token: AuthTokens;
}

export interface RegisterResponse {
  user: User;
  token: AuthTokens;
}

export interface RefreshResponse {
  tokens: AuthTokens;
}
