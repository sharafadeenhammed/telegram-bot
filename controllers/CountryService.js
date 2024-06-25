import asyncHandeler from "express-async-handler";
import botReply from "../client/botReply.js";
import UserData from "../utility/UserData.js";
import keyboard from "../utility/keyboard.js";
import {
  countryPicker,
  servicePicker,
  listCountryAvilable,
  listServicesAvailable
} from "../utility/dataProcessor.js";

export const listCountryAvailable = async(req, res, next) => {
  const userData = new UserData(req);
  await botReply.botResponse({
    chat_id: userData.chatId,
    text: listCountryAvilable(),
    reply_markup: keyboard.mainKeyboard,
  });
  res.status(200).json({ success: true });
};

export const listServiceAvailable =async  (req, res, next) => {
  const userData = new UserData(req);
  await botReply.botResponse({
    chat_id: userData.chatId,
    text: listServicesAvailable(),
    reply_markup: keyboard.mainKeyboard,
  });
  res.status(200).json({ success: true });
};

export const countrySelect = async (req, res, next) => {
  req.dismiss = true;
  const userData = new UserData(req);
  await botReply.botResponse({
    chat_id: userData.chatId,
    text: countryPicker(),
    reply_markup: keyboard.mainKeyboard,
  });
  res.status(200).json({ success: true });
};

export const serviceSelect = async (req, res, next) => {
  req.dismiss = true;
  const userData = new UserData(req);
  await botReply.botResponse({
    chat_id: userData.chatId,
    text: servicePicker(),
    reply_markup: keyboard.mainKeyboard,
  });
  res.status(200).json({ success: true });
};

export const getServicePrice = () => {
  
}


