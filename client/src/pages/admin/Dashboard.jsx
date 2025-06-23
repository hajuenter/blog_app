import React, { useEffect, useState } from "react";
import { assets, dashboard_data } from "./../../assets/assets";
import BlogTableItem from "../../components/admin/BlogTableItem";
import { useAppContext } from "../../context/AppContext";
import toast from "react-hot-toast";

const Dashboard = () => {
  const [dashboardData, setDashboardData] = useState({
    blogs: 0,
    comments: 0,
    drafts: 0,
    recentBlogs: [],
  });

  const { axios } = useAppContext();

  const fetchDashboard = async () => {
    try {
      const { data } = await axios.get("/api/admin/dashboard");
      data.success
        ? setDashboardData(data.dashboardData)
        : toast.error(data.message);
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    fetchDashboard();
  }, []);

  return (
    <div className="w-full h-full overflow-y-auto p-4 md:p-10 bg-blue-50/50 pb-4">
      <h1>Dashboard</h1>
      <div className="flex mt-4 flex-col sm:flex-row sm:flex-wrap gap-4">
        <div className="flex items-center gap-4 bg-white p-4 w-full sm:min-w-58 sm:flex-1 rounded shadow cursor-pointer hover:scale-105 transition-all">
          <img src={assets.dashboard_icon_1} alt="" />
          <div>
            <p className="text-xl font-semibold text-gray-600">
              {dashboardData.blogs}
            </p>
            <p className="text-gray-400 font-light">Blog</p>
          </div>
        </div>

        <div className="flex items-center gap-4 bg-white p-4 w-full sm:min-w-58 sm:flex-1 rounded shadow cursor-pointer hover:scale-105 transition-all">
          <img src={assets.dashboard_icon_2} alt="" />
          <div>
            <p className="text-xl font-semibold text-gray-600">
              {dashboardData.comments}
            </p>
            <p className="text-gray-400 font-light">Komentar</p>
          </div>
        </div>

        <div className="flex items-center gap-4 bg-white p-4 w-full sm:min-w-58 sm:flex-1 rounded shadow cursor-pointer hover:scale-105 transition-all">
          <img src={assets.dashboard_icon_3} alt="" />
          <div>
            <p className="text-xl font-semibold text-gray-600">
              {dashboardData.drafts}
            </p>
            <p className="text-gray-400 font-light">Draf</p>
          </div>
        </div>
      </div>

      <div className="flex items-center gap-3 m-4 mt-6 text-gray-600">
        <img src={assets.dashboard_icon_4} alt="icontable" />
        <p>latest Blogs</p>
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
                  className="px-3 py-4 text-left"
                  style={{ width: "50px" }}
                >
                  #
                </th>
                <th
                  scope="col"
                  className="px-3 py-4 text-left"
                  style={{ minWidth: "150px" }}
                >
                  Judul Blog
                </th>
                <th
                  scope="col"
                  className="px-3 py-4 text-left"
                  style={{ width: "100px" }}
                >
                  Tanggal
                </th>
                <th
                  scope="col"
                  className="px-3 py-4 text-left"
                  style={{ width: "80px" }}
                >
                  Status
                </th>
                <th
                  scope="col"
                  className="px-3 py-4 text-left"
                  style={{ width: "120px" }}
                >
                  Aksi
                </th>
              </tr>
            </thead>
            <tbody>
              {dashboardData.recentBlogs.map((blog, index) => (
                <BlogTableItem
                  key={blog._id}
                  blog={blog}
                  fetchBlog={fetchDashboard}
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

export default Dashboard;
