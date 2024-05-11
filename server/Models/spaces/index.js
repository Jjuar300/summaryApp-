const mongoose = require("mongoose");

const newSpace = new mongoose.Schema({
  Spaces: [{}],
});

const createNewSpace = mongoose.model("spaces", newSpace);
module.exports = createNewSpace;
