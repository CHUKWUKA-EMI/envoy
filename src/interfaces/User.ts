export interface IUserProfile {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  imageUrl: string | null;
  imagekit_id: string | null;
  role: string;
  createdAt: string;
  authtoken: string;
}

export interface IUserRequest {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  imageUrl?: string;
  imagekit_id?: string;
}

export interface IUser {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  imageUrl: string | null;
  imagekit_id: string | null;
  role: string;
  createdAt?: string;
}
