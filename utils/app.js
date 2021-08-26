import { env, MONGODB_URI } from "./config";
import express, { json } from "express";
const app = express();
import cors from "cors";
import blogsRouter from "../controllers/blogs";
import { info, _error } from "./logger";
import mongoose from "mongoose";
import morgan from "morgan";

mongoose
  .connect(MONGODB_URI, {
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

if (env === "dev") app.use(morgan("dev"));

app.get("/", (req, res) => {
  res.json({ message: "Begining of Nothingness" });
});
app.use("/api/blogs", blogsRouter);

export default app;
