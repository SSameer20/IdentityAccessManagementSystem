export type Role = "user" | "admin" | "moderator";
export type Status = "active" | "inactive";

export interface User {
  email: string;
  password: string;
  role?: Role;
  status?: Status;
}

export interface UsePostResult<T> {
  data: T | null;
  error: string | null;
  isLoading: boolean;
  postData: (url: string, payload: object) => Promise<void>;
}
