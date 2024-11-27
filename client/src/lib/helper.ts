export type Role = "user" | "admin" | "moderator";
export type Status = "active" | "inactive";

export interface User {
  email: string;
  password: string;
  role?: Role;
  status?: Status;
}
