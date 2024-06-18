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
          text: "check countries available",
        },
        {
          text: "check services available",
        },
      ],
      [
        {
          text: "select country",
        },
        {
          text: "select service",
        },
      ],
      [
        {
          text: "use a number",
        },
      ],
      [
        {
          text: "about bot ?",
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
  useNumber: {
    keyboard: [
      [
        {
          text: "use this number",
        },
        {
          text: "don't use this number",
        },
      ]
    ],
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
