import { Schema, Types, model } from "mongoose";
import { TaskInterface } from "../lib/helper";

const TaskSchema = new Schema<TaskInterface>({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  createdBy: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: "User",
  },
  createdAt: {
    type: Date,
  },
  modifiedAt: {
    type: Date,
    default: new Date(),
  },
  status: {
    type: String,
    default: "allow",
  },
});

const Task = model("task", TaskSchema);

export default Task;
