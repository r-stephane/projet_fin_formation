export interface User {
  id: number;
  fullName: string;
  email: string;
  password: string;
  createdAt: string;
}

export interface CurrentUser {
  id: number;
  fullName: string;
  email: string;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterData {
  fullName: string;
  email: string;
  password: string;
  confirmPassword: string;
}