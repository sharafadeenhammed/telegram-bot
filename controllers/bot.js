import asyncHandeler from "express-async-handler";
import client from "../client/client.js";

//@ route  POST api/v1/bot/incoming
//@ Access Public
//@ desc receive message payload from bot
const botRequest = asyncHandeler(async (req, res, next) => {
  const data = req.body;
  console.log("request body object: ", data);
  try {
    const response = await client.post(process.env.BOT_REPLY_MESSSAGE_URL, {
      chat_id: data?.message?.from.id || data?.callback_query?.from.id,
      resize_keyboard: true,
      one_time_keyboard: true,
      text: `mirrowing: ${data?.message?.text || data.callback_query.data} `,
      reply_markup: {
        inline_keyboard: [
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
        ],
      },
    });
  } catch (error) {
    console.log("cannot procees bot request...", error);
  }
  res.status(200).json({ success: true });
});

const start = asyncHandeler(async (req, res, next) => {
  try {
    const response = await client.post(process.env.BOT_REPLY_MESSSAGE_URL, {
      chat_id: data?.message?.from.id || data?.callback_query?.from.id,
      resize_keyboard: true,
      one_time_keyboard: true,
      text: `mirrowing: ${data?.message?.text || data.callback_query.data} `,
      reply_markup: {
        inline_keyboard: [
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
        ],
      },
    });
  } catch (error) {
    console.log("start error: ", error);
  }
});

export default {
  botRequest,
};
