import { Router } from "express";
import { UserMiddleware } from "../lib/middleware";
import {
  Login,
  Register,
  createTask,
  deleteTask,
  updateTask,
} from "../controller/userController";

const UserRouter = Router();
UserRouter.post("/login", Login);
UserRouter.post("/register", Register);
UserRouter.post("/create", UserMiddleware, createTask);
UserRouter.delete("/delete", UserMiddleware, deleteTask);
UserRouter.put("/update", UserMiddleware, updateTask);

export { UserRouter };
