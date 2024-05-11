const { config } = require("dotenv");
config();

const {OpenAI, Configuration} = require('openai')

const openai =  new OpenAI(); 

const main = async () => {
  const completion = await openai.chat.completions.create({
    messages: [
        {
            role:'system', 
            content:'You are a helpful assistant.'
        }, 
        {
            role:'user', 
            content:'give me a three paragraph about https://www.wired.com/story/geomagnetic-storm-aurora-night-sky/ ', 
        }, 
    ], 
    model: 'gpt-3.5-turbo', 
  }); 
  console.log(completion.choices[0].message.content); 
}

main(); 