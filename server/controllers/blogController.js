import fs from "fs";
import imageKit from "../configs/imageKit.js";
import Blog from "../models/blogModel.js";

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
