import Document from "../model/Document.js";

const findUserDocuments = async (userId) => {
  const documents = await Document.find({ userChatId });
  console.log(documents);
  return documents;
};

const yetToBeImplemented = async (req, res, next, msg = "") => {
  const user = new UserData(req);
  text =
    msg ||
    "sorry, this command is yet to be implemented it will be available soon";
  await botReply.invalidCommand(user.chatId, text);
};

export default {
  findUserDocuments,
  yetToBeImplemented,
};
