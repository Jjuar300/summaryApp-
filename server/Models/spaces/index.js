const mongoose = require("mongoose");

const newSpace = new mongoose.Schema({
  Spaces: [{
    text: String, 
    id: {type: mongoose.Schema.Types.ObjectId}, 
  }],
});

const createNewSpace = mongoose.model("spaces", newSpace);
module.exports = createNewSpace;
