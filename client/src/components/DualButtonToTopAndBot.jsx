import React, { useState, useRef, useEffect } from "react";
import { Bot, X, Send, ArrowUp } from "lucide-react";
import { useAppContext } from "../context/AppContext";

const DualButtonToTopAndBot = () => {
  const { axios } = useAppContext();
  const [isBotOpen, setIsBotOpen] = useState(false);
  const [showScrollToTop, setShowScrollToTop] = useState(false);
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);
  const chatContainerRef = useRef(null);

  const toggleBot = () => {
    setIsBotOpen(!isBotOpen);
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    if (isBotOpen) {
      scrollToBottom();
    }
  }, [messages, isBotOpen]);

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollToTop(window.scrollY > 100);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const sendMessage = async () => {
    if (inputMessage.trim() === "" || isLoading) return;

    const userMessage = {
      id: Date.now(),
      type: "user",
      text: inputMessage.trim(),
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    const currentMessage = inputMessage.trim();
    setInputMessage("");
    setIsLoading(true);

    try {
      // console.log("Sending message:", currentMessage);

      const response = await axios.post("/api/bot/send", {
        prompt: currentMessage,
      });

      if (response.data.success) {
        const botMessage = {
          id: Date.now() + 1,
          type: "bot",
          text: response.data.result,
          timestamp: new Date(),
        };
        setMessages((prev) => [...prev, botMessage]);
      } else {
        const errorMessage = {
          id: Date.now() + 1,
          type: "bot",
          text: `Maaf, terjadi kesalahan: ${response.data.message}`,
          timestamp: new Date(),
        };
        setMessages((prev) => [...prev, errorMessage]);
      }
    } catch (error) {
      // console.error("Detailed error:", error);
      const errorMessage = {
        id: Date.now() + 1,
        type: "bot",
        text: `Koneksi gagal: ${error.message}. Pastikan server backend berjalan dengan benar`,
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !isLoading) {
      sendMessage();
    }
  };

  const formatTime = (date) => {
    return date.toLocaleTimeString("id-ID", {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  // Function untuk render markdown sederhana
  const renderMessage = (text) => {
    // Convert **text** ke bold
    let formatted = text.replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>");

    // Convert _text_ ke italic
    formatted = formatted.replace(/_(.*?)_/g, "<em>$1</em>");

    // Convert line breaks
    formatted = formatted.replace(/\n/g, "<br />");

    return { __html: formatted };
  };

  return (
    <div className="fixed bottom-3 right-3 md:bottom-3.5 md:right-3.5 lg:bottom-5 lg:right-5 xl:bottom-6 xl:right-6 z-50">
      <div className="relative">
        <button
          onClick={toggleBot}
          className={`p-2.5 md:p-3 lg:p-3 xl:p-3 rounded-full bg-primary/95 shadow-lg transition-all duration-300 transform hover:scale-105 ${
            isBotOpen ? "scale-105 bg-primary" : ""
          }`}
        >
          <Bot
            className={`w-4 h-4 md:w-4 md:h-4 lg:h-7 lg:w-7 xl:w-8 xl:h-8 text-white transition-transform duration-300 ${
              isBotOpen ? "rotate-12" : ""
            } ${isLoading ? "animate-pulse" : ""}`}
          />
        </button>

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
              <Bot
                className={`w-6 h-6 text-blue-600 ${
                  isLoading ? "animate-pulse" : ""
                }`}
              />
              <span className="text-sm font-medium text-gray-800">
                AI Hajuenter Assistant
              </span>
              {isLoading && (
                <div className="flex gap-1">
                  <div className="w-1 h-1 bg-blue-600 rounded-full animate-bounce"></div>
                  <div
                    className="w-1 h-1 bg-blue-600 rounded-full animate-bounce"
                    style={{ animationDelay: "0.1s" }}
                  ></div>
                  <div
                    className="w-1 h-1 bg-blue-600 rounded-full animate-bounce"
                    style={{ animationDelay: "0.2s" }}
                  ></div>
                </div>
              )}
            </div>
            <button
              onClick={toggleBot}
              className="p-1 hover:bg-gray-100 rounded-full transition-all duration-200 hover:rotate-90"
            >
              <X className="w-4 h-4 text-gray-500" />
            </button>
          </div>

          {/* Message Area */}
          <div
            ref={chatContainerRef}
            className="h-48 overflow-y-auto p-3 bg-gray-50"
          >
            {messages.length === 0 ? (
              <div className="flex items-center justify-center h-full text-gray-500 text-sm">
                Mulai percakapan dengan AI Assistant...
              </div>
            ) : (
              <div className="space-y-3">
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex ${
                      message.type === "user" ? "justify-end" : "justify-start"
                    }`}
                  >
                    <div
                      className={`max-w-[80%] p-2 rounded-lg shadow-sm ${
                        message.type === "user"
                          ? "bg-blue-600 text-white rounded-br-sm"
                          : "bg-white text-gray-800 rounded-bl-sm border"
                      }`}
                    >
                      {message.type === "user" ? (
                        <p className="text-xs leading-relaxed">
                          {message.text}
                        </p>
                      ) : (
                        <div
                          className="text-xs leading-relaxed"
                          dangerouslySetInnerHTML={renderMessage(message.text)}
                        />
                      )}
                      <span
                        className={`text-xs mt-1 block ${
                          message.type === "user"
                            ? "text-blue-100"
                            : "text-gray-400"
                        }`}
                      >
                        {formatTime(message.timestamp)}
                      </span>
                    </div>
                  </div>
                ))}
                <div ref={messagesEndRef} />
              </div>
            )}
          </div>

          {/* Input Area */}
          <div className="border-t border-gray-200 p-3">
            <div className="flex gap-1">
              <input
                type="text"
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                onKeyDown={handleKeyPress}
                placeholder={
                  isLoading ? "Menunggu respons..." : "Ketik pesan Anda..."
                }
                disabled={isLoading}
                className="flex-1 px-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all duration-200 disabled:bg-gray-100 disabled:cursor-not-allowed"
              />

              {/* Tombol Kirim */}
              <button
                onClick={sendMessage}
                disabled={inputMessage.trim() === "" || isLoading}
                className="w-10 h-10 flex items-center justify-center bg-blue-600 hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed rounded-lg transition-all duration-200 hover:scale-105 active:scale-95"
              >
                <Send
                  className={`w-4 h-4 text-white ${
                    isLoading ? "animate-pulse" : ""
                  }`}
                />
              </button>

              {/* Tombol Clear */}
              <button
                onClick={() => {
                  setMessages([]);
                  setInputMessage("");
                }}
                disabled={isLoading || messages.length === 0}
                className="w-10 h-10 flex items-center justify-center border border-gray-300 rounded-lg hover:bg-red-50 transition-all duration-200 hover:scale-105 active:scale-95 disabled:bg-gray-100 disabled:cursor-not-allowed group"
                title="Hapus riwayat"
              >
                <X
                  className={`w-4 h-4 ${
                    isLoading || messages.length === 0
                      ? "text-gray-300"
                      : "text-gray-500 group-hover:text-red-500"
                  }`}
                />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll to Top Button */}
      {showScrollToTop && (
        <div className="mt-2">
          <button
            onClick={scrollToTop}
            className="p-2.5 md:p-3 lg:p-3 xl:p-3 rounded-full bg-primary/95 shadow-lg transition-all duration-300 transform hover:bg-primary hover:scale-105 hover:-translate-y-0.5 active:scale-95"
          >
            <ArrowUp className="w-4 h-4 md:w-4 md:h-4 lg:h-7 lg:w-7 xl:w-8 xl:h-8 text-white" />
          </button>
        </div>
      )}
    </div>
  );
};

export default DualButtonToTopAndBot;
