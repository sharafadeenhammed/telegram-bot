import mongoose from "mongoose";

const Document = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    isPurchased: {
      type: Boolean,
      default: false,
    },
    customerName: {
      type: String,
      default: "",
    },
    userChatId: {
      type: Number,
    },
    ref: {
      type:mongoose.Schema.Types.ObjectId,
      model: "User",
    }
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("document", Document);
