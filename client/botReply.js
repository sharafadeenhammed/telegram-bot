import client from "./client.js";

const botResponse = async (data) => {
  return client.post(process.env.BOT_REPLY_MESSSAGE_URL, data);
};

const noAccountResponse = async (chat_id) => {
  return client.post(process.env.BOT_REPLY_MESSSAGE_URL, {
    chat_id,
    text: "you dont have an account /start",
  });
};

export default {
  botResponse,
  noAccountResponse,
};
