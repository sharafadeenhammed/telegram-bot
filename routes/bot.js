import express from "express";

import bot from "../controllers/bot.js";
const { botRequest } = bot;

const router = express.Router();

router.post("/incoming", botRequest);

export default router;
