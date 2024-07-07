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

  // close keyboard
  hideKeyboard: {
    hide_keyboard: true,
  },

  // use number
  useNumber: () => {

    return {
      inline_keyboard: [
        [
          {
            text: "Use this number",
            callback_data: "use_number",
          },
          {
            text: "Cancel",
            callback_data: "cancel",
          },
        ],
      ]
    }
    
  },
  // create profile keyboard 
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

  // rent or one time use
  rentOrOneTimeUse: {
    inline_keyboard: [
    [
      {
        text: "One time use",
        callback_data: "otu",
      },
      {
        text: "Rent",
        callback_data: "rent",
      },
      ]
    ]
  },

  rentalOptionsKeyboard: {
    inline_keyboard: [
    [
      {
        text: "One Week",
        callback_data: "week",
      },
      {
        text: "One Month",
        callback_data: "month",
      },
      ]
    ]
  }
};
