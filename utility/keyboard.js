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
      ],
      [
        {
          text: "about bot ?",
        },
      ],
      [
        {
          text: "get number for otp code",
        },
      ],
      [
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
