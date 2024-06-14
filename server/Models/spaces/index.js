const mongoose = require("mongoose");

const SpaceSchema = new mongoose.Schema({
   name: String, 
   chatGpt: {
      type: mongoose.Types.ObjectId, 
      ref:'chatResponse', 
   }
});

const SpaceModel = mongoose.model("spaces", SpaceSchema);
module.exports = SpaceModel;
