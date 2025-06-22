import React from "react";
import { assets } from "../../assets/assets";
import { Outlet, useNavigate } from "react-router-dom";
import Sidebar from "../../components/admin/Sidebar";

const Layout = () => {
  const navigate = useNavigate();

  const logout = () => {
    navigate("/");
  };

  return (
    <>
      <div className="px-3.5 md:px-5 lg:px-8 xl:px-11 sticky top-0 w-full bg-white z-50 shadow">
        <div className="max-w-7xl mx-auto flex items-center justify-between py-5 px-4 sm:px-8">
          <img
            src={assets.logo}
            alt="Logo"
            className="w-32 sm:w-44 cursor-pointer"
            onClick={() => navigate("/")}
          />
          <button
            onClick={logout}
            className="flex items-center gap-2 rounded-full text-sm cursor-pointer bg-primary text-white px-5 py-2 lg:px-10 lg:py-2.5"
          >
            Logout
          </button>
        </div>
      </div>

      <div className="flex h-[calc(100vh-70px)]">
        <Sidebar />
        <Outlet />
      </div>
    </>
  );
};

export default Layout;
