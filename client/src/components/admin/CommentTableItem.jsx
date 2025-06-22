import React from "react";
import { assets } from "../../assets/assets";

const CommentTableItem = ({ comment, fetchComments }) => {
  const { blog, createdAt } = comment;
  const blogDate = new Date(createdAt);

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
