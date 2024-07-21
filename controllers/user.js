import User from "../model/User.js";
import botReply from "../client/botReply.js";
import UserData from "../utility/UserData.js";
import countryList from "../data/countryList.js";
import serviceList from "../data/serviceList.js";
import keyboard from "../utility/keyboard.js";
import Moment from "moment";
import * as smsPvaService from "../controllers/smspva.js";

const createUser = async (req, res, next) => {
  const data = req.body;
  const userData = new UserData(req);
  const user = await User.create({
    chatId: userData.chatId,
    firstName: userData.firstName || "user",
    lastName: userData.lastName || " ",
    userName: userData.userName || " user",
    phone: userData.phone,
    coinPaymentAddress: req.address.address
  });
  return user;
};

const fundWallet = async (req, res, next, amount, currentUser) => {
  const userData = new UserData(req);
  const user = currentUser?.chatId? currentUser : await User.findOne({ chatId: userData.chatId });
  if (!user) {
     await botReply.noAccountResponse(userData.chatId);
    res.status(200).json({ success: true });
    return;
  }
    
  await botReply.botResponse({
    chat_id: userData.chatId,
    resize_keyboard: true,
    one_time_keyboard: true,
    reply_markup: keyboard.mainKeyboard,
    text: `Fund your wallet by sending USDT TRC-20 to the address shown below \n\n  ${user.coinPaymentAddress}`,
  });
  res.status(200).json({ success: true });
};

const debitWallet = async (req, res, next, amount, currentUser) => {
  const data = req.body;
  const userData = new UserData(req);
  const user = currentUser?.chatId? currentUser : await User.findOne({ chatId: userData.chatId });
  if (!user) {
    await botReply.noAccountResponse(userData.chatId);
    res.status(200).json({ success: true });
    return;
  }
  user.balance = user.balance - amount;
  await user.save();
  res.status(200).json({ success: true });
  return user;
};

const getUserBalance = async (req, res, next, currentUser) => {
  const userData = new UserData(req);
  const user = currentUser?.chatId? currentUser : await User.findOne({ chatId: userData.chatId });
  if (!user) {
    await botReply.noAccountResponse(userData.chatId);
    res.status(200).json({ success: true });
    return;
  }
  await botReply.botResponse({
    chat_id: userData.chatId,
    resize_keyboard: true,
    one_time_keyboard: true,
    reply_markup: keyboard.mainKeyboard,
    text: `Your balance is ${currencyFormater(user.balance)}`,
  });
  res.status(200).json({ success: true });
};

const profileDetails = async (req, res, next, currentUser) => {
  const userData = new UserData(req);
  const user = currentUser?.chatId? currentUser : await User.findOne({ chatId: userData.chatId });
  if (!user) {
    await botReply.noAccountResponse(userData.chatId);
    res.status(200).json({ success: true });
    return
  }
  const now = Moment();
  let otuMessage = "";
  const otuIssuedAt = user.otuIssuedAt ? Moment(user.otuIssuedAt) : null;
  const otuDiff =  otuIssuedAt ? now.diff(otuIssuedAt, "minutes") : null
  const otuNumberActive =  otuDiff!==null && (otuDiff < 11) ? true : false;
  console.log(otuNumberActive, otuDiff, user.otuIssuedAt);
  if (otuNumberActive === true) {
    console.log("running api call to get otu message");
    const otuMessageFromApiCall = await smsPvaService.getOtuTextMessage(req, res, next);
    console.log(otuMessageFromApiCall);
    if (otuMessageFromApiCall.success === true) {
      otuMessage = otuMessageFromApiCall.text
      user.otuReceivedSms = otuMessage;
      user.otuExpired = true;
      user.otuIssuedAt = null;
      user.balance = user.balance - user.otuSercicePrice;
    }
  }
  const until = user.rentalServiceValidTill ? Moment(new Date(parseInt(user.rentalServiceValidTill))) : null;
  const rentalDiff = until ? until.diff(now, "days") : 0;
  console.log("rentalDiff: ", rentalDiff);
  const isRentalServiceActive = rentalDiff > 0 ? true : false;

  if ( isRentalServiceActive) { 
    console.log("running api call to get rental message");
    const rentalMessage = await smsPvaService.getRentalMessages(req, res, next, user);
  }

  const resData = await botReply.botResponse({
    chat_id: userData.chatId,
    resize_keyboard: true,
    one_time_keyboard: true,
    reply_markup: keyboard.mainKeyboard,
    text: `SELECTED COUNTRY: ${user.country || "null"}\n\nSELECTED SERVICE: ${user.service || "null"}\n\nCURRENT BALANCE: ${currencyFormater(user.balance)} \n\nONE TIME USE NUMBER: \n ${otuNumberActive ? user.otuNumber + " (Active " + String(11 - otuDiff) + "min left)" : "  🔴No active OTU number🔴!"}\n\nLAST RECEIVED OTP from OTU number : ${user.otuReceivedSms || "null"} \n\n ${isRentalServiceActive ? "RENTED NUMBER: " + user.rentedNumber + "\n Valid till: " + until?.format("YYYY-MM-DD") : "🔴No active RENTED number🔴"}\n All messages from Rented Number:\n`,
  });
  // const message_id = resData.data.result.message_id
  // user.lastMessageId = message_id;
  if (otuNumberActive === false) {
    user.otuExpired = true;
    user.otuIssuedAt = null;
  }
  await user.save() 
  res.status(200).json({ success: true });

};

