export default {
  mainKeyboard: {
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
          text: "my documents",
          callback_data: "my documents",
        },
        {
          text: "about bot ?",
          callback_data: "about us",
        },
        {
          text: "🔴hide keyboard",
          callback_data: "hide",
        },
      ],
    ],
  },
  hideKeyboard: {
    hide_keyboard: true,
  },
  createProfileKeyboard: {
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
};
