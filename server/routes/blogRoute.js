import express from "express";
import {
  addBlog,
  addComment,
  deleteBlogById,
  getAllBlog,
  getBlogById,
  getBlogComment,
  togglePublish,
} from "../controllers/blogController.js";
import upload from "../middleware/multer.js";
import auth from "../middleware/auth.js";

const blogRouter = express.Router();

blogRouter.post("/add", upload.single("image"), auth, addBlog);
blogRouter.get("/all", getAllBlog);
blogRouter.get("/:blogId", getBlogById);
blogRouter.delete("/delete", auth, deleteBlogById);
blogRouter.post("/toggle-publish", auth, togglePublish);
blogRouter.post("/add-comment", addComment);
blogRouter.get("/get-blog-comments/:blogId", getBlogComment);

export default blogRouter;
