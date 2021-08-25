import { MONGODB_URI } from "./config";
import express, { json } from "express";
const app = express();
import cors from "cors";
import blogsRouter from "../controllers/blogs";
import { info, error as _error } from "./logger";
import { connect } from "mongoose";
import morgan from "morgan";

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

app.use(morgan("dev"));

app.get("/", (req, res) => {
  res.json({ message: "Begining of Nothingness" });
});
app.use("/api/blogs", blogsRouter);

export default app;