const setUserCountry = async (req, res, next, currentUser) => {
  const userData = new UserData(req);
  const user = currentUser?.chatId? currentUser : await User.findOne({ chatId: userData.chatId });
  if (!user) {
    await botReply.noAccountResponse(userData.chatId);
    res.status(200).json({ success: true });
    return
  }
  const country = countryList.find(data => data.value === String(userData.message).replace("/", "").replace(" ", ""));
  if (!country) return;
  user.country = country.country;
  await user.save();
  if (!user) return await botReply.noAccountResponse(userData.chatId);
  await botReply.botResponse({
    chat_id: userData.chatId,
    resize_keyboard: true,
    one_time_keyboard: true,
    text: `${country.country} has been set as your country\nthis country will be used as the country of your service\nyou can always change it by using the "select country" button or the /country command`,
    reply_markup: keyboard.mainKeyboard
  });
  res.status(200).json({ success: true });
};

const setUserService = async (req, res, next, currentUser) => {
  const userData = new UserData(req);
  const user = currentUser?.chatId? currentUser : await User.findOne({ chatId: userData.chatId });
  if (!user) {
    await botReply.noAccountResponse(userData.chatId);
    res.status(200).json({ success: true });
    return
  }
  const service = serviceList.find(data => data?.value === String(userData.message).replace("/", "").replace(" ", ""));

  if (!service) return
  if (!user) return await botReply.noAccountResponse(userData.chatId);
  await botReply.botResponse({
    chat_id: userData.chatId,
    resize_keyboard: true,
    one_time_keyboard: true,
    reply_markup: keyboard.mainKeyboard,
    text: `${service.name} has been set as your service\nthis service will be used whenever you request for OTP CODE \nyou can always change it by using the "select service" button or the /service command`,
  });
  user.service = service.name;
  await user.save();
  res.status(200).json({ success: true });
};

export const currencyFormater = (amount) => {
  return `USDT ${parseFloat(amount).toFixed(2)}`
};

const alertAdmin = async (type = "warning", message="") => {
  const admins = await User.find({ role: "admin" });
  const adminPromise = admins.map(async (item) => {
    return await botReply.botResponse({
      chat_id: item.chatId,
      resize_keyboard: true,
      one_time_keyboard: true,
      text: `${message}`,
      reply_markup: keyboard.mainKeyboard
    });
  })
  const all = Promise.all(adminPromise);
}
 

export default {
  createUser,
  fundWallet,
  debitWallet,
  getUserBalance,
  setUserCountry,
  setUserService,
  profileDetails,
  currencyFormater,
  alertAdmin
};
