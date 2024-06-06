const { config } = require("dotenv");
config();

const { OpenAI, Configuration } = require("openai");

const openai = new OpenAI();

const main = async (message) => {
  const completion = await openai.chat.completions.create({
    messages: [
      {
        role: "system",
        content: "You are a helpful assistant.",
      },
      {
        role: "user",
        content: message,
      },
    ],
    model: "gpt-3.5-turbo",
  });
   const result = completion.choices[0].message.content;
   return result;  
};

module.exports = {
  main, 
}
