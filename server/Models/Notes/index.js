const mongoose = require('mongoose'); 

const userNotes = new mongoose.Schema({
    content: String, 
    userId: String, 
}); 

const Notes = mongoose.model('Notes', userNotes); 
module.exports = Notes; 