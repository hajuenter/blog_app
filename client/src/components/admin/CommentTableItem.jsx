import React from "react";
import { assets } from "../../assets/assets";
import { useAppContext } from "../../context/AppContext";
import toast from "react-hot-toast";

const CommentTableItem = ({ comment, fetchComments }) => {
  const { blog, createdAt, _id } = comment; // Tambahkan _id di destructuring
  const blogDate = new Date(createdAt);
  const { axios } = useAppContext();

  const approveComment = async () => {
    try {
      const { data } = await axios.post("/api/admin/approve-comment", {
        id: _id,
      });
      if (data.success) {
        toast.success(data.message);
        await fetchComments();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  const deleteComment = async () => {
    toast(
      (t) => (
        <div className="flex flex-col gap-3">
          <div>
            <p className="font-medium">Hapus Komentar</p>
            <p className="text-sm text-gray-600">
              Yakin ingin menghapus komentar dari {comment.name}?
            </p>
          </div>
          <div className="flex gap-2">
            <button
              onClick={async () => {
                toast.dismiss(t.id);
                try {
                  const { data } = await axios.delete(
                    "/api/admin/delete-comment",
                    {
                      data: { id: _id },
                    }
                  );
                  if (data.success) {
                    toast.success(data.message);
                    await fetchComments();
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

  return (
    <tr className="border-y border-gray-300 whitespace-nowrap">
      <td className="px-4 py-4">
        <b className="font-medium text-gray-600">Blog</b>: {blog.title}
        <br />
        <br />
        <b className="font-medium text-gray-600">Nama</b>: {comment.name}
        <br />
        <b className="font-medium text-gray-600">Komentar</b>: {comment.content}
      </td>

      <td className="px-4 py-4">
        {blogDate.toLocaleDateString("id-ID", {
          day: "2-digit",
          month: "short",
          year: "numeric",
        })}
      </td>

      <td className="px-4 py-4">
        <div className="flex items-center gap-2">
          {!comment.isApproved ? (
            <button
              onClick={approveComment}
              className="w-6 h-6 flex items-center justify-center rounded bg-green-200 hover:bg-green-400 transition-colors cursor-pointer"
              title="Konfirmasi"
            >
              <img
                src={assets.tick_icon}
                alt="Approve"
                className="w-3.5 h-3.5"
              />
            </button>
          ) : (
            <p className="text-xs bg-green-100 text-green-600 border border-green-600 rounded-full px-3 py-1">
              Disetujui
            </p>
          )}

          <button
            onClick={deleteComment}
            className="w-6 h-6 flex items-center justify-center rounded bg-red-300 hover:bg-red-500 transition-colors cursor-pointer"
            title="Hapus komentar"
          >
            <img src={assets.bin_icon} alt="Hapus" className="w-3.5 h-3.5" />
          </button>
        </div>
      </td>
    </tr>
  );
};

export default CommentTableItem;
