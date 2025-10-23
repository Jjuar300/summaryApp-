const mongoose = require("mongoose");

const userPayment = new mongoose.Schema(
  {
    email: {
      type: String,
      trim: true,
      lowercase: true,
      private: true,
    },
    name: {
      type: String,
      trim: true,
      lowercase: true,
      private: true,
    },
    customerId: {
      type: String,
      trim: true,
      private: true,
    },
    subscriptionId: {
      type: String,
    },
    hasAccess: {
      type: Boolean,
      default: false,
    },
    priceId: {
      type: String,
      trim: true,
      private: true,
    },
  },
  { timestamps: true }
);

const UserPayment = mongoose.model("userPayment", userPayment);
module.exports = UserPayment;
