const Space = require("./spaces/index");
const User = require("./User/index");
const ChatGpt = require('./chatGPT/index'); 
const S3image = require('./s3Images/index'); 
const Notes = require('./Notes/index')

module.exports = {
  Space,
  User,
  ChatGpt, 
  S3image, 
  Notes
};
