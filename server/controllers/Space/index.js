const {spaces} = require('../../Models/index')

const getSpaceText = async(req, res) => {
  try{
    const {
        text, 
    } = req.body; 

    const newSpaceText = await spaces.create({
        Text: text, 
    })
    console.log(text); 
  }catch(error){
    console.log(error)
  }
}; 

module.exports = {
    getSpaceText, 
}; 