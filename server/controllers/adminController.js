import jwt from "jsonwebtoken";
import Blog from "../models/blogModel.js";
import Comment from "../models/commentModel.js";

export const adminLogin = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (
      email != process.env.ADMIN_EMAIL ||
      password != process.env.ADMIN_PASSWORD
    ) {
      return res.json({
        success: false,
        message: "Email atau password salah",
      });
    }

    const token = jwt.sign({ email }, process.env.JWT_SECRET);
    res.json({
      success: true,
      token,
    });
  } catch (error) {
    res.json({
      success: false,
      message: error.message,
    });
  }
};

export const getAllBlogsAdmin = async (req, res) => {
  try {
    const blogs = await Blog.find({}).sort({ createdAt: -1 });
    res.json({
      success: true,
      blogs,
    });
  } catch (error) {
    res.json({
      success: false,
      message: error.message,
    });
  }
};

export const getAllCommentsAdmin = async (req, res) => {
  try {
    const comments = await Comment.find({})
      .populate("blog")
      .sort({ createdAt: -1 });
    res.json({
      success: true,
      comments,
    });
  } catch (error) {
    res.json({
      success: false,
      message: error.message,
    });
  }
};

export const getDashboardAdmin = async (req, res) => {
  try {
    const recentBlogs = await Blog.find({}).sort({ createdAt: -1 }).limit(5);
    const blogs = await Blog.countDocuments();
    const comments = await Comment.countDocuments();
    const drafts = await Blog.countDocuments({ isPublished: false });

    const dashboardData = {
      blogs,
      comments,
      drafts,
      recentBlogs,
    };

    res.json({ success: true, dashboardData });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

export const deleteCommentByIdAdmin = async (req, res) => {
  try {
    const { id } = req.body;
    await Comment.findByIdAndDelete(id);
    res.json({ success: true, message: "Komentar berhasil di hapus" });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

export const approveCommentByIdAdmin = async (req, res) => {
  try {
    const { id } = req.body;

    const result = await Comment.findByIdAndUpdate(
      id,
      { isApproved: true },
      { new: true } 
    );

    if (!result) {
      return res.json({
        success: false,
        message: "Komentar dengan ID tersebut tidak ditemukan",
      });
    }

    res.json({
      success: true,
      message: "Komentar di setujui",
      comment: result,
    });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};
