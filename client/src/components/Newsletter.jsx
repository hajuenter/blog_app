import React from "react";

function Newsletter() {
  return (
    <div className="flex flex-col sm:px-0 px-3 items-center justify-center text-center space-y-2 mt-20 mb-32">
      <h1 className="md:text-4xl text-2xl font-semibold">
        Jangan Lewatkan Blog Terbaru
      </h1>
      <p className="md:text-lg text-gray-500/70 pb-8">
        Berlangganan untuk mendapatkan blog terbaru, teknologi terkini, dan
        berita eksklusif.
      </p>
      <form className="flex items-center justify-between max-w-2xl w-full md:h-13 h-12">
        <input
          className="border border-gray-300 rounded-md h-full border-r-0 outline-none w-full rounded-r-none px-3 text-gray-500"
          type="text"
          placeholder="Masukkan email Anda"
          required
        />
        <button
          type="submit"
          className="md:px-12 px-8 h-full text-white bg-primary/80 hover:bg-primary transition-all cursor-pointer rounded-md rounded-l-none"
        >
          Berlangganan
        </button>
      </form>
    </div>
  );
}

export default Newsletter;
