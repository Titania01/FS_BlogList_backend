import { config } from "dotenv";
// require("dotenv").config();

config();
export const PORT = process.env.PORT;
export const MONGODB_URI = process.env.MONGODB_URI;
