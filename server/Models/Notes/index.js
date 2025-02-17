const mongoose = require('mongoose'); 

const userNotes = new mongoose.Schema({
    content: String, 
    id: String, 
}); 

const Notes = mongoose.model('Notes', userNotes); 
module.exports = Notes; 