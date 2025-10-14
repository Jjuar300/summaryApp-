const { User, Space, ChatGpt } = require("../../Models");

const newUser = async (req, res) => {
  try {
    const { email, userId } = req.body;
    const userFound = await User.findOne({ email });

    console.log('email:', email)
    console.log('userId user created:', userId)

    if (userFound) {
      return res.status(200).json(userFound);
    }

    const newUser = await User.create({
      email: email,
      userId: userId,
    });

    await newUser.save();
    res.status(201).json(newUser);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

const getUserByUserId = async (req, res) => {
  try {
    const user = await User.findOne({ userId: req.params.userId }).populate({
      path: "spaces",
      populate: { path: "notes" },
    });
    if (!user) {
      return res.status(400).json({ error: "No user found with this userId" });
    }
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
    console.log("error getuser:", error)
  }
};

const deleteUser = async (req, res) => {
  try {
    const userId = req.params.userId;
    const { space } = req.body;
    const spaceIds = space?.map((item) => item._id);
    // const chatGptIds = space?.map((item) => item?.chatGpt?.map((item) => item._id));
    console.log('delete userId:', userId); 
    console.log('delete space:', space)
    console.log('spaceIds:', spaceIds); 

    await User.findOneAndDelete({ userId: userId });
    await Space.deleteMany({ _id: { $in: spaceIds } });
    //  await ChatGpt.deleteMany({_id: {$in: chatGptIds}})
  } catch (error) {
    res.status(500).json({ error: "internal error" });
  }
};

module.exports = {
  newUser,
  getUserByUserId,
  deleteUser,
};
