import React, { useEffect, useRef, useState } from "react";
import { assets, blogCategories } from "../../assets/assets";
import Quill from "quill";

const AddBlog = () => {
  const editorRef = useRef(null);
  const quillRef = useRef(null);
  const [image, setImage] = useState(false);
  const [title, setTitle] = useState("");
  const [subTitle, setSubTitle] = useState("");
  const [category, setCategory] = useState("");
  const [isPublished, setIsPublished] = useState(false);

  const generateContent = async () => {};

  const onSubmitHandle = async (e) => {
    e.preventDefault();
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
                onChange={(e) => setImage(e.target.files[0])}
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
              <button
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
            type="submit"
            onClick={onSubmitHandle}
            className="w-40 h-12 bg-primary text-white rounded-lg cursor-pointer text-sm font-medium hover:bg-primary/90 transition-colors focus:outline-none focus:ring-2 focus:ring-primary/30 focus:ring-offset-2"
          >
            Tambah Blog
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddBlog;
