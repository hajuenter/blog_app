import React from "react";
import { assets } from "../../assets/assets";
import { Outlet } from "react-router-dom";
import Sidebar from "../../components/admin/Sidebar";
import { useAppContext } from "../../context/AppContext";
import { toast } from "react-hot-toast";

const Layout = () => {
  const { axios, setToken, navigate } = useAppContext();
  const logout = () => {
    toast(
      (t) => (
        <div className="flex flex-col gap-3">
          <div>
            <p className="font-medium">Konfirmasi Logout</p>
            <p className="text-sm text-gray-600">
              Yakin ingin keluar dari aplikasi?
            </p>
          </div>
          <div className="flex gap-2">
            <button
              onClick={async () => {
                toast.dismiss(t.id);
                try {
                  localStorage.removeItem("token");
                  axios.defaults.headers.common["Authorization"] = null;
                  setToken(null);
                  navigate("/");
                } catch (error) {
                  toast.error("Gagal logout");
                }
              }}
              className="bg-red-500 text-white px-3 py-1 rounded text-sm hover:bg-red-600"
            >
              Logout
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

      <div className="flex h-[calc(100vh-70px)] overflow-hidden">
        <Sidebar />
        <div className="flex-1 overflow-hidden">
          <Outlet />
        </div>
      </div>
    </>
  );
};

export default Layout;
