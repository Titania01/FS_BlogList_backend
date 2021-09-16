const Blog = require("../models/blog.js");
const User = require("../models/user");

const dummy = () => {
  return 1;
};

const totalLikes = (blogs) => {
  const reduced = (acc, blog) => acc + blog.likes;
  return blogs.reduce(reduced, 0);
};

const favoriteBlog = (blogs) => {
  const favourite = Math.max(...blogs.map((blog) => blog.likes));
  return blogs
    .filter((blog) => blog.likes === favourite)
    .map(({ title, author, likes }) => ({ title, author, likes }))[0];
};

const mostBlog = (array) => {
  const blogObject = {};
  array.forEach((item) => {
    if (blogObject[item.author]) blogObject[item.author] += 1;
    else blogObject[item.author] = 1;
  });
  return Object.entries(blogObject)
    .map((item) => ({ author: item[0], blog: item[1] }))
    .sort((a, b) => b.likes - a.likes)[0];
};

const initialBlogs = [
  {
    _id: "5a422a851b54a676234d17f7",
    title: "React patterns",
    author: "Michael Chan",
    url: "https://reactpatterns.com/",
    likes: 7,
    __v: 0,
  },
  {
    _id: "5a422aa71b54a676234d17f8",
    title: "Go To Statement Considered Harmful",
    author: "Edsger W. Dijkstra",
    url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
    likes: 5,
    __v: 0,
  },
];

const blogsInDb = async () => {
  const blogs = await Blog.find({});
  return blogs.map((blog) => blog.toJSON);
};

const usersInDb = async () => {
  const users = await User.find({});
  return users.map((user) => user.toJSON());
};

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlog,
  initialBlogs,
  blogsInDb,
  usersInDb,
};
