import User from "../model/User.js";
import botReply from "../client/botReply.js";
import UserData from "../utility/UserData.js";
import user from "./user.js";

const start = async (req, res, next) => {
  const userData = new UserData(req);

  // check if user exists in database.
  const user = await User.findOne({ chatId: userData.chatId });

  if (!user) {
    // prompt user to create an account.
    await botReply.botResponse({
      chat_id: userData.chatId,
      resize_keyboard: true,
      one_time_keyboard: true,
      text: `hello ${userName} you are yet to have an account with us \n\nAbout Us: we sell user info here\n\nGet Started: get started by creating your account profile with us.`,
    });

    await botReply.botResponse({
      chat_id: userData.chatId,
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
    chat_id: userData.chatId,
    resize_keyboard: true,
    one_time_keyboard: true,
    text: `welcome ${userData.userName}`,
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
        [
          {
            text: "check purchased documents",
            callback_data: "my documents",
          },
          {
            text: "about us ?",
            callback_data: "about us",
          },
          {
            text: "help",
            callback_data: "help",
          },
        ],
      ],
    },
  });
};

const createUser = async (req, res, next) => {
  const userData = new UserData(req);

  // add user to database
  await user.createUser(req, res, next);
  await botReply.botResponse({
    chat_id: userData.chatId,
    resize_keyboard: true,
    one_time_keyboard: true,
    text: `welcome ${userData.userName} we are happy to have you 🎉🎊`,
    reply_markup: {
      keyboard: [
        [
          {
            text: "check balance ",
            callback_data: "check balance",
          },
          {
            text: "fund wallet",
            callback_data: "fund wallet",
          },
          {
            text: "buy new document",
            callback_data: "buy info",
          },
        ],
        [
          {
            text: "check purchased documents",
            callback_data: "my documents",
          },
          {
            text: "about us ?",
            callback_data: "about us",
          },
          {
            text: "help",
            callback_data: "help",
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
