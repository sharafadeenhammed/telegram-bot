import client from "./client.js";

const botResponse = async (data) => {
  return await client.post(process.env.BOT_REPLY_MESSSAGE_URL, data);
};

const noAccountResponse = async (chat_id) => {
  return await client.post(process.env.BOT_REPLY_MESSSAGE_URL, {
    chat_id,
    text: "you dont have an account /start",
  });
};
const invalidCommand = async (chat_id, message) => {
  return await client.post(process.env.BOT_REPLY_MESSSAGE_URL, {
    chat_id,
    text: "messgae",
  });
};

export default {
  botResponse,
  noAccountResponse,
  invalidCommand,
};
