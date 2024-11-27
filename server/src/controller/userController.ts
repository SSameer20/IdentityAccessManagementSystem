import { Request, Response } from "express";
import Task from "../model/taskModel";
import User from "../model/userModel";

import { STATUS_CODE } from "../lib/helper";
import jwt, { JwtPayload } from "jsonwebtoken";
import bcrypt from "bcrypt";

const createTask = async (req: Request, res: Response): Promise<void> => {
  try {
    const { title, description, user } = req.body;

    if (!title) {
      res.status(STATUS_CODE.BAD_REQUEST).send({ msg: "All details required" });
      return;
    }

    const Newtask = new Task({
      title,
      description,
      createdAt: new Date(),
      createdBy: user.Id,
    });

    await Newtask.save();
    res
      .status(STATUS_CODE.CREATED)
      .send({ msg: "Task created", task: Newtask });
  } catch (error) {
    res.status(STATUS_CODE.BAD_REQUEST).send({ msg: `Error ${error}` });
  }
};

const updateTask = async (req: Request, res: Response): Promise<void> => {
  try {
    const { title, description, taskId } = req.body;
    if (!taskId) {
      res.status(STATUS_CODE.BAD_REQUEST).send({ msg: "Task Id required" });
      return;
    }

    const updatedTask = await Task.findByIdAndUpdate(
      taskId,
      { title, description, modifiedAt: new Date() },
      { new: true }
    );

    if (!updatedTask) {
      res
        .status(STATUS_CODE.NOT_FOUND)
        .send({ msg: "Task not found or could not be updated." });
      return;
    }

    res.status(STATUS_CODE.OK).send({ msg: "task updated", task: updatedTask });
  } catch (error) {
    res.status(STATUS_CODE.BAD_REQUEST).send({ msg: "All details required" });
  }
};

const deleteTask = async (req: Request, res: Response): Promise<void> => {
  try {
    const { taskId } = req.body;
    if (!taskId) {
      res.status(STATUS_CODE.BAD_REQUEST).send({ msg: "Task ID Required" });
      return;
    }

    const findTask = await Task.findByIdAndDelete({ _id: taskId });

    res.status(STATUS_CODE.CREATED).send({ msg: "Task Deleted" });
  } catch (error) {
    res.status(STATUS_CODE.BAD_REQUEST).send({ msg: "Error While Deleting" });
  }
};

const Register = async (req: Request, res: Response): Promise<void> => {
  try {
    const { email, password } = req.body;
    const findUser = await User.findOne({ email });
    if (findUser && findUser.role === "user") {
      res
        .status(STATUS_CODE.NOT_FOUND)
        .send({ msg: "user already exists with same email" });
      return;
    }
    const SALT = 10;
    const hashPassword = await bcrypt.hash(password, SALT);
    const NewUser = new User({
      email,
      password: hashPassword,
      role: "user",
      status: "active",
    });

    await NewUser.save();

    res.status(STATUS_CODE.CREATED).send({ msg: "user created" });
  } catch (error) {
    res
      .status(STATUS_CODE.INTERNAL_SERVER_ERROR)
      .send({ msg: `Server Error ${error}` });
  }
};

const Login = async (req: Request, res: Response): Promise<void> => {
  try {
    const { email, password } = req.body;
    const findUser = await User.findOne({ email, role: "user" });
    if (!findUser) {
      res
        .status(STATUS_CODE.NOT_FOUND)
        .send({ msg: "no user found with email" });
      return;
    }

    const isMatch: boolean = await bcrypt.compare(password, findUser.password);
    if (isMatch) {
      const SECRET_KEY = process.env.JWT_SECRET;
      if (!SECRET_KEY) throw new Error("Require JWT SECRET");

      const token = jwt.sign(
        { Id: findUser._id, role: findUser.role },
        SECRET_KEY,
        { expiresIn: "1h" }
      );
      res.status(STATUS_CODE.OK).send({ msg: "user logged in", token });
    }
  } catch (error) {
    res
      .status(STATUS_CODE.INTERNAL_SERVER_ERROR)
      .send({ msg: `Server Error ${error}` });
  }
};

export { Login, Register, createTask, deleteTask, updateTask };
