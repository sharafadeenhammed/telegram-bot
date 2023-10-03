class ErrrorResponse extends Error {
  constructor(message, chatId) {
    this.chatId = chatId;
    super(message);
  }
}

export default ErrrorResponse;
