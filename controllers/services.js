import botReply from "../client/botReply.js";
import keyboard from "../utility/keyboard.js"
import UserData from "../utility/UserData.js";
import { smsPva } from "../client/client.js";
import User from "../model/User.js";
import * as dataProcessor from "../utility/dataProcessor.js"
import * as smsPvaService from "./smspva.js"

export const rentOrOneTimeUseKeyboard = async (req, res, next) => {
  const userData = new UserData(req);
    const resData = await botReply.botResponse({
      chat_id: userData.chatId,
      text: "Do you want to rent or one time use ?",
      reply_markup: keyboard.rentOrOneTimeUse
    });
    
  res.status(200).json({ success: true });
};

export const getOtuNumber = async (req, res, next) => {

  const price = await smsPvaService.getOtuPrice(req, res, next);
  // check if price is available or not is available
  if (price.success === false) {
    await botReply.botErrorResponse(req, res, next, "error processing your request please try again");
    res.status(200).json({ success: true});
    return
  }
    
  const otuNumber = await smsPvaService.getOtuNumber(req, res, next);
  // check if number is available or not
  if (otuNumber.success === false) {
    await botReply.botErrorResponse(req, res, next, "It seems like the service youre trying to use is not available in the country you selected. Please select another country and try again");
    res.status(200).json({ success: true});
    return
  }
  const userData = new UserData(req);
  const user = await User.findOne({ chatId: userData.chatId });


  // check if user has enough balance
  if (price.price > user.balance && false) {
    await botReply.botErrorResponse(req, res, next, "you dont have enough balance to use this service, fund your wallet and try again");
    res.status(200).json({ success: true});
    return
  }

  user.otuNumber = `${otuNumber.CountryCode}${otuNumber.number}`;
  user.otuIssuedAt = new Date();
  await user.save();

  await botReply.botResponse({
    chat_id: userData.chatId,
    text: `Your ONE TIME USE number is ${otuNumber.CountryCode}${otuNumber.number} \if your did not get the OTP messages AUTOMATICALLY please check your profile for RECEIVED OTP messages.`,
    reply_markup: keyboard.mainKeyboard
  });

    

  res.status(200).json({ success: true});

  
};


