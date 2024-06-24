import User from "../model/User.js";
import botReply from "../client/botReply.js";
import UserData from "../utility/UserData.js";
import countryList from "../data/countryList.js";
import serviceList from "../data/serviceList.js"

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

const fundWallet = async (req, res, next, amount) => {
  const userData = new UserData(req);
  const user = await User.findOne({ chatId: userData.chatId });
  if (!user) {
     await botReply.noAccountResponse(userData.chatId);
    res.status(200).json({ success: true });
    return;
  }
    
  await botReply.botResponse({
    chat_id: userData.chatId,
    text: `Fund your wallet by sending USDT TRC-20 to the address shown below \n\n  ${user.coinPaymentAddress}`,
  });
  res.status(200).json({ success: true });
};

const debitWallet = async (req, res, next, amount) => {
  const data = req.body;
  const userData = new UserData(req);
  const user = await User.findOne({ chatId: userData.chatId });
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

const getUserBalance = async (req, res, next) => {
  const userData = new UserData(req);
  const user = await User.findOne({ chatId: userData.chatId });
  if (!user) {
    await botReply.noAccountResponse(userData.chatId);
    res.status(200).json({ success: true });
    return;
  }
  await botReply.botResponse({
    chat_id: userData.chatId,
    resize_keyboard: true,
    one_time_keyboard: true,
    text: `Your balance is ${currencyFormater(user.balance)}`,
  });
  res.status(200).json({ success: true });
};

const profileDetails = async (req, res, next) => {
  req.dismiss = true;
  const userData = new UserData(req);
  const user = await User.findOne({ chatId: userData.chatId });
  if (!user) {
    await botReply.noAccountResponse(userData.chatId);
    res.status(200).json({ success: true });
    return
  }
  await botReply.botResponse({
    chat_id: userData.chatId,
    resize_keyboard: true,
    one_time_keyboard: true,
    text: `SELECTED COUNTRY: ${user.country || "null"}\n\nSELECTED SERVICE: ${user.service || "null"}\n\nCURRENT BALANCE: ${currencyFormater(user.balance)} \n\nONE TIME USE NUMBER: ${user.otuNumber || "null"}\n\nLAST RECEIVED OTP : ${user.receivedSms || "null"}`,
  });
  res.status(200).json({ success: true });
};

const setUserCountry = async (req, res, next) => {
  req.dismiss = true;
  const userData = new UserData(req);
  const user = await User.findOne({ chatId: userData.chatId });
  if (!user) {
    await botReply.noAccountResponse(userData.chatId);
    res.status(200).json({ success: true });
    req.dismiss = true;
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
  });
  res.status(200).json({ success: true });
};

const setUserService = async (req, res, next) => {
  const userData = new UserData(req);
  const user = await User.findOne({ chatId: userData.chatId });
  if (!user) {
    await botReply.noAccountResponse(userData.chatId);
    res.status(200).json({ success: true });
    req.dismiss = true;
    return
  }
  const service = serviceList.find(data => data?.value === String(userData.message).replace("/", "").replace(" ", ""));

  if (!service) return
  if (!user) return await botReply.noAccountResponse(userData.chatId);
  await botReply.botResponse({
    chat_id: userData.chatId,
    resize_keyboard: true,
    one_time_keyboard: true,
    text: `${service.name} has been set as your service\nthis service will be used whenever you request for OTP CODE \nyou can always change it by using the "select service" button or the /service command`,
  });
  user.service = service.name;
  await user.save();
  req.dismiss = true;
  res.status(200).json({ success: true });
};

const currencyFormater = (amount) => {
  return `USDT ${parseFloat(amount).toFixed(2)}`
};

export default {
  createUser,
  fundWallet,
  debitWallet,
  getUserBalance,
  setUserCountry,
  setUserService,
  profileDetails,
};
