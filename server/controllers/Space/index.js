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
    console.log('Error occured while fetching data from mongodb:', error)
    res.status(500).json({error: 'Internal server error'})
  }
}; 

const editSpaceText = async (req, res) => {
  const {
    text,
    id,  
  } = req.body; 
  try{
     await spaces.findByIdAndUpdate(id, {
      Text: text, 
     })
  }catch(error){
    console.log("Error occured while updating data from mongodb:", error)
  }
}

const deleteSpace = async (req, res) => {
  try{
    const {
      id, 
    } = req.body; 
    await spaces.findByIdAndDelete(id)
  }catch(error){
    console.log('Error occured while deleting data', error)
  }
}

module.exports = {
    postSpaceText, 
    getSpaceText, 
    editSpaceText, 
    deleteSpace,
}; 