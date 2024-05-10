const { config } = require("dotenv");
config();

const {OpenAI} = require('openai')

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
            content:'what is the capital of Texas?', 
        }, 
    ], 
    model: 'gpt-3.5-turbo', 
    response_format: {type: 'json_object'}, 
  }); 
  console.log(completion.choices[0].message.content); 
}

main(); 