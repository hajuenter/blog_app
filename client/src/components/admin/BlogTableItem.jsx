import React from "react";
import { assets } from "../../assets/assets";
import { useAppContext } from "../../context/AppContext";
import toast from "react-hot-toast";

const BlogTableItem = ({ blog, fetchBlog, index }) => {
  const { axios } = useAppContext();
  const { title, createdAt, isPublished } = blog;
  const blogDate = new Date(createdAt);

  const deleteBlog = async () => {
    toast(
      (t) => (
        <div className="flex flex-col gap-3">
          <div>
            <p className="font-medium">Hapus Blog</p>
            <p className="text-sm text-gray-600">
              Yakin ingin menghapus "{title}"?
            </p>
          </div>
          <div className="flex gap-2">
            <button
              onClick={async () => {
                toast.dismiss(t.id);
                try {
                  const { data } = await axios.delete("/api/blog/delete", {
                    data: { id: blog._id },
                  });
                  if (data.success) {
                    toast.success(data.message);
                    await fetchBlog();
                  } else {
                    toast.error(data.message);
                  }
                } catch (error) {
                  toast.error(error.message);
                }
              }}
              className="bg-red-500 text-white px-3 py-1 rounded text-sm hover:bg-red-600"
            >
              Hapus
            </button>
            <button
              onClick={() => toast.dismiss(t.id)}
              className="bg-gray-300 px-3 py-1 rounded text-sm hover:bg-gray-400"
            >
              Batal
            </button>
          </div>
        </div>
      ),
      {
        duration: Infinity,
        position: "top-center",
      }
    );
  };

  const togglePublish = async () => {
    try {
      const { data } = await axios.post("/api/blog/toggle-publish", {
        id: blog._id,
      });
      if (data.success) {
        toast.success(data.message);
        await fetchBlog();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <tr className="border-y border-gray-300 whitespace-nowrap">
      <th className="px-4 py-4 text-center">{index}</th>
      <td className="px-4 py-4">
        <div className="whitespace-normal" title={title}>
          {title}
        </div>
      </td>
      <td className="px-4 py-4">
        {blogDate.toLocaleDateString("id-ID", {
          day: "2-digit",
          month: "short",
          year: "numeric",
        })}
      </td>
      <td className="px-4 py-4">
        <p
          className={`text-sm ${
            isPublished ? "text-green-600" : "text-orange-700"
          }`}
        >
          {isPublished ? "Published" : "Unpublish"}
        </p>
      </td>
      <td className="px-4 py-4">
        <div className="flex gap-2 items-center">
          <button
            onClick={togglePublish}
            className="border px-3 py-1 rounded cursor-pointer text-xs hover:bg-gray-50"
          >
            {isPublished ? "Unpublish" : "Publish"}
          </button>
          <button
            className="w-6 h-6 flex items-center justify-center rounded bg-red-300 hover:bg-red-500 transition-colors cursor-pointer"
            title="Hapus blog"
          >
            <img
              onClick={() => {
                toast(
                  (t) => (
                    <div className="flex flex-col gap-3">
                      <div>
                        <p className="font-medium">Konfirmasi Hapus</p>
                        <p className="text-sm text-gray-600">
                          Yakin ingin menghapus blog ini?
                        </p>
                      </div>
                      <div className="flex gap-2">
                        <button
                          onClick={async () => {
                            toast.dismiss(t.id);
                            await deleteBlog();
                          }}
                          className="bg-red-600 text-white px-3 py-1 rounded text-sm hover:bg-red-700"
                        >
                          Hapus
                        </button>
                        <button
                          onClick={() => toast.dismiss(t.id)}
                          className="bg-gray-300 px-3 py-1 rounded text-sm hover:bg-gray-400"
                        >
                          Batal
                        </button>
                      </div>
                    </div>
                  ),
                  {
                    duration: Infinity,
                    position: "top-center",
                  }
                );
              }}
              src={assets.cross_icon}
              className="w-4 h-4"
              alt="delete"
            />
          </button>
        </div>
      </td>
    </tr>
  );
};

export default BlogTableItem;
