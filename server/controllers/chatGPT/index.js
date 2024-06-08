const { ChatGpt } = require("../../Models/index");
const {main}  = require('../../openai/index')

const ChatgptResponse = async (req, res) => {
  try {
    const { message } = req.body;
     const response = await main(message);
    const newChatgpt = await ChatGpt.create({
      message: message,
      response: response,
    });
    // res.Status(200).json(newChatgpt.message);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "internal server error" });
  }
};

const getChatGptData = async (req, res) => {
try {
  const chatGptData =  await ChatGpt.find({})
  res.json(chatGptData)
} catch (error) {
  console.log('error in the chatGptDatat function: ', error)
  res.status(500).json({error: 'Internal server error'})
}
}

module.exports = {
  ChatgptResponse,
  getChatGptData, 
};
