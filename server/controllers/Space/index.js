const {spaces} = require('../../Models/index')

const postSpaceText = async(req, res) => {
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

const getSpaceText = async (req, res) => {
  try{
   const spaceTextData = await spaces.find({}); 
   res.json(spaceTextData); 
  }catch(error){
    console.error('Error occured while fetching data from mongodb:', error)
    res.status(500).json({error: 'Internal server error'})
  }
}; 

const editSpaceText = async (req, res) => {
  const {
    Id, 
  } = req.body; 
  try{
    console.log(Id)
  }catch(error){
    console.error("Error occured while updating data from mongodb:", error)
  }
}

module.exports = {
    postSpaceText, 
    getSpaceText, 
    editSpaceText, 
}; 