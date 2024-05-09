// const { config } = require("dotenv");
// config();
// const { ChatOpenAI } = require("@langchain/openai");

// const model = new ChatOpenAI({
//   openAIApiKey: process.env.OPENAI_API_KEY,
// });

// const response = model.invoke("Write a poem about God");
// console.log(response);

//using openAI
// const { Configuration, OpenAI } = require("openai");
// const openAi = new OpenAI();

// const configuration = new Configuration({
//   apiKey: process.env.OPENAI_API_KEY,
// });

// const chat = async () => {
//   const response = await openAi.chat.completions.create({
//     model: "gpt-4",
//     message: [{ role: "user", content: "where is the United States located?" }],
//   });
//   console.log(completions.choices[0].message.content);
// };

// chat();
