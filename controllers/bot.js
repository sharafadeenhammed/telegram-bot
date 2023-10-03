import asyncHandeler from "express-async-handler";
import client from "../client/client.js";
import auth from "./auth.js";
import user from "./user.js";

//@ route  POST api/v1/bot/incoming
//@ Access Public
//@ desc receive message payload from bot
const botRequest = asyncHandeler(async (req, res, next) => {
  const data = req.body;
  console.log("logging data from bot request: ", data);
  const chatId = data?.message?.from.id || data?.callback_query?.from.id;
  const message =
    data?.message?.text ||
    data?.callback_query?.data ||
    data?.message?.reply_to_message.text;
  if (message === "/start" || message === "start")
    await auth.start(req, res, next);
  if (message === "create account") await auth.createUser(req, res, next);

  res.status(200).json({ success: true });
});

export default {
  botRequest,
};
