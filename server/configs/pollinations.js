import axios from "axios";
import imageKit from "./imageKit.js";

async function generateImage(prompt) {
  const width = 1280;
  const height = 720;
  const seed = Math.floor(Math.random() * 1000000);
  const model = "flux";

  const imageUrl = `https://pollinations.ai/p/${encodeURIComponent(
    prompt
  )}?width=${width}&height=${height}&seed=${seed}&model=${model}`;

  const response = await axios.get(imageUrl, { responseType: "arraybuffer" });

  const fileName = `temp-generated-${Date.now()}.jpg`;

  const uploadResponse = await imageKit.upload({
    file: Buffer.from(response.data),
    fileName: fileName,
    folder: "/temp-generated",
    tags: ["temporary", "generated"],
  });

  const optimizedImageUrl = imageKit.url({
    path: uploadResponse.filePath,
    transformation: [
      { quality: "auto" },
      { format: "webp" },
      { width: "1280" },
    ],
  });

  return {
    imageUrl: optimizedImageUrl,
    fileId: uploadResponse.fileId,
    filePath: uploadResponse.filePath,
  };
}

async function deleteTemporaryImage(fileId) {
  try {
    await imageKit.deleteFile(fileId);
    return true;
  } catch (error) {
    console.error("Error deleting temporary image:", error);
    return false;
  }
}

export { generateImage, deleteTemporaryImage };
