class UserData {
  constructor(req) {
    const data = req.body;
    this.chatId = data?.message?.from.id || data?.callback_query?.from.id;
    this.message =
      data?.message?.text ||
      data?.callback_query?.data ||
      data?.message?.reply_to_message?.text ||
      "no message"
    this.firstName =
      data?.message?.from?.first_name || data.callback_query?.from?.first_name;
    this.lastName =
      data?.message?.from?.last_name || data.callback_query?.from?.last_name;
    this.userName =
      data?.message?.from?.username || data.callback_query?.from?.username;
    this.phone = data?.message?.contact?.phone_number || null;
  }
}

export default UserData;
