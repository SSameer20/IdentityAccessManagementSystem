import { Document, Types } from "mongoose";

export interface logInterface {
  info: (message: string) => void;
  error: (message: string) => void;
}

export type Role = "user" | "admin" | "moderator";
export type Status = "active" | "inactive";

export enum STATUS_CODE {
  // Success (200–299)
  OK = 200,
  CREATED = 201,
  ACCEPTED = 202,
  NO_CONTENT = 204,

  // Client errors (400–499)
  BAD_REQUEST = 400,
  UNAUTHORIZED = 401,
  FORBIDDEN = 403,
  NOT_FOUND = 404,

  // Server errors (500–599)
  INTERNAL_SERVER_ERROR = 500,
  NOT_IMPLEMENTED = 501,
}

export interface UserInterface extends Document {
  email: string;
  password: string;
  role: Role;
  status: Status;
}

export type PostStatus = "allow" | "restrict";

export interface TaskInterface extends Document {
  title: string;
  description: string;
  createdBy: Types.ObjectId;
  createdAt: Date;
  modifiedAt: Date;
  status: PostStatus;
}
