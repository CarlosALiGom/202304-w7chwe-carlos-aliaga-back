import "../loadEnviroments.js";
import express from "express";
import cors from "cors";
import morgan from "morgan";
import {
  generalError,
  notFoundError,
} from "./middlewares/errorMiddlewares/errorMiddlewares.js";
import userRouter from "./routers/user/userRouter.js";

const allowedOrigins = [
  "http://localhost:5173",
  "https://202304-w7chwe-carlos-aliaga-front.netlify.app/",
];

const options: cors.CorsOptions = {
  origin: allowedOrigins,
};

const app = express();

app.use(express.json());

app.use(cors(options));

app.disable("x-powered-by");

app.use(morgan("dev"));

app.use("/users", userRouter);

app.use(notFoundError);

app.use(generalError);

export default app;
