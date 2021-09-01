const mongoose = require("mongoose");
const { env, MONGODB_URI } = require("../utils/config");
const express = require("express");
const app = express();
const cors = require("cors");
const blogsRouter = require("../controllers/blogs");
const { info, _error } = require("../utils/logger");
const morgan = require("morgan");

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

app.use(express.json());

if (env === "dev") app.use(morgan("dev"));

app.get("/", (req, res) => {
  res.json({ message: "Begining of Nothingness" });
});
app.use("/api/blogs", blogsRouter);

module.exports = app;
