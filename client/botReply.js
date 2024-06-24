import client from "./client.js";
import UserData from "../utility/UserData.js";

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
    text: message || "invalid command",
  });
};

const yetToBeImplemented = async (req, res, next, msg) => {
  const user = new UserData(req);
  const text = msg || "invalid command";
  await invalidCommand(user.chatId, text);
  res.status(200).json({ success: true });
};

const botErrorResponse = async (req, res, next, msg) => {
  const user = new UserData(req);
  const text = msg || "invalid command";
  await invalidCommand(user.chatId, text);
  res.status(200).json({ success: true });
};

export default {
  botResponse,
  noAccountResponse,
  invalidCommand,
  yetToBeImplemented,
  botErrorResponse,
};
