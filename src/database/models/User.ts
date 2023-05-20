import { Schema, Types, model } from "mongoose";

const userSchema = new Schema({
  username: {
    type: String,
    min: 2,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  friends: {
    type: [Types.ObjectId],
  },
  enemies: {
    type: [Types.ObjectId],
  },
});

const User = model("User", userSchema, "users");

export default User;
