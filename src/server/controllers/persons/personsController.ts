import { type NextFunction, type Request, type Response } from "express";
import User from "../../../database/models/User";

export const getPersons = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const persons = await User.find().exec();

    res.status(200).json(persons);
  } catch (error: unknown) {
    next(error);
  }
};
