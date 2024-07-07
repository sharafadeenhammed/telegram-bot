import mongoose from "mongoose";

const UserSchema = mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
    },
    userName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    chatId: {
      type: Number,
      required: true,
      unique: true,
    },
    balance: {
      type: Number,
      default: 0,
    },
    downloadsUrl: {
      type: Array,
      default: [],
    },
    token: {
      type: String,
    },
    phone: {
      type: String,
      required: true,
    },
    coinPaymentAddress: {
      type: String,
      require: true,
    },
    service: {
      type: String,
      default:""
    },
    country: {
      type: String,
      default:""
    },
    otuNumber: {
      type: String,
      default:""
    },
    otuNumberId: Number,
    otuIssuedAt: {
      type: Date,
    },
    otuReceivedSms: {
      type: String,
      default:""
    },
    otuExpired: Boolean,
    otuSercicePrice: {
      type: String,
      default:""
    },
    rentedNumber: {
      type: String,
      default:""
    },
    rentMode: {
      type: String,
      enum: [ "week", "month" ],
      default:""
    },
    rentedIssuedAt: {
      type: Date,
      default:null,
    },
    rentalServiceValidTill: {
      type: String,
      default: ""
    },
    rentedReceivedSms: {
      type: String,
      default:""
    },
    rentalServicePrice: {
      type: Number,
      default: 0
    },
    rentedNumberId: {
      type: Number,
      default: 0
    },
    lastMessageId: String,
    lastSentMessageId: String,
    lastReceivedMessageId: String,

  },
  { timestamps: true }
);

const User = mongoose.model("user", UserSchema);
export default User;
