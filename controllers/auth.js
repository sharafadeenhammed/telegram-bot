import User from "../model/User.js";
import botReply from "../client/botReply.js";
import user from "./user.js";

const start = async (req, res, next) => {
  const data = req.body;
  const chatId = data?.message?.from.id || data?.callback_query?.from.id;
  const message =
    data?.message?.text ||
    data.callback_query.data ||
    data?.message?.from?.reply_to_message.text;
  const firstName =
    data?.message?.from?.first_name || data.callback_query?.from?.first_name;
  const lastName =
    data?.message?.from?.last_name || data.callback_query?.from?.last_name;
  const userName =
    data?.message?.from?.username || data.callback_query?.from?.username;

  console.log("text message: ", message);

  // check if user exists in database.
  const user = await User.findOne({ chatId });

  if (!user) {
    // prompt user to create an account.
    await botReply.botResponse({
      chat_id: chatId,
      resize_keyboard: true,
      one_time_keyboard: true,
      text: `hello ${userName} you are yet to have an account with us \n\nAbout Us: we sell user info here\n\nGet Started: get started by creating your account profile with us.`,
    });

    await botReply.botResponse({
      chat_id: chatId,
      resize_keyboard: true,
      one_time_keyboard: true,
      text: "create account",
      reply_markup: {
        keyboard: [
          [
            {
              text: "Create New Profile",
              callback_data: "create profile",
              request_contact: true,
            },
          ],
        ],
      },
    });
    return;
  }
  // prompt user to buy, sell, or fund wallet
  await botReply.botResponse({
    chat_id: chatId,
    resize_keyboard: true,
    one_time_keyboard: true,
    text: `welcome ${userName}`,
    reply_markup: {
      keyboard: [
        [
          {
            text: "fund wallet",
            callback_data: "fund wallet",
          },
          {
            text: "buy info",
            callback_data: "buy info",
          },
          {
            text: "check wallet balance",
            callback_data: "check balance",
          },
        ],
      ],
    },
  });
};

const createUser = async (req, res, next) => {
  const data = req.body;
  console.log(" data from create user: ", data);
  const chatId = data?.message?.from.id || data?.callback_query?.from.id;
  const userName =
    data?.message?.from?.username || data.callback_query?.from?.username;

  // add user to database
  await user.createUser(req, res, next);
  await botReply.botResponse({
    chat_id: chatId,
    resize_keyboard: true,
    one_time_keyboard: true,
    text: `welcome ${userName} we are happy to have you 🎉🎊`,
    reply_markup: {
      keyboard: [
        [
          {
            text: "check balance",
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
  start,
  createUser,
};
