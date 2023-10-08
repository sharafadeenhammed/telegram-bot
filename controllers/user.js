import User from "../model/User.js";
import botReply from "../client/botReply.js";
import UserData from "../utility/UserData.js";

const createUser = async (req, res, next) => {
  const data = req.body;
  const userData = new UserData(req);
  const user = await User.create({
    chatId: userData.chatId,
    firstName: userData.firstName,
    lastName: userData.lastName,
    userName: userData.userName,
    phone: userData.phone,
  });
  return user;
};

const fundWallet = async (req, res, next, amount) => {
  const userData = new UserData(req);
  const user = User.findOne({ chatId: userData.chatId });
  user.balance = user.balance + amount;
  await user.save();
  return user;
};

const debitWallet = async (req, res, next, amount) => {
  const data = req.body;
  const userData = new UserData(req);
  const user = User.findOne({ chatId: userData.chatId });
  user.balance = user.balance - amount;
  await user.save();
  return user;
};

const getUserBalance = async (req, res, next) => {
  const userData = new UserData(req);
  const user = await User.findOne({ chatId: userData.chatId });
  botReply.botResponse({
    chat_id: userData.chatId,
    resize_keyboard: true,
    one_time_keyboard: true,
    text: `Your balance is ${user.balance.toLocaleString("en-US", {
      style: "currency",
      currency: "USD",
    })}`,
  });
};

export default {
  createUser,
  fundWallet,
  debitWallet,
  getUserBalance,
};
