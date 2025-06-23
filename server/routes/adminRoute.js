import express from "express";
import {
  adminLogin,
  approveCommentByIdAdmin,
  deleteCommentByIdAdmin,
  getAllBlogsAdmin,
  getAllCommentsAdmin,
  getDashboardAdmin,
} from "../controllers/adminController.js";
import auth from "../middleware/auth.js";

const adminRouter = express.Router();

adminRouter.post("/login", adminLogin);
adminRouter.get("/comments", auth, getAllCommentsAdmin);
adminRouter.get("/blogs", auth, getAllBlogsAdmin);
adminRouter.delete("/delete-comment", auth, deleteCommentByIdAdmin);
adminRouter.post("/approve-comment", auth, approveCommentByIdAdmin);
adminRouter.get("/dashboard", auth, getDashboardAdmin);

export default adminRouter;
