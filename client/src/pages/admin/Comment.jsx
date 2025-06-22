import React, { useEffect, useState } from "react";
import { comments_data } from "../../assets/assets";
import CommentTableItem from "../../components/admin/CommentTableItem";

const Comment = () => {
  const [comment, setComment] = useState([]);
  const [filter, setFilter] = useState("Belum Konfirmasi");

  const fetchComment = () => {
    setComment(comments_data);
  };

  useEffect(() => {
    fetchComment();
  }, []);

  return (
    <div className="w-full h-full overflow-y-auto p-4 md:p-10 bg-blue-50/50 pb-4">
      <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-4 gap-2">
        <h1>Komentar</h1>

        <div className="flex gap-1 md:gap-3 lg:gap-4 xl:gap-7">
          <button
            onClick={() => setFilter("Sudah Konfirmasi")}
            className={`shadow-custom-sm px-1 py-0 border rounded-full lg:px-4 lg:py-1 cursor-pointer text-xs
              ${
                filter === "Sudah Konfirmasi" ? "text-primary" : "text-gray-700"
              }`}
          >
            Sudah Konfirmasi
          </button>

          <button
            onClick={() => setFilter("Belum Konfirmasi")}
            className={`shadow-custom-sm border rounded-full px-4 py-1 cursor-pointer text-xs
              ${
                filter === "Belum Konfirmasi" ? "text-primary" : "text-gray-700"
              }`}
          >
            Belum Konfirmasi
          </button>
        </div>
      </div>

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
                  style={{ minWidth: "250px" }}
                >
                  Judul Blog & Komentar
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
                  style={{ width: "120px" }}
                >
                  Aksi
                </th>
              </tr>
            </thead>
            <tbody>
              {comment
                .filter((comment) => {
                  if (filter === "Sudah Konfirmasi")
                    return comment.isApproved === true;
                  return comment.isApproved === false;
                })
                .map((comment, index) => (
                  <CommentTableItem
                    key={comment._id}
                    comment={comment}
                    index={index + 1}
                    fetchComments={fetchComment}
                  />
                ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Comment;
