import User from "../model/User.js";
import botReply from "../client/botReply.js";

const createUser = async (req, res, next) => {
  const data = req.body;
  const user = await User.create({
    chatId: data?.message?.from?.id,
    firstName: data?.message?.from?.first_name,
    lastName: data?.message?.from?.last_name,
    userName: data?.message?.from?.username,
    phone: data?.message?.contact?.phone_number,
  });
  return user;
};

const fundWallet = async (req, res, next, amount) => {
  const data = req.body;
  const user = User.findOne({ chatId: data?.message?.from?.id });
  user.balance = user.balance + amount;
  await user.save();
};

const debitWallet = async (req, res, next, amount) => {
  const data = req.body;
  const user = User.findOne({ chatId: data?.message?.from?.id });
  user.balance = user.balance - amount;
  await user.save();
};

const getUserBalance = async (req, res, next) => {
  const data = req.body;
  const chatId = data?.message?.from.id || data?.callback_query?.from.id;
  const user = await User.findOne({ chatId: data?.message?.from?.id });
  console.log(user.balance);
  botReply.botResponse({
    chat_id: chatId,
    resize_keyboard: true,
    one_time_keyboard: true,
    text: `welcome ${userName}`,
    reply_markup: {
      keyboard: [
        [
          {
            text: "check balance ",
            callback_data: "check balance",
          },
          {
            text: "buy info",
            callback_data: "buy info",
          },
          {
            text: "fund wallet",
            callback_data: "fund wallet",
          },
        ],
      ],
    },
  });
};

export default {
  createUser,
  fundWallet,
  debitWallet,
  getUserBalance,
};
