import asyncHandeler from "express-async-handler";
import botReply from "../client/botReply.js";
import UserData from "../utility/UserData.js";
import keyboard from "../utility/keyboard.js";
import User from "../model/User.js";
import {
  countryPicker,
  servicePicker,
  listCountryAvilable,
  listServicesAvailable
} from "../utility/dataProcessor.js";

export const listCountryAvailable = async(req, res, next, currentUser) => {
  const userData = new UserData(req);
  const response = await botReply.botResponse({
    chat_id: userData.chatId,
    text: listCountryAvilable(),
    reply_markup: keyboard.mainKeyboard,
  });
  res.status(200).json({ success: true });
  const user = currentUser?.chatId ? currentUser : await User.findOne({ chatId: userData.chatId });
  if (!user) return;
  user.lastSentMessageId = response.data.result.message_id;
  await user.save();
};

export const listServiceAvailable =async  (req, res, next, currentUser) => {
  const userData = new UserData(req);
  const response = await botReply.botResponse({
    chat_id: userData.chatId,
    text: listServicesAvailable(),
    reply_markup: keyboard.mainKeyboard,
  });
  res.status(200).json({ success: true });
  const user = currentUser?.chatId ? currentUser : await User.findOne({ chatId: userData.chatId });
  if (!user) return;
  user.lastSentMessageId = response.data.result.message_id;
  await user.save();
};

export const countrySelect = async (req, res, next, currentUser) => {
  const userData = new UserData(req);
  const response = await botReply.botResponse({
    chat_id: userData.chatId,
    text: countryPicker(),
    reply_markup: keyboard.mainKeyboard,
  });
  res.status(200).json({ success: true });
  const user = currentUser?.chatId ? currentUser : await User.findOne({ chatId: userData.chatId });
  if (!user) return;
  user.lastSentMessageId = response.data.result.message_id;
  await user.save();
};

export const serviceSelect = async (req, res, next, currentUser) => {
  const userData = new UserData(req);
  const response = await botReply.botResponse({
    chat_id: userData.chatId,
    text: servicePicker(),
    reply_markup: keyboard.mainKeyboard,
  });
  res.status(200).json({ success: true });
  const user = currentUser?.chatId ? currentUser : await User.findOne({ chatId: userData.chatId });
  if (!user) return;
  user.lastSentMessageId = response.data.result.message_id;
  await user.save();
};

export const getServicePrice = () => {
  
}


