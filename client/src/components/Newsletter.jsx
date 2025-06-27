import React, { useState } from "react";
import emailjs from "@emailjs/browser";
import toast from "react-hot-toast";

function Newsletter() {
  const [email, setEmail] = useState("");
  const [isSending, setIsSending] = useState(false);

  const serviceID = import.meta.env.VITE_EMAILJS_SERVICE_ID;
  const templateID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
  const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

  const validateEmail = (email) => {
    const gmailRegex = /^[a-zA-Z0-9._%+-]+@gmail\.com$/;
    return gmailRegex.test(email);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateEmail(email)) {
      toast.error("Masukkan email Gmail yang valid.");
      return;
    }

    const templateParams = {
      from_email: email,
      to_email: "esjeruk517@gmail.com",
    };
    setIsSending(true);
    try {
      await emailjs.send(serviceID, templateID, templateParams, publicKey);
      toast.success("Berhasil mengirim! Terima kasih.");
      setEmail("");
    } catch (error) {
      console.error(error);
      toast.error("Gagal mengirim email.");
    } finally {
      setIsSending(false);
    }
  };

  return (
    <div className="flex flex-col sm:px-0 px-3 items-center justify-center text-center space-y-2 mt-20 mb-32">
      <h1 className="md:text-4xl text-2xl font-semibold">
        Jangan Lewatkan Blog Terbaru
      </h1>
      <p className="md:text-lg text-gray-500/70 pb-8">
        Berlangganan untuk mendapatkan blog terbaru, teknologi terkini, dan
        berita eksklusif.
      </p>
      <form
        className="flex items-center justify-between max-w-2xl w-full md:h-13 h-12"
        onSubmit={handleSubmit}
      >
        <input
          className="border border-gray-300 rounded-md h-full border-r-0 outline-none w-full rounded-r-none px-4 lg:px-3 text-gray-500"
          type="email"
          placeholder="Masukkan email Anda"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <button
          type="submit"
          disabled={isSending}
          className={`md:px-12 px-3 lg:px-8 h-full text-white transition-all rounded-md rounded-l-none
    ${
      isSending
        ? "bg-gray-400 cursor-not-allowed"
        : "bg-primary/80 hover:bg-primary"
    }`}
        >
          {isSending ? "Mengirim..." : "Berlangganan"}
        </button>
      </form>
    </div>
  );
}

export default Newsletter;
