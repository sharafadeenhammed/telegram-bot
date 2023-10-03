import client from "./client.js";

const botResponse = async (data) => {
  return client.post(process.env.BOT_REPLY_MESSSAGE_URL, data);
};

export default {
  botResponse,
};
