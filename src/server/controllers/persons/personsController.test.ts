import { type NextFunction, type Request, type Response } from "express";
import User from "../../../database/models/User";
import personMock from "../../../mocks/personsMocks";
import { getPersons } from "./personsController";

beforeEach(() => {
  jest.clearAllMocks();
});

describe("Given a getPersons controller", () => {
  const request = {};
  const response: Partial<Response> = {
    status: jest.fn().mockReturnThis(),
    json: jest.fn(),
  };
  const next = jest.fn();

  describe("When it receives a response", () => {
    User.find = jest.fn().mockReturnValue({
      exec: jest.fn().mockResolvedValue(personMock),
    });

    test("Then it should call the response method status with 200", async () => {
      const expectedStatus = 200;

      await getPersons(
        request as Request,
        response as Response,
        next as NextFunction
      );

      expect(response.status).toHaveBeenCalledWith(expectedStatus);
    });

    test("Then it should call the response method with a list of personse", async () => {
      const expectedBodyResponse = personMock;

      await getPersons(
        request as Request,
        response as Response,
        next as NextFunction
      );

      expect(response.json).toHaveBeenCalledWith(expectedBodyResponse);
    });
  });

  describe("When it receives a next function and the exec method rejects with an 'Fatal Error' error", () => {
    test("Then it should call next function with error 'Fatal Error'", async () => {
      const error = new Error("Fatal Error");

      User.find = jest.fn().mockReturnValue({
        exec: jest.fn().mockRejectedValue(error),
      });

      await getPersons(
        request as Request,
        response as Response,
        next as NextFunction
      );

      expect(next).toHaveBeenCalledWith(error);
    });
  });
});
