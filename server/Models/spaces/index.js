const mongoose = require("mongoose");

const SpaceSchema = new mongoose.Schema({
   name: String, 
});

const SpaceModel = mongoose.model("spaces", SpaceSchema);
module.exports = SpaceModel;
