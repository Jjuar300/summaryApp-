const mongoose = require("mongoose");

const newUser = new mongoose.Schema({
  email: String,
  password: String,
  userId: String,
  spaceIds: Array,
});

const createNewUser = mongoose.model("user", newUser);
module.exports = createNewUser;
