import React, { useEffect, useRef, useState } from "react";
import { assets, blogCategories } from "../../assets/assets";
import Quill from "quill";
import { useAppContext } from "../../context/AppContext";
import toast from "react-hot-toast";
import { parse } from "marked";

const AddBlog = () => {
  const { axios } = useAppContext();
  const [isAdding, setIsAdding] = useState(false);
  const [loading, setLoading] = useState(false);

  const editorRef = useRef(null);
  const quillRef = useRef(null);
  const [image, setImage] = useState(false);
  const [title, setTitle] = useState("");
  const [subTitle, setSubTitle] = useState("");
  const [category, setCategory] = useState("");
  const [isPublished, setIsPublished] = useState(false);

  const generateContent = async () => {
    if (!title) {
      return toast.error("Tolong masukkan judul terlebih dahulu");
    }
    try {
      setLoading(true);
      quillRef.current.root.innerHTML = "";
      const { data } = await axios.post("/api/blog/generate", {
        prompt: title,
      });
      if (data.success) {
        quillRef.current.root.innerHTML = parse(data.contentGenerate);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      if (error.response && error.response.status === 503) {
        toast.error("Model sedang sibuk. Silakan coba beberapa saat lagi.");
      } else {
        toast.error(error.message);
      }
    } finally {
      setLoading(false);
    }
  };

  const onSubmitHandle = async (e) => {
    try {
      e.preventDefault();
      setIsAdding(true);

      const blog = {
        title,
        subTitle,
        description: quillRef.current.root.innerHTML,
        category,
        isPublished,
      };

      const formData = new FormData();
      formData.append("blog", JSON.stringify(blog));
      formData.append("image", image);

      const { data } = await axios.post("/api/blog/add", formData);

      if (data.success) {
        toast.success(data.message);
        setImage(false);
        setTitle("");
        setSubTitle("");
        quillRef.current.root.innerHTML = "";
        setCategory("All");
        setIsPublished(false);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    } finally {
      setIsAdding(false);
    }
  };

  useEffect(() => {
    if (!quillRef.current && editorRef.current) {
      quillRef.current = new Quill(editorRef.current, { theme: "snow" });
    }
  }, []);

  return (
    <div className="w-full h-full overflow-y-auto p-4 md:p-10 bg-blue-50/50 pb-4">
      <h1>Tambah Blog</h1>

      <form className="w-full mt-4 mb-3 bg-white rounded-lg shadow overflow-hidden max-w-full">
        <div className="p-4 md:p-8">
          <div className="mb-6">
            <p className="mb-2 text-gray-700 font-medium">Unggah Thumbnail</p>
            <label htmlFor="image">
              <img
                src={image ? URL.createObjectURL(image) : assets.upload_area}
                alt=""
                className="h-16 rounded cursor-pointer border border-gray-200 hover:border-gray-300 transition-colors"
              />
              <input
                onChange={(e) => {
                  const file = e.target.files[0];
                  if (!file) return;

                  const allowedTypes = [
                    "image/jpeg",
                    "image/png",
                    "image/webp",
                    "image/jpg",
                  ];

                  if (!allowedTypes.includes(file.type)) {
                    toast.error(
                      "Format gambar tidak valid. Hanya JPG, JPEG, PNG, atau WebP yang diperbolehkan."
                    );
                    e.target.value = null;
                    setImage(false);
                    return;
                  }

                  if (file.size > 1024 * 1024) {
                    toast.error("Ukuran gambar terlalu besar. Maksimal 1 MB.");
                    e.target.value = null;
                    setImage(false);
                    return;
                  }

                  setImage(file);
                }}
                type="file"
                id="image"
                hidden
                required
              />
            </label>
          </div>

          <div className="mb-6">
            <p className="mb-2 text-gray-700 font-medium">Judul Blog</p>
            <input
              type="text"
              placeholder="Tulis di sini"
              required
              className="w-full max-w-lg p-3 border border-gray-300 outline-none rounded-lg focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors"
              onChange={(e) => setTitle(e.target.value)}
              value={title}
            />
          </div>

          <div className="mb-6">
            <p className="mb-2 text-gray-700 font-medium">Sub Judul</p>
            <input
              type="text"
              placeholder="Tulis di sini"
              required
              className="w-full max-w-lg p-3 border border-gray-300 outline-none rounded-lg focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors"
              onChange={(e) => setSubTitle(e.target.value)}
              value={subTitle}
            />
          </div>

          <div className="mb-6">
            <p className="mb-2 text-gray-700 font-medium">Deskripsi Blog</p>
            <div className="max-w-lg h-74 pb-16 sm:pb-10 pt-2 relative border border-gray-300 rounded-lg overflow-hidden">
              <div ref={editorRef}></div>
              {loading && (
                <div className="absolute right-0 top-0 bottom-0 left-0 flex items-center justify-center bg-black/10 mt-2">
                  <div className="w-8 h-8 rounded-full border-2 border-t-white animate-spin"></div>
                </div>
              )}
              <button
                disabled={loading}
                type="button"
                onClick={generateContent}
                className="absolute bottom-2 right-2 text-xs text-white bg-black/70 px-4 py-1.5 rounded hover:bg-black/80 transition-colors cursor-pointer"
              >
                Buat dengan AI
              </button>
            </div>
          </div>

          <div className="mb-6">
            <p className="mb-2 text-gray-700 font-medium">Kategori Blog</p>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              name="category"
              className="px-3 py-3 border text-gray-500 border-gray-300 outline-none rounded-lg focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors bg-white"
            >
              <option value="">Pilih kategori</option>
              {blogCategories.map((item, index) => {
                return (
                  <option key={index} value={item}>
                    {item}
                  </option>
                );
              })}
            </select>
          </div>

          <div className="mb-8">
            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={isPublished}
                className="scale-125 cursor-pointer accent-blue-500"
                onChange={(e) => setIsPublished(e.target.checked)}
                id="publish-checkbox"
              />
              <label
                htmlFor="publish-checkbox"
                className="text-gray-700 font-medium cursor-pointer"
              >
                Publikasikan sekarang
              </label>
            </div>
          </div>

          <button
            disabled={isAdding}
            type="submit"
            onClick={onSubmitHandle}
            className={`w-40 h-12 bg-primary text-white rounded-lg text-sm font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-primary/30 focus:ring-offset-2 ${
              isAdding
                ? "opacity-50 cursor-not-allowed"
                : "cursor-pointer hover:bg-primary/90"
            }`}
          >
            {isAdding ? "Menambah Blog..." : "Tambah Blog"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddBlog;
