/* eslint-disable no-undef */
const mongoose = require("mongoose");
const supertest = require("supertest");
const listHelper = require("../utils/list_helper");
const app = require("../src/app");
const Blog = require("../models/blog.js");

const api = supertest(app);

// beforeEach(async () => {
//   await Blog.deleteMany({});

//   let blogObject = new Blog(listHelper.initialBlogs[0]);
//   await blogObject.save();

//   blogObject = new Blog(listHelper.initialBlogs[1]);
//   await Blog.insertMany(listHelper.initialBlogs);
// });

describe("get all blogs", () => {
  test("blogs are returned as json", async () => {
    await api
      .get("/api/blogs")
      .expect(200)
      .expect("Content-Type", /application\/json/);
  });

  // test("all blogs are returned", async () => {
  //   const response = await api.get("/api/blogs");
  //   expect(response.body).toHaveLength(listHelper.initialBlogs.length);
  // }, 100000);

  // test("of having unique identifier", async () => {
  //   const response = await api.get("/api/blogs");
  //   expect(response.body[0].id).toBeDefined();
  // });

  // test("of blog total number is increased by one", async () => {
  //   const newBlog = {
  //     title: "Rancho Shalmadas Chanchad",
  //     author: "Bidmus Yu",
  //     url: "https://reactnative.com/",
  //     likes: 7,
  //   };
  //   await api
  //     .post("/api/blogs")
  //     .send(newBlog)
  //     .expect(201)
  //     .expect("Content-Type", /application\/json/);

  //   const response = await api.get("/api/blogs");
  //   const blogTitle = response.body.map((blog) => blog.title);

  //   expect(response.body).toHaveLength(listHelper.initialBlogs.length + 1);
  //   expect(blogTitle).toContain(newBlog.title);
  // });

  // test("of if likes property is missing, should default to zero", async () => {
  //   const userData = { username: "Bidmus", password: "sulema" };
  //   await api.post("/api/login").send(userData).expect(200);

  //   const nonLikesBlog = {
  //     title: "No one likes Him",
  //     author: "Bode Deway",
  //     url: "https://hello.com/",
  //   };
  //   if (!nonLikesBlog.likes) nonLikesBlog.likes = 0;
  //   await api.post("api/blogs").send(nonLikesBlog).expect(201);
  // });

  // test("of title and url not available", async () => {
  //   const voidTitleBlog = {
  //     author: "Luku Lukaku",
  //     url: "https://shootingstars.com/",
  //     likes: 5,
  //   };
  //   const voidUrlBlog = {
  //     title: "Hello Little Birds",
  //     author: "Nancy Isime",
  //     likes: "8",
  //   };
  //   await api.post("/api/blogs").send(voidTitleBlog).expect(400);

  //   await api.post("/api/blogs").send(voidUrlBlog).expect(400);

  //   const blogAtEnd = await listHelper.blogsInDB();
  //   expect(blogAtEnd).toHaveLength(listHelper.initialBlogs.length);
  // });
});

afterAll(async () => {
  await mongoose.connection.close();
});
