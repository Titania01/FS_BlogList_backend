import { config } from "dotenv";
// require("dotenv").config();

config();
export const PORT = process.env.PORT;
export const MONGODB_URI =
  process.env.NODE_ENV === "test"
    ? process.env.TEST_MONGODB_URI
    : process.env.MONGODB_URI;

export const env = process.env.NODE_ENV || "dev";
