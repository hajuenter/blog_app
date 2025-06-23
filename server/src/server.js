import "dotenv/config";
import web from "../applications/web.js";

const PORT = process.env.PORT || 3000;

web.listen(PORT, () => {
  console.log("Server is running on port " + PORT);
});
