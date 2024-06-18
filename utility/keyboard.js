export default {
  mainKeyboard: {
    keyboard: [
      [
        {
          text: "Check balance ",
        },
        {
          text: "Fund wallet",
        },
      ],
      [
        {
          text: "Check countries available",
        },
        {
          text: "Check services available",
        },
      ],
      [
        {
          text: "Select country",
        },
        {
          text: "Select service",
        },
      ],
      [
        {
          text: "About bot ?",
        },
        {
          text: "Profile details",
        },
      ],
      [
        {
          text: "Use a number",
        },
      ],
      
      [
        {
          text: "🔴Hide keyboard",
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
          text: "Use this number",
        },
        {
          text: "Don't use this number",
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
