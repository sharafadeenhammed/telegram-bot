import asyncHandeler from "express-async-handler";
import client from "../client/client.js";

//@ route  POST api/v1/bot/incoming
//@ Access Public
//@ desc receive message payload from bot
const botRequest = asyncHandeler(async (req, res, next) => {
  const data = req.body;
  console.log("bot request received...", data);
  try {
    const response = await client.post(process.env.BOT_REPLY_MESSSAGE_URL, {
      chat_id: 1110216936,
      resize_keyboard: true,
      text: "hello there...",
      reply_markup: {
        keyboard: [
          [
            {
              text: "Yes",
              callback_data: "btn_yes",
            },
            {
              text: "No",
              callback_data: "btn_no",
            },
          ],
          [
            {
              text: "good",
              callback_data: "btn_good",
            },
            {
              text: "okay",
              callback_data: "btn_okay",
            },
          ],
        ],
      },
    });
  } catch (error) {
    console.log("cannot procees bot request...", error);
  }
});

export default {
  botRequest,
};
