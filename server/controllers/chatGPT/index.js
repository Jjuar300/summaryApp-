const { ChatGpt } = require("../../Models/index");
const { main } = require("../../openai/index");
const { User, Space } = require("../../Models/index");

const ChatgptResponse = async (req, res) => {
  try {
    const { message, spaceId } = req.body;
    const response = await main(message);
    const newChatgpt = await ChatGpt.create({
      message: message,
      response: response,
    });

    await Space.findOneAndUpdate({_id: spaceId}, {
      $addToSet: { chatGpt: newChatgpt._id },
    }, 
  );
    const chatgptFound = await ChatGpt.findOne({ message });

    if (chatgptFound) return res.status(200).json(chatgptFound);

    res.Status(201).json(newChatgpt);
  } catch (error) {
    res.status(500).json({ message: "internal server error" });
  }
};

const getChatGptData = async (req, res) => {
  try {
    const chatGptData = await ChatGpt.find({});
    res.json(chatGptData);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

const deleteChatGpt = async (req, res) => {
  try {
      const deleteChatGpt = await ChatGpt.findOneAndDelete({_id: req.params.chatGptId})
      if(!deleteChatGpt) return res.status(200).json({message: "chatGpt response was deleted"})
    } catch (error) {
    res.status(500).json({error: "Internal error"}); 
  }
}

const updateChatgpt = async (req, res) => {
  try{
    const chatgptId = req.params.chatGptId; 
    const {html} = req.body; 
    const updateResponse = await ChatGpt.findOneAndUpdate(
      {_id: chatgptId}, 
      {
        response: html, 
      }
    )
    res.json(updateResponse)
  }catch(error){
    res.status(500).json({error: "Internal error"}); 
  }
}

module.exports = {
  ChatgptResponse,
  getChatGptData,
  deleteChatGpt, 
  updateChatgpt, 
};
