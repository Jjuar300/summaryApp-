const { User } = require("../../Models");

const newUser = async (req, res) => {
  try {
    const { email, password, spaceId, userId } = req.body;

    const createNewUser = await User.create({
      email: email,
      password: password,
      spaceIds: [spaceId],
      userId: userId,
    });

    // createNewUser.spaceIds.push(spaceId);
    // createNewUser.save();

    console.log("==== New User =====");
    console.log("user was created:", createNewUser);
  } catch (error) {
    console.log(error);
  }
};

const getUsers = async (req, res) => {
  try {
    const users = await User.find({});
    res.json(users);
  } catch (error) {
    console.log("error occured while getting users", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

const  getUserByUserId = async (req, res) => {
  try{
    const user = await User.findOne({userId: req.params.userId}); 
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
  getUsers, 
  getUserByUserId, 
};
