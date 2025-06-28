import express from "express";
import { botSend } from "../controllers/botController.js";

const botRouter = express.Router();

botRouter.post("/send", botSend);

export default botRouter;
