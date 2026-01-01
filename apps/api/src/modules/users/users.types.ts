export interface UpdateUser {
  firstName: string;
  lastName: string;
  email?: string;
}

export interface UserResponse {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  createdAt: Date;
}

export interface UserWithRole {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  role: "LANDLORD" | "TENANT" | "ADMIN";
  createdAt: Date;
}
