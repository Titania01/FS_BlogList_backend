import { MONGODB_URI } from "../utils/config";
import express, { json } from "express";
const app = express();
import cors from "cors";
import blogsRouter from "../controllers/blogs";
// import {
//   requestLogger,
//   unknownEndpoint,
//   errorHandler,
// } from "./utils/middleware";
import { info, error as _error } from "../utils/logger";
import { connect } from "mongoose";
import morgan from "morgan";

// "connecting to", MONGODB_URI;
connect(MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true,
})
  .then(() => {
    info("connected to MongoDB");
  })
  .catch((error) => {
    _error("error connecting to MongoDB:", error.message);
  });

app.use(cors());

app.use(json());
// app.use(requestLogger);
app.use(morgan("dev"));

app.get("/", (req, res) => {
  res.json({ message: "Begining of Nothingness" });
});
app.use("/api/blogs", blogsRouter);

// app.use(unknownEndpoint);
// app.use(errorHandler);

export default app;
