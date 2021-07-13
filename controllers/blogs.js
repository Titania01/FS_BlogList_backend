const blogsRouter = require("express").Router();
// const Blog = require("../models/blog");
import Blog from "../models/blog";
// const blog = "sdsdsf";

blogsRouter.get("/", (request, response) => {
  Blog.find({}).then((blogs) => {
    response.json(blogs);
  });
  // response.json({ message: "i'm here" });
});

blogsRouter.post("/", (request, response) => {
  const blog = new Blog(request.body);

  blog.save().then((result) => {
    response.status(201).json(result);
  });
});

export default blogsRouter;
