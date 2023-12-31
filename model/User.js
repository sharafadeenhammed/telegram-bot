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
    documentsPaidFor: {
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
  },
  { timestamps: true }
);

const User = mongoose.model("user", UserSchema);
export default User;
