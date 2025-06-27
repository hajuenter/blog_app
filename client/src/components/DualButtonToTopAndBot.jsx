import React, { useState, useEffect } from "react";
import { assets } from "../assets/assets";

const AnimatedDualCircleButtons = () => {
  const [isBotOpen, setIsBotOpen] = useState(false);
  const [showScrollToTop, setShowScrollToTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollToTop(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleBot = () => {
    setIsBotOpen((prev) => !prev);
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="fixed bottom-3 right-3 md:bottom-3.5 md:right-3.5 lg:bottom-5 lg:right-5 xl:bottom-6 xl:right-6 z-50">
      {/* Bot Message Button */}
      <div
        className={`relative transition-all duration-500 ${
          showScrollToTop ? "transform translate-y-0" : ""
        }`}
      >
        <button
          onClick={toggleBot}
          className={`p-2.5 md:p-3 lg:p-3 xl:p-3 rounded-full bg-primary shadow-lg transition-all duration-300 transform hover:scale-102 ${
            isBotOpen ? "scale-105 bg-primary" : ""
          }`}
        >
          <img
            src={assets.bot}
            alt="Bot"
            className={`w-4 h-4 md:w-4 md:h-4 lg:h-7 lg:w-7 xl:w-8 xl:h-8 transition-transform duration-300 ${
              isBotOpen ? "rotate-12" : ""
            }`}
          />
        </button>

        {/* Bot Chat Interface */}
        <div
          className={`absolute bottom-full right-0 mb-2 bg-white shadow-xl rounded-xl w-80 border border-gray-200 transition-all duration-300 transform origin-bottom-right ${
            isBotOpen
              ? "opacity-100 scale-100 translate-y-0"
              : "opacity-0 scale-95 translate-y-2 pointer-events-none"
          }`}
        >
          {/* Header */}
          <div className="flex items-center justify-between p-3 border-b border-gray-200">
            <div className="flex items-center gap-2">
              <img
                src={assets.bot}
                alt="Bot"
                className="w-6 h-6 animate-pulse"
              />
              <span className="text-sm font-medium text-gray-800">
                AI Hajuenter Assistant
              </span>
            </div>
            <button
              onClick={toggleBot}
              className="p-1 hover:bg-gray-100 rounded-full transition-all duration-200 hover:rotate-90"
            >
              <svg
                className="w-4 h-4 text-gray-500"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>

          {/* Message Area */}
          <div className="p-3 text-sm">
            <div
              className={`transform transition-all duration-500 delay-100 ${
                isBotOpen
                  ? "translate-y-0 opacity-100"
                  : "translate-y-4 opacity-0"
              }`}
            >
              <p className="text-gray-800 mb-3">
                Halo! Ada yang bisa saya bantu? Tanyakan apa saja ya 😊
              </p>
            </div>
          </div>

          {/* Input Area */}
          <div className="border-t border-gray-200 p-3">
            <div
              className={`flex gap-2 transform transition-all duration-500 delay-200 ${
                isBotOpen
                  ? "translate-y-0 opacity-100"
                  : "translate-y-4 opacity-0"
              }`}
            >
              <input
                type="text"
                placeholder="Ketik pesan Anda..."
                className="flex-1 px-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all duration-200 focus:scale-[1.01]"
              />
              <button className="p-2 bg-primary hover:bg-primary rounded-lg transition-all duration-200 hover:scale-102 active:scale-95">
                <svg
                  className="w-4 h-4 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll to Top Button - Only appears when scrolling */}
      {showScrollToTop && (
        <div
          className={`transition-all duration-500 transform ${
            showScrollToTop
              ? "opacity-100 translate-y-0 scale-100"
              : "opacity-0 translate-y-4 scale-95"
          }`}
        >
          <button
            onClick={scrollToTop}
            className="mt-2 p-2.5 md:p-3 lg:p-3 xl:p-3 rounded-full bg-primary shadow-lg transition-all duration-300 transform hover:scale-102 hover:-translate-y-0.5 active:scale-95"
          >
            <img
              src={assets.arrow_top}
              alt="Scroll to top"
              className="w-4 h-4 md:w-4 md:h-4 lg:h-7 lg:w-7 xl:w-8 xl:h-8 transition-transform duration-300"
            />
          </button>
        </div>
      )}
    </div>
  );
};

export default AnimatedDualCircleButtons;
