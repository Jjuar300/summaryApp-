const mongoose = require('mongoose'); 

const s3ImageSchema = new mongoose.Schema({
 filename: String, 
 userId: String, 
}); 

const s3Image = mongoose.model('s3Images', s3ImageSchema); 
module.exports = s3Image; 