import { Request, Response, NextFunction } from "express";
import log from "./log";
import { STATUS_CODE } from "./helper";
import jwt, { JwtPayload } from "jsonwebtoken";

declare global {
  namespace Express {
    interface Request {
      user?: JwtPayload | string;
    }
  }
}

const UserMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) {
    res
      .status(STATUS_CODE.UNAUTHORIZED)
      .send({ msg: "you are not authorized" });
    return;
  }
  try {
    const jwtSecret = process.env.JWT_SECRET;
    if (!jwtSecret) {
      throw new Error("JWT Secret is needed to veridy token");
    }
    const decoded = jwt.verify(token, jwtSecret);
    if (typeof decoded === "object" && decoded !== null && "role" in decoded) {
      if (decoded.role !== "user") {
        res
          .status(STATUS_CODE.UNAUTHORIZED)
          .send({ msg: "You are not authorized" });
        return;
      }
    }
    req.body.user = decoded;
    next();
  } catch (error) {
    res.status(STATUS_CODE.NOT_IMPLEMENTED).send({ msg: "Error" });
    log.error(`${error}`);
  }
};

const ModMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) {
    res
      .status(STATUS_CODE.UNAUTHORIZED)
      .send({ msg: "you are not authorized" });
    return;
  }
  try {
    const jwtSecret = process.env.JWT_SECRET;
    if (!jwtSecret) {
      throw new Error("JWT Secret is needed to veridy token");
    }
    const decoded = jwt.verify(token, jwtSecret);
    if (typeof decoded === "object" && decoded !== null && "role" in decoded) {
      if (decoded.role !== "moderator") {
        res
          .status(STATUS_CODE.UNAUTHORIZED)
          .send({ msg: "You are not authorized" });
        return;
      }
    }
    req.body.user = decoded;
    next();
  } catch (error) {
    res.status(STATUS_CODE.NOT_IMPLEMENTED).send({ msg: "Error" });
    log.error(`${error}`);
  }
};

const AdminMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) {
    res
      .status(STATUS_CODE.UNAUTHORIZED)
      .send({ msg: "you are not authorized" });
    return;
  }
  try {
    const jwtSecret = process.env.JWT_SECRET;
    if (!jwtSecret) {
      throw new Error("JWT Secret is needed to veridy token");
    }
    const decoded = jwt.verify(token, jwtSecret);
    if (typeof decoded === "object" && decoded !== null && "role" in decoded) {
      if (decoded.role !== "admin") {
        res
          .status(STATUS_CODE.UNAUTHORIZED)
          .send({ msg: "You are not authorized" });
        return;
      }
    }
    req.body.user = decoded;
    next();
  } catch (error) {
    res.status(STATUS_CODE.NOT_IMPLEMENTED).send({ msg: "Error" });
    log.error(`${error}`);
  }
};

export { UserMiddleware, ModMiddleware, AdminMiddleware };
