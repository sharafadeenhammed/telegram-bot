import mongoose from "mongoose";

const UserSchema = mongoose.Schema(
  {
    name: {
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
    },
    token: {
      type: String,
    },
    phone: {
      type: String,
    },
  },
  { timestamps: true }
);

export default mongoose.model("user", UserSchema);
