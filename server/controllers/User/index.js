const { User } = require("../../Models");

const newUser = async (req, res) => {
  try {
    const { email, userId } = req.body;
    
    const userFound = await User.findOne({email}); 
    
    if(userFound){
      return res.status(200).json(userFound);
    }

    const newUser = await User.create({
      email: email,
      userId: userId,
    });

    await newUser.save();
    res.status(201).json(newUser)
  } catch (error) {
    console.log(error);
    res.status(500).json({error: 'Internal server error'})
  }
};

const  getUserByUserId = async (req, res) => {
  try{
    const user = await User.findOne({userId: req.params.userId}).populate({path: 'spaces', populate:{path:'chatGpt'}})
    if(!user){
      return response.status(400).json({error: 'No user found with this userId'})
    }
    res.json(user)
  }catch(error){
  res.status(500).json({error:'Internal server error'})
  }

}

module.exports = {
  newUser, 
  getUserByUserId, 
};
