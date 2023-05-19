import express from "express";
import cors from "cors";
import morgan from "morgan";

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

export default app;