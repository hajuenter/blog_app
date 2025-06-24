import React, { useState, useEffect, useRef } from "react";
import { useAppContext } from "../../context/AppContext";
import toast from "react-hot-toast";

const GenerateImage = () => {
  const { axios } = useAppContext();
  const [prompt, setPrompt] = useState("");
  const [loading, setLoading] = useState(false);
  const [generatedImage, setGeneratedImage] = useState(null);
  const [currentFileId, setCurrentFileId] = useState(null);
  const sessionId = useRef(Date.now().toString());

  const cleanupTemporaryImage = async (fileId) => {
    if (!fileId) return;

    try {
      await axios.post("/api/blog/delete-temporary-image", {
        fileId: fileId,
        sessionId: sessionId.current,
      });
    } catch (error) {
      console.error("Error cleaning up temporary image:", error);
    }
  };

  useEffect(() => {
    const handleBeforeUnload = () => {
      if (currentFileId) {
        const data = JSON.stringify({
          fileId: currentFileId,
          sessionId: sessionId.current,
        });
        navigator.sendBeacon("/api/blog/delete-temporary-image", data);
      }
    };

    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
      if (currentFileId) {
        cleanupTemporaryImage(currentFileId);
      }
    };
  }, [currentFileId]);

  const generateImage = async () => {
    if (!prompt.trim()) {
      return toast.error("Tolong masukkan prompt terlebih dahulu");
    }

    try {
      setLoading(true);

      if (currentFileId) {
        await cleanupTemporaryImage(currentFileId);
        setCurrentFileId(null);
      }

      setGeneratedImage(null);

      const { data } = await axios.post("/api/blog/generate-image", {
        prompt: prompt,
        sessionId: sessionId.current,
      });

      if (data.success) {
        setGeneratedImage(data.imageUrl);
        setCurrentFileId(data.fileId);
        toast.success("Gambar berhasil dibuat!");
      } else {
        toast.error(data.message || "Gagal membuat gambar");
      }
    } catch (error) {
      if (error.response && error.response.status === 503) {
        toast.error("Model sedang sibuk. Silakan coba beberapa saat lagi.");
      } else {
        toast.error(error.message || "Terjadi kesalahan");
      }
    } finally {
      setLoading(false);
    }
  };

  const downloadImage = async () => {
    if (!generatedImage) return;

    try {
      const response = await fetch(generatedImage);
      const blob = await response.blob();

      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = `generated-image-${Date.now()}.png`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);

      if (currentFileId) {
        await axios.post("/api/blog/save-permanent-image", {
          fileId: currentFileId,
          sessionId: sessionId.current,
        });
        setCurrentFileId(null);
      }

      toast.success("Gambar berhasil didownload!");
    } catch (error) {
      toast.error("Gagal mendownload gambar");
    }
  };

  const handlePromptChange = (e) => {
    const newPrompt = e.target.value;
    setPrompt(newPrompt);

    if (newPrompt !== prompt && generatedImage && currentFileId) {
      cleanupTemporaryImage(currentFileId);
      setGeneratedImage(null);
      setCurrentFileId(null);
    }
  };

  return (
    <div className="w-full h-full overflow-y-auto p-4 md:p-10 bg-blue-50/50 pb-4">
      <h1>Generate Gambar</h1>

      <div className="w-full mt-4 mb-3 bg-white rounded-lg shadow overflow-hidden max-w-full">
        <div className="p-4 md:p-8">
          <div className="mb-6">
            <p className="mb-2 text-gray-700 font-medium">Prompt Gambar</p>
            <textarea
              placeholder="Deskripsikan gambar yang ingin Anda buat dengan detail..."
              required
              rows={4}
              className="w-full max-w-lg p-3 border border-gray-300 outline-none rounded-lg focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors resize-vertical"
              onChange={handlePromptChange}
              value={prompt}
              onKeyPress={(e) => {
                if (e.key === "Enter" && e.ctrlKey && !loading) {
                  generateImage();
                }
              }}
            />
            <p className="text-xs text-gray-500 mt-1">
              Tekan Ctrl + Enter untuk generate gambar
            </p>
          </div>

          <div className="mb-8">
            <button
              disabled={loading}
              type="button"
              onClick={generateImage}
              className={`w-40 h-12 bg-primary text-white rounded-lg text-sm font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-primary/30 focus:ring-offset-2 ${
                loading
                  ? "opacity-50 cursor-not-allowed"
                  : "cursor-pointer hover:bg-primary/90"
              }`}
            >
              {loading ? "Membuat Gambar..." : "Buat Gambar"}
            </button>
          </div>

          <div className="mb-6">
            <p className="mb-2 text-gray-700 font-medium">
              {generatedImage && !loading ? "Hasil Gambar" : "Preview Gambar"}
            </p>

            {loading && (
              <div className="flex items-center justify-center p-12 border-2 border-dashed border-gray-300 rounded-lg bg-gray-50 max-w-lg">
                <div className="text-center">
                  <div className="w-8 h-8 rounded-full border-2 border-t-primary animate-spin mx-auto mb-2"></div>
                  <p className="text-gray-600 text-sm">
                    Sedang membuat gambar...
                  </p>
                </div>
              </div>
            )}

            {generatedImage && !loading && (
              <div className="border border-gray-300 rounded-lg overflow-hidden bg-gray-50 max-w-2xl">
                <img
                  src={generatedImage}
                  alt="Generated image"
                  className="w-full h-auto object-contain"
                  style={{ aspectRatio: "16/9" }}
                  onError={() => {
                    toast.error("Gagal memuat gambar");
                    setGeneratedImage(null);
                    if (currentFileId) {
                      cleanupTemporaryImage(currentFileId);
                      setCurrentFileId(null);
                    }
                  }}
                />
                <div className="p-4 bg-white border-t border-gray-200">
                  <div className="flex gap-2">
                    <button
                      onClick={downloadImage}
                      className="flex-1 h-10 bg-green-600 text-white rounded-lg text-sm font-medium hover:bg-green-700 transition-colors focus:outline-none focus:ring-2 focus:ring-green-500/30 focus:ring-offset-2"
                    >
                      Download PNG
                    </button>
                    <button
                      onClick={() => {
                        if (currentFileId) {
                          cleanupTemporaryImage(currentFileId);
                          setCurrentFileId(null);
                        }
                        setGeneratedImage(null);
                        toast.success("Gambar dihapus");
                      }}
                      className="px-4 h-10 bg-red-600 text-white rounded-lg text-sm font-medium hover:bg-red-700 transition-colors focus:outline-none focus:ring-2 focus:ring-red-500/30 focus:ring-offset-2"
                    >
                      Hapus
                    </button>
                  </div>
                </div>
              </div>
            )}

            {!generatedImage && !loading && (
              <div className="flex items-center justify-center p-12 border-2 border-dashed border-gray-300 rounded-lg bg-gray-50 max-w-lg">
                <div className="text-center">
                  <svg
                    className="w-12 h-12 text-gray-400 mx-auto mb-2"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.5}
                      d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                    />
                  </svg>
                  <p className="text-gray-500 text-sm">
                    Gambar yang dibuat akan muncul di sini
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default GenerateImage;
