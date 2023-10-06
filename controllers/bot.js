import asyncHandeler from "express-async-handler";
import auth from "./auth.js";
import user from "./user.js";

//@ route  POST api/v1/bot/incoming
//@ Access Public
//@ desc receive message payload from bot
const botRequest = asyncHandeler(async (req, res, next) => {
  const data = req.body;

  // initilizing conversation with user...
  if (message === "/start" || message === "start")
    await auth.start(req, res, next);

  // create user account...
  if (message === "create account") await auth.createUser(req, res, next);

  // display list of available user info...
  if (message === "buy info" || message == "/buyinfo")
    await auth.createUser(req, res, next);

  // check user wallet balance...
  if (message === "check balance" || message == "/checkbalance")
    await user.getUserBalance(req, res, next);

  // fund user wallet...
  if (message === "fund wallet" || message == "/fundwallet")
    await auth.createUser(req, res, next);

  res.status(200).json({ success: true });
});

export default {
  botRequest,
};
