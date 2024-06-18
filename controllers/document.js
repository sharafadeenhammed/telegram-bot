import Document from "../model/Document.js";
import UserData from "../utility/UserData.js";
import botReply from "../client/botReply.js";

const findUserDocuments = async (userId) => {
  const documents = await Document.find({ userChatId });
  console.log(documents);
  return documents;
};

const yetToBeImplemented = async (req, res, next, msg) => {
  const user = new UserData(req);
  const text = msg || "invalid command";
  await botReply.invalidCommand(user.chatId, text);
  res.status(200).json({ success: true });
};

export default {
  findUserDocuments,
  yetToBeImplemented,
};
