const mongoose = require("mongoose");

const testPayment = new mongoose.Schema(
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
      lowercase: true,
      private: true,
    },
    hasAccess: {
      type: Boolean,
      default: false,
    },
    priceId: {
      type: String,
      trim: true,
      lowercase: true,
      private: true,
    },
  },
  { timestamps: true }
);

const TestPayment = mongoose.model("testPayment", testPayment);
module.exports = TestPayment;
