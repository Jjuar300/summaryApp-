const mongoose = require("mongoose");

const SpaceSchema = new mongoose.Schema({
   name: String, 
   chatGpt: [{
      type: mongoose.Types.ObjectId, 
      ref:'chatGpt', 
   }]
}, 
);

const SpaceModel = mongoose.model("spaces", SpaceSchema);
module.exports = SpaceModel;
