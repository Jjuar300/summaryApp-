const mongoose = require('mongoose'); 

const userNotes = new mongoose.Schema({
    content: String, 
    userId: String, 
}); 

const Notes = mongoose.model('notes', userNotes); 
module.exports = Notes; 