import express from "express";

import bot from "../controllers/bot";
const { botRequest } = bot;

const router = express.Router();

router.post("/", botRequest);
