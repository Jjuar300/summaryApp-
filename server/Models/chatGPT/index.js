const mongoose = require("mongoose");

const ChatGptSchema = new mongoose.Schema({
  message: String,
  response: String,
});

const ChatGptModel = mongoose.model("chatGpt", ChatGptSchema);
module.exports = ChatGptModel;
