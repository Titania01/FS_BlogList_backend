const blogsRouter = require("express").Router();
import Blog from "../models/blog";

blogsRouter.get("/", (request, response) => {
  Blog.find({})
    .then((blogs) => {
      response.json(blogs);
    })
    .catch((err) => response.send(err));
});

blogsRouter.post("/", (request, response) => {
  const blog = new Blog(request.body);

  blog.save().then((result) => {
    response.status(201).json(result);
  });
});

export default blogsRouter;
