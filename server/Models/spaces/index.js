const mongoose = require('mongoose')

const newSpace = new mongoose.Schema({
    Text: String, 
});

const createNewSpace = mongoose.model('spaces', newSpace); 
module.exports = createNewSpace; 