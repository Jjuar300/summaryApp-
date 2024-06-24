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

});

const UserModel = mongoose.model("user", UserSchema);
module.exports = UserModel;
