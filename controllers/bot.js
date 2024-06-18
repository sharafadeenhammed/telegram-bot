import express from "express";

import botCommands from "../utility/botCommands.js";
import asyncHandeler from "express-async-handler";
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
    userData.message === "check balance" ||
    userData.message == "/checkbalance"
  )
    await user.getUserBalance(req, res, next);

  // fund user wallet...
  if (userData.message === "fund wallet" || userData.message == "/fundwallet")
    await user.fundWallet(req, res, next, 10);

  // show keyboard
  if (userData.message === "show" || userData.message === "/show")
    await auth.showKeyboard(req, res, next);

  // hide keyboard
  if (userData.message === "🔴hide keyboard" || userData.message === "/hide")
    await auth.hideKeyboard(req, res, next);

  if (userData.message === "about bot ?") await auth.aboutBot(req, res, next);

  if (userData.message === "use a number") await document.yetToBeImplemented(req, res, next, "sorry, this command is yet to be implemented it will be available soon");
  
  if (userData.message === "check countries available") await serviceList.listCountryAvailable(req, res, next);
  
  if (userData.message === "check services available") await serviceList.listServiceAvailable(req, res, next);
  
  if(userData.message === "select country") await serviceList.countrySelect(req, res, next);
  
  if (userData.message === "select service") await serviceList.serviceSelect(req, res, next);

  if(userData.message === "don't use number") await document.yetToBeImplemented(req, res, next, "sorry, this command is yet to be implemented it will be available soon");
  
  if(userData.message === "use this number") await document.yetToBeImplemented(req, res, next, "sorry, this command is yet to be implemented it will be available soon");

  if (!botCommands.includes(userData.message)) await auth.invalidCommand(req, res, next);
  res.status(200).json({ success: true });
});

export default {
  botRequest,
};
