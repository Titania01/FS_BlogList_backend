/* eslint-disable no-undef */
const mongoose = require("mongoose");
const supertest = require("supertest");
const listHelper = require("../utils/list_helper");
const app = require("../utils/app");
const Blog = require("../models/blog.js");

const api = supertest(app);

beforeEach(async () => {
  await Blog.deleteMany({});

  let blogObject = new Blog(listHelper.initialBlogs[0]);
  await blogObject.save();

  blogObject = new Blog(listHelper.initialBlogs[1]);
  // await Blog.insertMany(listHelper.initialBlogs);
}, 100000);

describe("get all blogs", () => {
  test("blogs are returned as json", async () => {
    await api
      .get("/api/blogs")
      .expect(200)
      .expect("Content-Type", /application\/json/);
  });

  test("all blogs are returned", async () => {
    const response = await api.get("/api/blogs");
    expect(response.body).toHaveLength(listHelper.initialBlogs.length);
  }, 100000);

  test("of having unique identifier", () => {
    const response = await api.get("/api/blogs");
    expect(response.body[0].id).toBeDefined();
  });
});

afterAll(() => {
  mongoose.connection.close();
});
