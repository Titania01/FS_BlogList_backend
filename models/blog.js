import { Schema, model } from "mongoose";

const blogSchema = new Schema({
  title: String,
  author: String,
  url: String,
  likes: Number,
});

const blogModel = model("Blog", blogSchema);

export default blogModel;
