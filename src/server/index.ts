import express from "express";
import cors from "cors";
import morgan from "morgan";
import {
  generalError,
  notFoundError,
} from "./middlewares/errorMiddlewares/errorMiddlewares.js";
import userRouter from "./routers/user/userRouter.js";

const app = express();

app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "https://202304-w7chwe-carlos-aliaga-front.netlify.app/",
    ],
  })
);

app.disable("x-powered-by");

app.use(morgan("dev"));

app.use(express.json());

app.use("/user", userRouter);

app.use(notFoundError);

app.use(generalError);

export default app;
