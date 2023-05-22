import { type NextFunction, type Request, type Response } from "express";
import jwt from "jsonwebtoken";
import CustomError from "../../../CustomError/CustomError";

const auth = (req: Request, res: Response, next: NextFunction) => {
  try {
    const autorizationHeader = req.header("Authorization");

    if (!autorizationHeader?.includes("Bearer")) {
      const error = new CustomError(401, "Missing Token");

      throw error;
    }

    const token = autorizationHeader.replace("Bearer", "");

    jwt.verify(token, process.env.JWT_SECRET!);

    next();
  } catch (error: unknown) {
    next(error);
  }
};

export default auth;
