import express from "express";
import "dotenv/config";
import cors from "cors";
import connectDB from "../configs/db.js";
import adminRouter from "../routes/adminRoute.js";
import blogRouter from "../routes/blogRoute.js";

const web = express();

await connectDB();

web.use(cors());
web.use(express.json());

web.get("/", (req, res) => res.send("API is working"));
web.use("/api/admin", adminRouter);
web.use("/api/blog", blogRouter);

export default web;
