import asyncHandeler from "express-async-handler";
import client from "../client/client.js";

//@ route  POST api/v1/bot/incoming
//@ Access Public
//@ desc receive message payload from bot
const botRequest = asyncHandeler(async (req, res, next) => {
  const data = req.body;
  try {
    const response = await client.post(process.env.BOT_REPLY_MESSSAGE_URL, {
      chat_id: 1110216936,
      text: `mirrow: ${data.message}`,
    });
    res.status(200).json(response.data);
  } catch (error) {
    res.status(400).json({ success: false });
  }
});

export default {
  botRequest,
};
