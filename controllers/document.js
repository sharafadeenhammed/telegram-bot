import Document from "../model/Document.js";

const findUserDocuments = async (userId) => {
  const documents = await Document.find({ userChatId });
  console.log(documents);
  return documents;
};

export default {
  findUserDocuments,
};
