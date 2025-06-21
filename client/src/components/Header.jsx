import React from "react";
import { assets } from "../assets/assets";

const Header = () => {
  return (
    <div className="mx-8 sm:mx-16 xl:mx-24 relative">
      <div className="text-center mt-8 lg:mt-16 md:mt-12 mb-8">
        <div className="inline-flex items-center justify-center gap-4 px-6 py-1.5 mb-4 border border-primary/40 bg-primary/10 rounded-full text-sm text-primary">
          <p>Baru: Fitur kecerdasan buatan sudah tersedia</p>
          <img src={assets.star_icon} alt="star" className="w-[17px]" />
        </div>
        <h1 className="text-3xl sm:text-6xl font-semibold sm:leading-16 text-gray-700">
          Eksplorasi Inovasi
          <span className="text-primary"> Teknologi & AI</span> <br />
          Lewat Tulisanmu Sendiri
        </h1>
        <p className="my-6 sm:my-8 max-w-2xl m-auto max-sm:text-xs text-gray-500">
          Ini adalah ruangmu untuk berpikir terbuka, membagikan hal-hal yang
          penting, dan menulis tanpa batasan. Entah hanya satu kata atau seribu,
          ceritamu dimulai dari sini.
        </p>
        <form className="flex justify-between max-w-lg max-sm:scale-75 mx-auto border border-gray-300 bg-white rounded overflow-hidden">
          <input
            className="w-full pl-4 outline-none"
            type="text"
            placeholder="Temukan blog menarik"
            required
          />
          <button
            type="submit"
            className="bg-primary text-white px-8 py-2 m-1.5 rounded hover:scale-105 transition-all cursor-pointer"
          >
            Cari
          </button>
        </form>
      </div>
      <img
        src={assets.gradientBackground}
        alt="bg"
        className="absolute -top-50 -z-1 opacity-50"
      />
    </div>
  );
};

export default Header;
