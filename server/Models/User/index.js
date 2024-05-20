const mongoose = require("mongoose");

const newUser = new mongoose.Schema({
  fullname: String,
  userName: String,
  email: String,
  password: String,
  userId: String,
  spaceIds: Array,
});

const createNewUser = mongoose.model("user", newUser);
module.exports = createNewUser;
