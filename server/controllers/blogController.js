import fs from "fs";
import imageKit from "../configs/imageKit.js";
import Blog from "../models/blogModel.js";
import Comment from "../models/commentModel.js";
import main from "../configs/gemini.js";
import { detect } from "langdetect";
import { measureMemory } from "vm";

export const addBlog = async (req, res) => {
  try {
    const { title, subTitle, description, category, isPublished } = JSON.parse(
      req.body.blog
    );

    const imageFile = req.file;

    if (!title || !description || !category || !imageFile) {
      return res.json({
        success: false,
        message: "Semua input harus di isi",
      });
    }

    const fileBuffer = fs.readFileSync(imageFile.path);

    const response = await imageKit.upload({
      file: fileBuffer,
      fileName: imageFile.originalname,
      folder: "/blogs",
    });

    const optimizedImageUrl = imageKit.url({
      path: response.filePath,
      transformation: [
        { quality: "auto" },
        { format: "webp" },
        { width: "1280" },
      ],
    });

    const image = optimizedImageUrl;

    await Blog.create({
      title,
      subTitle,
      description,
      category,
      image,
      isPublished,
    });

    res.json({
      success: true,
      message: "Blog berhasil di tambahkan",
    });
  } catch (error) {
    res.json({
      success: false,
      message: error.message,
    });
  }
};

export const getAllBlog = async (req, res) => {
  try {
    const blogs = await Blog.find({
      isPublished: true,
    });
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

export const getBlogById = async (req, res) => {
  try {
    const { blogId } = req.params;
    const blog = await Blog.findById(blogId);

    if (!blog) {
      return res.json({
        success: false,
        message: "Blog tidak ditemukan",
      });
    }
    res.json({
      success: true,
      blog,
    });
  } catch (error) {
    res.json({
      success: false,
      message: error.message,
    });
  }
};

export const deleteBlogById = async (req, res) => {
  try {
    const { id } = req.body;
    await Blog.findByIdAndDelete(id);

    await Comment.deleteMany({ blog: id });

    res.json({
      success: true,
      message: "Blog berhasil di hapus",
    });
  } catch (error) {
    res.json({
      success: false,
      message: error.message,
    });
  }
};

export const togglePublish = async (req, res) => {
  try {
    const { id } = req.body;
    const blog = await Blog.findById(id);
    blog.isPublished = !blog.isPublished;
    await blog.save();
    res.json({
      success: true,
      message: "Blog status berhasil di perbarui",
    });
  } catch (error) {
    res.json({
      success: false,
      message: error.message,
    });
  }
};

export const addComment = async (req, res) => {
  try {
    const { blog, name, content } = req.body;
    await Comment.create({
      blog,
      name,
      content,
    });
    res.json({
      success: true,
      message: "Komentar berhasil di tambahkan untuk di konfirmasi",
    });
  } catch (error) {
    res.json({
      success: false,
      message: error.message,
    });
  }
};

export const getBlogComment = async (req, res) => {
  try {
    const { blogId } = req.params;

    if (!blogId.match(/^[0-9a-fA-F]{24}$/)) {
      return res.json({
        success: false,
        message: "Format Blog ID tidak valid",
      });
    }

    const blogExists = await Blog.findById(blogId);
    if (!blogExists) {
      return res.json({
        success: false,
        message: "Blog dengan ID tersebut tidak ditemukan",
      });
    }

    const comments = await Comment.find({
      blog: blogId,
      isApproved: true,
    }).sort({ createdAt: -1 });
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

export const generateContent = async (req, res) => {
  try {
    const { prompt } = req.body;
    const detectedLang = detect(prompt);

    const promptInEnglish = `
     Write an engaging and informative blog article about the topic: "${prompt}".
      - Make it at least 500 words long.
      - Use simple and clear language for a general audience.
      - Include an attention-grabbing introduction.
      - Structure the content with subheadings.
      - End with a conclusion or call to action.
      - Output in plain text format.
    `;

    const promptInIndonesian = `
     Tulis artikel blog yang menarik dan informatif tentang topik: "${prompt}".
      - Panjang artikel minimal 500 kata.
      - Gunakan bahasa yang mudah dipahami oleh pembaca umum.
      - Sertakan pembuka yang menarik perhatian.
      - Bagi artikel dengan subjudul yang jelas.
      - Akhiri dengan kesimpulan atau ajakan bertindak.
      - Tampilkan hasil dalam format teks biasa.
    `;

    const finalPrompt =
      detectedLang === "id" ? promptInIndonesian : promptInEnglish;

    const contentGenerate = await main(finalPrompt);

    res.json({
      success: true,
      contentGenerate,
    });
  } catch (error) {
    res.json({
      success: false,
      message: error.message,
    });
  }
};
