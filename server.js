import express from "express";

const app = express();

const PORT = process.env.PORT || 8001;

// DB connection

import { connectDB } from "./src/config/dbConfig.js";
connectDB();

// middlewares

import cors from "cors";
import morgan from "morgan";

app.use(cors());
app.use(express.json());
app.use(morgan("tiny"));

// apis

import routers from "./src/routers/routers.js";
routers.forEach(({ path, middlewares }) => app.use(path, ...middlewares));

// Error handlers

app.get("/", (req, res, next) => {
  res.json({
    status: "success",
    message: "server is live",
  });
});

app.use("*", (req, res, next) => {
  const err = new Error("404 Not found ");

  err.statusCode = 404;
  next(err);
});

app.use((error, req, res, next) => {
  console.log(error, "-------");

  res.status(error.status || 500);

  res.json({
    status: "error",
    message: error.message,
  });
});

app.listen(PORT, (error) => {
  error
    ? console.log(error)
    : console.log(`Server is running at http://localhost:${PORT}`);
});
