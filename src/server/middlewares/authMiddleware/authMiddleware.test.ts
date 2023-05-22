import { type NextFunction, type Request, type Response } from "express";
import jwt from "jsonwebtoken";
import auth from "./authMiddleware";
import CustomError from "../../../CustomError/CustomError";

beforeEach(() => {
  jest.clearAllMocks();
});

describe("Given an authMiddleware", () => {
  const token = "tokenMock";
  const res = {};
  const next = jest.fn();

  describe("When it receives an authorization header with a valid token and a next function", () => {
    test("Then it should call the next function", () => {
      const req: Partial<Request> = {
        header: jest.fn().mockReturnValue(`Bearer ${token}`),
      };
      jwt.verify = jest.fn();

      auth(req as Request, res as Response, next as NextFunction);

      expect(next).toHaveBeenCalled();
    });
  });

  describe("When it receives an authorization header with an invalid token an a next function", () => {
    test("Then it should call the next function with a custom error", () => {
      const error = new CustomError(401, "Missing Token");

      const req: Partial<Request> = {
        header: jest.fn().mockReturnValue(`Bearer ${token}`),
      };
      jwt.verify = jest.fn().mockImplementation(() => {
        throw error;
      });

      auth(req as Request, res as Response, next as NextFunction);

      expect(next).toHaveBeenCalledWith(error);
    });
  });
});
