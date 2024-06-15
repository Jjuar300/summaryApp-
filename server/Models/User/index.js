const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  email: String,
  password: String,
  userId: {
    type: String, 
    unique: true, 
  },
  spaces: [
    {
      type: mongoose.Types.ObjectId, 
      ref:'spaces', 
    }
  ],
  chatGpt: [{
    type: mongoose.Types.ObjectId, 
    ref:'chatGpt', 
 }]
});

const UserModel = mongoose.model("user", UserSchema);
module.exports = UserModel;
