import client from "../client/client.js";

const errorHandeler = async (errorData, req, res, next) => {
  console.log("error stack:", errorData.stack);
  const data = req.body;
  const chatId = data?.message?.from?.id || data?.callback_query?.from?.id;
  res.status(200).json({
    chat_id: data.chatId,
    text: data.message,
  });
  try {
    client.post(process.env.BOT_REPLY_MESSSAGE_URL, {
      chat_id: chatId,
      text: errorData?.message,
    });
  } catch (error) {
    console.log("error from error handeler: ");
  }
};

export default errorHandeler;
