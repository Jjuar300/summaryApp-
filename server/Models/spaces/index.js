const mongoose = require("mongoose");

const SpaceSchema = new mongoose.Schema({
   name: String, 
   chatGpt: [{
      type: mongoose.Types.ObjectId, 
      ref:'chatGpt', 
   }],  
   notes: [{
      type: mongoose.Types.ObjectId, 
      ref: 'notes', 
   }]
}, 
);

const SpaceModel = mongoose.model("spaces", SpaceSchema);
module.exports = SpaceModel;
