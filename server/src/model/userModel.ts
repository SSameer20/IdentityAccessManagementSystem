import { Schema, Types, model } from "mongoose";
import { UserInterface, Status } from "../lib/helper";

const UserSchema = new Schema<UserInterface>({
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    required: true,
    default: "active",
  },
  role: {
    type: String,
    required: true,
    default: "user",
  },
});

const User = model("User", UserSchema);

export default User;
