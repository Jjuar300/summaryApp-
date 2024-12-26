const { User, Space, ChatGpt } = require("../../Models");

const newUser = async (req, res) => {
  try {
    const { email, userId } = req.body;

    const userFound = await User.findOne({ email });

    if (userFound) {
      return res.status(200).json(userFound);
    }

    const newUser = await User.create({
      email: email,
      userId: userId,
    });

    console.log('userid:', userId)

    await newUser.save();
    res.status(201).json(newUser);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
    console.log('error occured while creating new user:', error)
  }
};

const getUserByUserId = async (req, res) => {
  try {
    const user = await User.findOne({ userId: req.params.userId }).populate({
      path: "spaces",
      populate: { path: "chatGpt" },
    });
    if (!user) {
      return res.status(400).json({ error: "No user found with this userId" });
    }
    res.json(user);
  } catch (error) {
    console.log('error occurred when getting user data')
    res.status(500).json({ error: "Internal server error" });
  }
};

const deleteUser = async (req, res) => {
 try {

    const userId = req.params.userId; 
    const {spaces} = req.body; 
    const spaceIds = spaces?.map((item) => item._id)
    const chatGptIds = spaces?.map((item) => item?.chatGpt?.map((item) => item._id)); 

    const userDelete = await User.findOneAndDelete({ userId }); 
    const spaceDelete = await Space.deleteMany({_id: {$in: spaceIds}})
    const chatgptDelete = await ChatGpt.deleteMany({_id: {$in: chatGptIds}})

    await userDelete.save(); 
    // await spaceDelete.save();
    // await chatgptDelete.save(); 

    console.log('spacesIds:', spaceIds); 
    console.log('chatgptIds:', chatGptIds)
    console.log('delete userId:', req.params.userId);
  } catch (error) {
  res.status(500).json({error: 'internal error'})
  console.log('error occurred while deleting user:', error)
 }
};

module.exports = {
  newUser,
  getUserByUserId,
  deleteUser, 
};
