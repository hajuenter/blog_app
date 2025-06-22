import React from "react";
import { assets } from "../../assets/assets";

const BlogTableItem = ({ blog, fetchBlog, index }) => {
  const { title, createdAt, isPublished } = blog;
  const blogDate = new Date(createdAt);

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
          {isPublished ? "Published" : "Draft"}
        </p>
      </td>
      <td className="px-4 py-4">
        <div className="flex gap-2 items-center">
          <button className="border px-3 py-1 rounded cursor-pointer text-xs hover:bg-gray-50">
            {isPublished ? "Unpublish" : "Publish"}
          </button>
          <button
            className="w-6 h-6 flex items-center justify-center rounded bg-red-300 hover:bg-red-500 transition-colors cursor-pointer"
            title="Hapus blog"
          >
            <img src={assets.cross_icon} className="w-4 h-4" alt="delete" />
          </button>
        </div>
      </td>
    </tr>
  );
};

export default BlogTableItem;
