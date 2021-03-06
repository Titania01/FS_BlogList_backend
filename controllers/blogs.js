const blogsRouter = require("express").Router();
const Blog = require("../models/blog");
const User = require("../models/user");
const jwt = require("jsonwebtoken");
const middleware = require("../utils/middleware");
require("dotenv").config();

blogsRouter.get("/", async (request, response) => {
  const blogs = await Blog.find({}).populate("user");
  response.json(blogs);
});

blogsRouter.post("/", middleware.userExtractor, async (request, response) => {
  const body = request.body;

  if (!body.url || !body.title) return response.status(400).end();
  if (!body.likes) body.likes = 0;

  const decodedToken = jwt.verify(request.token, process.env.SECRET);
  if (!decodedToken.id) {
    return response.status(401).send({ error: "token missing or invalid" });
  }

  const user = await User.findOne({
    username: request.user,
    _id: decodedToken.id,
  });
  const newBlog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes,
    user: user._id,
  });

  const savedBlog = await newBlog.save();
  user.blogs = user.blogs.concat(savedBlog._id);
  await user.save();
  return response.status(201).json(savedBlog);
});

blogsRouter.delete("/:id", middleware.userExtractor, async (req, res) => {
  const deleteId = req.params.id;
  const decodedToken = jwt.verify(req.token, process.env.SECRET);
  if (!decodedToken.id) {
    return res.status(401).send({ error: "token missing or invalid" });
  }
  const blog = await Blog.findById(deleteId);
  if (
    blog.user._id.toString() === decodedToken.id &&
    blog.user.username === req.user
  ) {
    await Blog.findByIdAndDelete(deleteId);
    res.status(204).end();
  }
});

blogsRouter.put("/:id", async (req, res) => {
  const updateId = req.params.id;
  const update = await Blog.findByIdAndUpdate(updateId, req.body, {
    new: true,
  });
  res.send(update);
});

module.exports = blogsRouter;
