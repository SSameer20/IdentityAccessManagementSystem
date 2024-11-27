import { Router } from "express";
import { ModMiddleware } from "../lib/middleware";
import {
  Login,
  Register,
  TaskStatus,
  UserStatus,
} from "../controller/moderatorController";
const ModeratorRouter = Router();

ModeratorRouter.post("/login", Login);
ModeratorRouter.post("/register", Register);
ModeratorRouter.post("/task/status", ModMiddleware, TaskStatus);
ModeratorRouter.post("/user/status", ModMiddleware, UserStatus);

export { ModeratorRouter };
