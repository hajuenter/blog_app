import { mainWithSystem as deepseek } from "../configs/gemini.js";

export const botSend = async (req, res) => {
  const { prompt } = req.body;
  if (!prompt) {
    return res.json({
      success: false,
      message: "Prompt tidak boleh kosong",
    });
  }

  const intents = [
    {
      name: "introduce",
      keywords: [
        "nama",
        "siapa nama",
        "namamu siapa",
        "nama kamu",
        "boleh tahu nama",
        "kenalin diri",
        "perkenalkan diri",
        "namanya siapa",
      ],
      response:
        "Perkenalkan, saya Hajuenter AI, asisten cerdas yang dikembangkan oleh Bahrul. Saya hadir untuk membantu Anda dengan informasi dan jawaban terbaik.",
    },
    {
      name: "greeting",
      keywords: ["halo", "hai", "hello", "hi", "assalamualaikum"],
      response:
        "Halo! Saya adalah asisten virtual Hajuenter AI yang ditenagai oleh DeepSeek AI. Ada yang bisa saya bantu hari ini?",
    },
    {
      name: "ask_role",
      keywords: [
        "kamu",
        "siapa kamu",
        "kamu siapa",
        "apa kamu",
        "asisten apa",
        "fungsi kamu",
      ],
      response:
        "Saya adalah asisten virtual dari Hajuenter AI, dirancang untuk menjawab pertanyaan dan membantu Anda secara cerdas. Pengembang saya adalah Bahrul.",
    },
    {
      name: "about_developer",
      keywords: [
        "kenalan dengan developer",
        "siapa pembuatmu",
        "siapa yang buat kamu",
        "developer kamu siapa",
        "yang bikin kamu siapa",
        "siapa yang mengembangkan kamu",
        "boleh kenalan dengan pembuatmu",
        "kontak developer",
        "hubungi pembuat",
        "hubungi pengembang",
      ],
      response:
        "Tentu! Kamu bisa menghubungi developer saya, Bahrul, melalui Instagram di @shusui_songolas atau melalui GitHub di https://github.com/hajuenter.",
    },
    {
      name: "gratitude",
      keywords: [
        "terima kasih",
        "thanks",
        "makasih",
        "makasi",
        "thank you",
        "oke",
        "ya",
      ],
      response:
        "Sama-sama! Senang bisa membantu 😊 Jika ada lagi yang ingin kamu tanyakan, silakan ya.",
    },
    {
      name: "farewell",
      keywords: [
        "dadah",
        "sampai jumpa",
        "bye",
        "goodbye",
        "see you",
        "selamat tinggal",
      ],
      response: "Sampai jumpa! Semoga harimu menyenangkan 👋",
    },
    {
      name: "help",
      keywords: [
        "saya butuh bantuan",
        "bantu saya",
        "tolong",
        "bantuan",
        "butuh bantuan",
        "help me",
        "need help",
      ],
      response:
        "Tentu! Silakan tanyakan apa yang ingin kamu ketahui atau butuhkan.",
    },
    {
      name: "birthday_wish",
      keywords: [
        "hari ulang tahun",
        "ulang tahun saya",
        "happy birthday",
        "selamat ulang tahun",
      ],
      response:
        "Selamat ulang tahun! 🎉 Semoga panjang umur, sehat selalu, dan segala keinginanmu tercapai.",
    },
  ];

  function matchIntent(prompt) {
    const lowerPrompt = prompt.toLowerCase();
    for (const intent of intents) {
      const matched = intent.keywords.some((keyword) =>
        lowerPrompt.includes(keyword),
      );
      if (matched) {
        return intent.response;
      }
    }
    return null;
  }

  const customResponse = matchIntent(prompt);
  if (customResponse) {
    return res.json({
      success: true,
      result: customResponse,
    });
  }

  const systemPrompt =
    "Jawablah secara ringkas, jelas, dan profesional. Jika perlu berikan contoh singkat saja jangan panjang-panjang. Gunakan bahasa yang mudah dimengerti.";

  try {
    const result = await deepseek(prompt, systemPrompt);
    res.json({
      success: true,
      result,
    });
  } catch (error) {
    res.json({
      success: false,
      message: error.message,
    });
  }
};
