export default {
  mainKeyboard: {
    keyboard: [
      [
        {
          text: "check balance ",
        },
        {
          text: "fund wallet",
        },
        {
          text: "buy document",
        },
      ],
      [
        {
          text: "my documents",
        },
        {
          text: "about bot ?",
        },
        {
          text: "🔴hide keyboard",
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
