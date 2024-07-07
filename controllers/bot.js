import express from "express";
import asyncHandeler from "express-async-handler";

import botCommands from "../utility/botCommands.js";
import countryData from "../data/countryList.js";
import serviceData from "../data/serviceList.js";
import auth from "./auth.js";
import user from "./user.js";
import document from "./document.js";
import UserData from "../utility/UserData.js";
import * as CountryServiceList from "./CountryService.js";
import botReply from "../client/botReply.js"
import * as service from "../controllers/services.js"
import User from "../model/User.js";



async function saveLastSentMessageId(currentUser, userData) {
  if (!currentUser?.chatId) return;
  const user = await User.findOne({ chatId: userData.chatId });
  await user.save();

    
}
//@ route  POST api/v1/bot/incoming
//@ Access Public
//@ desc receive message payload from bot
const botRequest = asyncHandeler(async (req, res, next) => {
  const userData = new UserData(req);
  const currentUser = await User.findOne({ chatId: userData.chatId });
  await botReply.deleteLastSentMessage(req, res, next, currentUser);
  // await botReply.deleteLastReceivedMessage(req, res, next, currentUser);
  if (currentUser?.chatId) 
    req.user = currentUser;

  // if (currentUser?.chatId) {
  //   currentUser.lastReceivedMessageId = userData.messageId;
  //   currentUser.save();
  // }
  // console.log(userData)

  
  // initilizing conversation with user...
  if (userData.message === "/start" || userData.message === "start") {
    await auth.start(req, res, next);
    return await saveLastSentMessageId(currentUser, userData);
  }

  // create user account...
  if (userData.message === "create account") {
    await auth.createUser(req, res, next);
    return await saveLastSentMessageId(currentUser, userData);
  }

  // display list of available user info...
  if (userData.message === "buy document" || userData.message == "/buyinfo") {
    await botReply.yetToBeImplemented(
      req,
      res,
      next,
      "sorry, this command is yet to be implemented it will be available soon"
    );
    return await saveLastSentMessageId(currentUser, userData);
  }

  // check user wallet balance...
  if (
    userData.message === "Check balance" ||
    userData.message == "/checkbalance"
  ) {
    await user.getUserBalance(req, res, next, currentUser);
    return await saveLastSentMessageId(currentUser, userData);
  }
  
  if (
    userData.message === "Profile details" ||
    userData.message === "/profile"
  ) {
    await user.profileDetails(req, res, next);
    return await saveLastSentMessageId(currentUser, userData);
  }

  // fund user wallet...
  if (userData.message === "Fund wallet" || userData.message == "/fundwallet") {
    await user.fundWallet(req, res, next, 10, currentUser);
    return await saveLastSentMessageId(currentUser, userData);

  }

  // show keyboard
  if (userData.message === "Show" || userData.message === "/show") {
    await auth.showKeyboard(req, res, next);
    return await saveLastSentMessageId(currentUser, userData);

  }

  // hide keyboard
  if (userData.message === "🔴Hide keyboard" || userData.message === "/hide") {
    await auth.hideKeyboard(req, res, next);
    return await saveLastSentMessageId(currentUser, userData);

  }

  if (userData.message === "About bot ?") {
    await auth.aboutBot(req, res, next);
    return await saveLastSentMessageId(currentUser, userData);    
  }

  if (userData.message === "Use a number") {
    await service.rentOrOneTimeUseKeyboard(req, res, next, currentUser);
    return await saveLastSentMessageId(currentUser, userData);
  }

  if (userData.message === "rent") {
    await service.rentalOptions(req, res, next, currentUser);
    return await saveLastSentMessageId(currentUser, userData);
  }

  if (userData.message === "otu") {
    await service.getOtuNumber(req, res, next, currentUser);
    return await saveLastSentMessageId(currentUser, userData);
  }
  
  
  if (userData.message === "week" || userData.message === "month") {
    await service.getRentalNumber(req, res, next, currentUser);
    return await saveLastSentMessageId(currentUser, userData);
  }
  
  if (userData.message === "Check countries available") {
    await CountryServiceList.listCountryAvailable(req, res, next, currentUser);
    return await saveLastSentMessageId(currentUser, userData);
  }
  
  if (userData.message === "Check services available") {
    await CountryServiceList.listServiceAvailable(req, res, next, currentUser);
    return await saveLastSentMessageId(currentUser, userData);
  }
  
  if (
    userData.message === "Select country" ||
    userData.message === "/country"
  ) {
    await CountryServiceList.countrySelect(req, res, next, currentUser);
    return await saveLastSentMessageId(currentUser, userData);
  }
  
  if (
    userData.message === "Select service" ||
    userData.message === "/service"
  ) {
    await CountryServiceList.serviceSelect(req, res, next, currentUser);
    return await saveLastSentMessageId(currentUser, userData);
  }

  if (userData.message === "Don't use this number") {
    await botReply.yetToBeImplemented(req, res, next, "sorry, this command is yet to be implemented it will be available soon");
    return await saveLastSentMessageId(currentUser, userData);
  }
  
  if (userData.message === "Use this number") {
    await botReply.yetToBeImplemented(req, res, next, "sorry, this command is yet to be implemented it will be available soon");
    return await saveLastSentMessageId(currentUser, userData);
  }
  
  if(countryData.find(data => data.value === String(userData.message).replace("/", "").replace(" ", ""))
  ) {
    await user.setUserCountry(req, res, next, currentUser);
    return await saveLastSentMessageId(currentUser, userData);
  }
  
  if (serviceData.find(data => data?.value === String(userData.message).replace("/", "").replace(" ", "")))
  {
    await user.setUserService(req, res, next, currentUser);
    return await saveLastSentMessageId(currentUser, userData);
  }

  if (!botCommands.includes(userData.message)) {
    await auth.invalidCommand(req, res, next);
    return await saveLastSentMessageId(currentUser, userData);
  }

  // set last received message id for user
  

});

export default {
  botRequest,
};
