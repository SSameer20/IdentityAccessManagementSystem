import { Request, Response } from "express";
import User from "../model/userModel";
import { STATUS_CODE } from "../lib/helper";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import Task from "../model/taskModel";

const TaskStatus = async (req: Request, res: Response): Promise<void> => {
  const { taskId, status } = req.body;

  if (!taskId) {
    res.status(STATUS_CODE.NOT_FOUND).send({
      msg: "Task ID is required",
    });
    return;
  }
  if (status !== "allow" && status !== "restrict") {
    res.status(STATUS_CODE.BAD_REQUEST).send({
      msg: "Invalid Status",
    });
    return;
  }

  try {
    const updatedTask = await Task.findByIdAndUpdate(
      taskId,
      { status },
      { new: true }
    );

    if (!updatedTask) {
      res.status(STATUS_CODE.NOT_FOUND).send({
        msg: "Task not found or could not be updated.",
      });
      return;
    }

    res.status(STATUS_CODE.OK).send({
      msg: "Task status updated successfully",
      updatedTask,
    });
  } catch (error) {
    console.error("Error updating task status:", error);
    res.status(STATUS_CODE.INTERNAL_SERVER_ERROR).send({
      msg: "Internal server error",
    });
  }
};

const UserStatus = async (req: Request, res: Response): Promise<void> => {
  const { userId, status } = req.body;

  if (!userId) {
    res.status(STATUS_CODE.NOT_FOUND).send({
      msg: "User ID is required",
    });
    return;
  }
  if (status !== "active" && status !== "inactive") {
    res.status(STATUS_CODE.BAD_REQUEST).send({
      msg: "Invalid Status",
    });
    return;
  }

  try {
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { status },
      { new: true }
    );

    if (!updatedUser) {
      res.status(STATUS_CODE.NOT_FOUND).send({
        msg: "User not found or could not be updated.",
      });
      return;
    }

    res.status(STATUS_CODE.OK).send({
      msg: "User status updated successfully",
    });
  } catch (error) {
    console.error("Error updating task status:", error);
    res.status(STATUS_CODE.INTERNAL_SERVER_ERROR).send({
      msg: "Internal server error",
    });
  }
};

const DeleteUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const { userId } = req.body;

    const DeleteUser = await User.findByIdAndDelete(userId);
    if (!DeleteUser) {
      throw new Error("Unable to delete user");
    }
    res.status(STATUS_CODE.OK).send({ msg: "User deleted" });
  } catch (error) {
    res
      .status(STATUS_CODE.INTERNAL_SERVER_ERROR)
      .send({ msg: `Server Error ${error}` });
  }
};
const DeleteMod = async (req: Request, res: Response): Promise<void> => {
  try {
    const { userId } = req.body;
    const DeleteUser = await User.findByIdAndDelete(userId);
    if (!DeleteUser) {
      throw new Error("Unable to delete user");
    }
    res.status(STATUS_CODE.OK).send({ msg: "User deleted" });
  } catch (error) {
    res
      .status(STATUS_CODE.INTERNAL_SERVER_ERROR)
      .send({ msg: `Server Error ${error}` });
  }
};

const Register = async (req: Request, res: Response): Promise<void> => {
  try {
    const { email, password } = req.body;
    const findUser = await User.findOne({ email });
    if (findUser && findUser.role === "admin") {
      res
        .status(STATUS_CODE.NOT_FOUND)
        .send({ msg: "admin already exists with same email" });
      return;
    }
    const SALT = 10;
    const hashPassword = await bcrypt.hash(password, SALT);
    const Admin = new User({
      email,
      password: hashPassword,
      role: "admin",
      status: "active",
    });

    await Admin.save();

    res.status(STATUS_CODE.CREATED).send({ msg: "Admin created" });
  } catch (error) {
    res
      .status(STATUS_CODE.INTERNAL_SERVER_ERROR)
      .send({ msg: `Server Error ${error}` });
  }
};

const Login = async (req: Request, res: Response): Promise<void> => {
  try {
    const { email, password } = req.body;
    const Admin = await User.findOne({ email, role: "admin" });
    if (!Admin) {
      res
        .status(STATUS_CODE.NOT_FOUND)
        .send({ msg: "no admin found with email" });
      return;
    }

    const isMatch: boolean = await bcrypt.compare(password, Admin.password);
    if (isMatch) {
      const SECRET_KEY = process.env.JWT_SECRET;
      if (!SECRET_KEY) throw new Error("Require JWT SECRET");

      const token = jwt.sign(
        { userId: Admin._id, role: Admin.role },
        SECRET_KEY,
        { expiresIn: "1h" }
      );
      res.status(STATUS_CODE.OK).send({ msg: "admin logged in", token });
    }
  } catch (error) {
    res
      .status(STATUS_CODE.INTERNAL_SERVER_ERROR)
      .send({ msg: `Server Error ${error}` });
  }
};

export { Login, Register, DeleteUser, DeleteMod, TaskStatus, UserStatus };
