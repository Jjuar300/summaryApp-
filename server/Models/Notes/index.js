const mongoose = require('mongoose'); 

const userNotes = new mongoose.Schema({
    content: String, 
}); 

const Notes = mongoose.model('Notes', userNotes); 
module.exports = Notes; 