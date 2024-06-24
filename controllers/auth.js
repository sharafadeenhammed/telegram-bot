import User from "../model/User.js";
import botReply from "../client/botReply.js";
import UserData from "../utility/UserData.js";
import user from "./user.js";
import keyboard from "../utility/keyboard.js";
import { getAddress } from "../utility/coinpPayments.js"

const start = async (req, res, next) => {
  const userData = new UserData(req);
  // check if user exists in database.
  const user = await User.findOne({ chatId: userData.chatId });

  if (!user) {
    // prompt user to create an account.
    await botReply.botResponse({
      chat_id: userData.chatId,
      text: `hello ${userData.userName} you are yet to have an account with us \n\nAbout Us: we sell user info here\n\nGet Started: get started by creating your account profile with us.`,
    });

    await botReply.botResponse({
      chat_id: userData.chatId,
      resize_keyboard: true,
      one_time_keyboard: true,
      text: "create account",
      reply_markup: keyboard.createProfileKeyboard,
    });
    res.status(200).json({ success: true });
    return;
  }
  // prompt user to buy, sell, or fund wallet
  await botReply.botResponse({
    chat_id: userData.chatId,
    resize_keyboard: true,
    text: `welcome ${userData.userName || "User"}`,
    reply_markup: keyboard.mainKeyboard,
  });
  res.status(200).json({ success: true });
};

const createUser = async (req, res, next) => {
  const userData = new UserData(req);
  const address = await getAddress("USDT", userData.chatId);
  req.address = address
  // add user to database
  await user.createUser(req, res, next);
  await botReply.botResponse({
    chat_id: userData.chatId,
    resize_keyboard: true,
    one_time_keyboard: true,
    text: `welcome ${userData.userName} we are happy to have you 🎉🎊`,
    reply_markup: keyboard.mainKeyboard,
  });
  res.status(200).json({ success: true });
};

const showKeyboard = async (req, res, next) => {
  const userData = new UserData(req);
  await botReply.botResponse({
    chat_id: userData.chatId,
    resize_keyboard: true,
    text: `🟢 keyboard opened 🟢`,
    reply_markup: keyboard.mainKeyboard,
  });
  res.status(200).json({ success: true });
};

const hideKeyboard = async (req, res, next) => {
  const userData = new UserData(req);
  await botReply.botResponse({
    chat_id: userData.chatId,
    text: "🔴 keyboard closed /show keyboard 🔴",
    reply_markup: keyboard.hideKeyboard,
  });
  res.status(200).json({ success: true });
};

const invalidCommand = async (req, res, next) => {
  if(req.dismiss === true) return
  const userData = new UserData(req);
  await botReply.botResponse({
    chat_id: userData.chatId,
    text: "invalid command or command yet to be implemented",
    reply_markup: keyboard.mainKeyboard,
  });
  res.status(200).json({ success: true });
};

const aboutBot = async (req, res, next) => {
  const userData = new UserData(req);
  await botReply.botResponse({
    chat_id: userData.chatId,
    text: "Our Text Message Bot streamlines otp code generation by automatically generating and forwarding YOUR OTP CODE to you. \nKey features include \n 1. seamless otp code \n 2. advanced filtering \n 3. automatic number generation. \nStart using our bot today to simplify and improve your otp code receiving workflow.",
    reply_markup: keyboard.mainKeyboard,
  });
  res.status(200).json({ success: true });
};

export default {
  start,
  createUser,
  showKeyboard,
  hideKeyboard,
  invalidCommand,
  aboutBot
};
