const { ChatGpt } = require("../../Models/index");

const ChatgptResponse = async (req, res) => {
  try {
    const { message } = req.body;
    const chatResponse = await main(message);
    const newChatgpt = await ChatGpt.create({
      message: message,
      response: chatResponse,
    });

    res.Status(200).json(newChatgpt.message);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "internal server error" });
  }
};

module.exports = {
  ChatgptResponse,
};
