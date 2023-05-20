import { type NextFunction, type Response } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { Types } from "mongoose";
import User from "../../../database/models/User.js";
import { loginUser } from "./userController.js";
import {
  type UserCredentialsRequest,
  type UserStructure,
} from "../../types.js";
import CustomError from "../../../CustomError/CustomError.js";

beforeEach(() => {
  jest.clearAllMocks();
});

const req: Pick<UserCredentialsRequest, "body"> = {
  body: {
    username: "carlos",
    password: "carlos",
  },
};

const res: Partial<Response> = {
  status: jest.fn().mockReturnThis(),
  json: jest.fn(),
};

const next = jest.fn();
const token = "mocked-token";
describe("Given a userLogin controller", () => {
  describe("When it receives a request with a valid credentials and response", () => {
    const mockedUser: UserStructure = {
      _id: new Types.ObjectId().toString(),
      username: "carlos",
      password: "carlos",
    };

    User.findOne = jest.fn().mockReturnValue({
      exec: jest.fn().mockResolvedValue(mockedUser),
    });

    bcrypt.compare = jest.fn().mockResolvedValue(true);

    jwt.sign = jest.fn().mockReturnValue(token);

    test("Then it should call the status method of the response with a 200", async () => {
      const expectedStatusCode = 200;

      await loginUser(
        req as UserCredentialsRequest,
        res as Response,
        next as NextFunction
      );

      expect(res.status).toHaveBeenCalledWith(expectedStatusCode);
    });

    test("Then it should call the response method json with a token", async () => {
      await loginUser(
        req as UserCredentialsRequest,
        res as Response,
        next as NextFunction
      );

      expect(res.json).toHaveBeenCalledWith({ token });
    });
  });

  describe("When it receives a non valid user credentials", () => {
    test("Then it should call the next function with a custom error with status code 401 and 'Wrong credentials' message", async () => {
      const error = new CustomError(401, "Wrong credentials");

      User.findOne = jest.fn().mockReturnValue({
        exec: jest.fn().mockResolvedValue(undefined),
      });

      bcrypt.compare = jest.fn().mockResolvedValue(false);

      jwt.sign = jest.fn().mockReturnValue(token);

      await loginUser(
        req as UserCredentialsRequest,
        res as Response,
        next as NextFunction
      );

      expect(next).toHaveBeenCalledWith(error);
    });
  });
});
