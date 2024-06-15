const { ChatGpt } = require("../../Models/index");
const { main } = require("../../openai/index");
const { User, Space } = require("../../Models/index");

const ChatgptResponse = async (req, res) => {
  try {
    const userId = 'user_2h43t1TCVVMT4P1SASFjd5hTsiS'
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
   console.log('spaceId:',spaceId)
    const chatgptFound = await ChatGpt.findOne({ message });

    if (chatgptFound) return res.status(200).json(chatgptFound);

    res.Status(201).json(newChatgpt);
  } catch (error) {
    console.log(error);
    console.log('error occured chatGptResponse function:', error)
    res.status(500).json({ message: "internal server error" });
  }
};

const getChatGptData = async (req, res) => {
  try {
    const chatGptData = await ChatGpt.find({});
    res.json(chatGptData);
  } catch (error) {
    console.log("error in the chatGptDatat function: ", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

module.exports = {
  ChatgptResponse,
  getChatGptData,
};
