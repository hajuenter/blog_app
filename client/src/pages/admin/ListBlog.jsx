import React, { useEffect, useState } from "react";
import BlogTableItem from "../../components/admin/BlogTableItem";
import { blog_data } from "../../assets/assets";

const ListBlog = () => {
  const [blogs, setBlogs] = useState([]);

  const fetchBlogs = async () => {
    setBlogs(blog_data);
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  return (
    <div className="w-full h-full overflow-y-auto p-4 md:p-10 bg-blue-50/50 pb-4">
      <h1>Semua Blog</h1>

      <div className="w-full mt-4 mb-3 bg-white rounded-lg shadow overflow-hidden max-w-full">
        <div className="overflow-x-auto">
          <table
            className="w-full text-sm text-gray-700"
            style={{ minWidth: "500px" }}
          >
            <thead className="text-xs text-gray-600 uppercase bg-gray-50">
              <tr>
                <th
                  scope="col"
                  className="px-3 py-3 text-left"
                  style={{ width: "50px" }}
                >
                  #
                </th>
                <th
                  scope="col"
                  className="px-3 py-3 text-left"
                  style={{ minWidth: "150px" }}
                >
                  Judul Blog
                </th>
                <th
                  scope="col"
                  className="px-3 py-3 text-left"
                  style={{ width: "100px" }}
                >
                  Tanggal
                </th>
                <th
                  scope="col"
                  className="px-3 py-3 text-left"
                  style={{ width: "80px" }}
                >
                  Status
                </th>
                <th
                  scope="col"
                  className="px-3 py-3 text-left"
                  style={{ width: "120px" }}
                >
                  Aksi
                </th>
              </tr>
            </thead>
            <tbody>
              {blogs.map((blog, index) => (
                <BlogTableItem
                  key={blog._id}
                  blog={blog}
                  fetchBlog={fetchBlogs}
                  index={index + 1}
                />
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ListBlog;
