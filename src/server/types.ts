import { type Request } from "express";

export interface UserCredentials {
  username: string;
  password: string;
}

export interface UserData extends UserCredentials {
  name: string;
  image: string;
}

export type UserCredentialsRequest = Request<
  Record<string, unknown>,
  Record<string, unknown>,
  UserCredentials
>;

export type UserStructure = {
  _id: string;
} & UserCredentials;
