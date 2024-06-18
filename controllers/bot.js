import express from "express";
import asyncHandeler from "express-async-handler";

import botCommands from "../utility/botCommands.js";
import countryData from "../data/countryList.js";
import serviceData from "../data/serviceList.js";
import auth from "./auth.js";
import user from "./user.js";
import document from "./document.js";
import UserData from "../utility/UserData.js";
import * as serviceList from "../controllers/serviceList.js";



//@ route  POST api/v1/bot/incoming
//@ Access Public
//@ desc receive message payload from bot
const botRequest = asyncHandeler(async (req, res, next) => {
  const userData = new UserData(req);
  console.log(userData.message)

  // initilizing conversation with user...
  if (userData.message === "/start" || userData.message === "start")
    await auth.start(req, res, next);

  // create user account...
  if (userData.message === "create account")
    await auth.createUser(req, res, next);

  // display list of available user info...
  if (userData.message === "buy document" || userData.message == "/buyinfo")
    await document.yetToBeImplemented(
      req,
      res,
      next,
      "sorry, this command is yet to be implemented it will be available soon"
    );

  // check user wallet balance...
  if (
    userData.message === "Check balance" ||
    userData.message == "/checkbalance"
  )
    await user.getUserBalance(req, res, next);
  
  if(userData.message === "Profile details") await user.profileDetails(req, res, next);

  // fund user wallet...
  if (userData.message === "Fund wallet" || userData.message == "/fundwallet")
    await user.fundWallet(req, res, next, 10);

  // show keyboard
  if (userData.message === "Show" || userData.message === "/show")
    await auth.showKeyboard(req, res, next);

  // hide keyboard
  if (userData.message === "🔴Hide keyboard" || userData.message === "/hide")
    await auth.hideKeyboard(req, res, next);

  if (userData.message === "About bot ?") await auth.aboutBot(req, res, next);

  if (userData.message === "Use a number") await document.yetToBeImplemented(req, res, next, "sorry, this command is yet to be implemented it will be available soon");
  
  if (userData.message === "Check countries available") await serviceList.listCountryAvailable(req, res, next);
  
  if (userData.message === "Check services available") await serviceList.listServiceAvailable(req, res, next);
  
  if (
    userData.message === "Select country" ||
    userData.message === "/country"
  ) await serviceList.countrySelect(req, res, next);
  
  if (
    userData.message === "Select service" ||
    userData.message === "/service"
  ) await serviceList.serviceSelect(req, res, next);

  if(userData.message === "Don't use this number") await document.yetToBeImplemented(req, res, next, "sorry, this command is yet to be implemented it will be available soon");
  
  if (userData.message === "Use this number") await document.yetToBeImplemented(req, res, next, "sorry, this command is yet to be implemented it will be available soon");
  
  if(countryData.find(data => data.value === String(userData.message).replace("/", "").replace(" ", ""))
  ) await user.setUserCountry(req, res, next);
  
  if (serviceData.find(data => data?.value === String(userData.message).replace("/", "").replace(" ", "")))
    await user.setUserService(req, res, next);

  if (!botCommands.includes(userData.message)) await auth.invalidCommand(req, res, next);
});

export default {
  botRequest,
};
