import { Router } from "express";
import {
  Login,
  Register,
  DeleteUser,
  DeleteMod,
  TaskStatus,
  UserStatus,
} from "../controller/adminController";
import { AdminMiddleware } from "../lib/middleware";

const AdminRouter = Router();

AdminRouter.post("/register", Register);
AdminRouter.post("/login", Login);
AdminRouter.delete("/user/delete", AdminMiddleware, DeleteUser);
AdminRouter.delete("/mod/delete", AdminMiddleware, DeleteMod);
AdminRouter.post("/task/status", AdminMiddleware, TaskStatus);
AdminRouter.post("/user/status", AdminMiddleware, UserStatus);

export { AdminRouter };
