import User from "../model/User.js";

const createUser = async (req, res, next) => {
  const data = req.body;
  const user = await User.create({
    chatId: data?.message?.from?.chat_id,
    firstName: data?.message?.from?.firstName,
    lastName: data?.message?.from?.lastName,
    userName: data?.message?.from?.username,
    phone: data?.message?.contact?.phone_number,
  });
  console.log(user);
  return user;
};

export default {
  createUser,
};
