import client from "./client.js";
import UserData from "../utility/UserData.js";
import User from "../model/User.js";
import keyboard from "../utility/keyboard.js";

const botResponse = async (data, req = null) => {
  try {
    return await client.post("/sendMessage", data);
  } catch (error) {
    console.log(error);
    console.log("client reply error: ",error?.data, error?.config?.url )
  }
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
    resize_keyboard: true,
    one_time_keyboard: true,
    reply_markup: keyboard.mainKeyboard,
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

const deleteMessage = async (chat_id, message_id) => {
  await client.get(process.env.BOT_DELETE_MESSAGE, {
    params: {
      chat_id,
      message_id
    }
  });
}

  const deleteLastSentMessage = async (req, res, next, currentUser) => {
    const userData = new UserData(req);
    const user = currentUser?.chatId ? currentUser : await User.findOne({ chatId: userData.chatId });
    if (!user?.lastSentMessageId) return
    try {
      await client.get(process.env.BOT_DELETE_MESSAGE, {
        params: {
          chat_id: userData.chatId,
          message_id: user.lastSentMessageId,
        }
      });
      
    } catch (error) {
      console.log("deleteLastSentMessage error: ",error?.data);
      
    }
    user.lastSentMessageId = null;
    await user.save();
}

const deleteLastReceivedMessage = async (req, res, next, currentUser) => {
  const userData = new UserData(req);
  // const user = await User.findOne({ chatId: userData.chatId });
  // if (!user?.lastReceivedMessageId) return;
  if(!currentUser?.lastReceivedMessageId) return
  try {
    await client.get(process.env.BOT_DELETE_MESSAGE, {
      params: {
        chat_id: userData.chatId,
        message_id: currentUser.lastReceivedMessageId,
      }
    });
    
  } catch (error) {
    console.log("deleteLastReceivedMessage error: ",error?.data);
  }
  currentUser.lastSentMessageId = null;
  await currentUser.save();
}

export default {
  botResponse,
  noAccountResponse,
  invalidCommand,
  yetToBeImplemented,
  botErrorResponse,
  deleteMessage,
  deleteLastSentMessage,
  deleteLastReceivedMessage
}
