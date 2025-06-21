import React from "react";
import { assets } from "./../assets/assets";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();

  return (
    <div className="px-3.5 md:px-5 lg:px-8 xl:px-11 sticky top-0 w-full bg-white z-50 shadow">
      <div className="max-w-7xl mx-auto flex justify-between items-center py-5 px-4 sm:px-8">
        <img
          onClick={() => navigate("/")}
          src={assets.logo}
          alt="logo"
          className="w-32 sm:w-44 cursor-pointer"
        />
        <button
          onClick={() => navigate("/admin")}
          className="flex items-center gap-2 rounded-full text-sm cursor-pointer bg-primary text-white px-5 py-2 lg:px-10 lg:py-2.5"
        >
          Masuk
          <img src={assets.arrow} alt="arrow" className="w-3" />
        </button>
      </div>
    </div>
  );
};

export default Navbar;
