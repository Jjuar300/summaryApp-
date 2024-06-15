const { Types } = require("mongoose");
const { Space, User } = require("../../Models/index");

const createSpace = async (req, res) => {
  try {
    const { name, userId } = req.body;
    const newSpace = await Space.create({name});

    await User.findOneAndUpdate({userId}, {
      $addToSet: {spaces: newSpace._id}
    })
    res.json(newSpace);
  } catch (error) {
    console.log(error);
  }
};

const getSpaceText = async (req, res) => {
  try {
    const spaceTextData = await Space.find()
    res.json(spaceTextData);
  } catch (error) {
    console.log("Error occured while fetching data from mongodb:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

const renameSpaceText = async (req, res) => {
  try {
    const { newName } = req.body;

   const renameSpace =  await Space.findOneAndUpdate(
    {_id: req.params.id},
     {
      name: newName
    }, 
    {new: true}, 
  )

    res.json(renameSpace)
  } catch (error) {
    console.log("Error occured while upadting spaceText", error);
    res.status(500).json({error:'Internal server error'})
  }
};

const deleteSpace = async (req, res) => {
  try {
    const deleteSpace = await Space.findOneAndDelete({_id: req.params.spaceId});
    const deleteUserSpaces = await User.findOneAndUpdate(
      {userId: req.params.userId},
      {$pull: {spaces: new Types.ObjectId(req.params.spaceId)}}
    )

    res.json(deleteSpace);
  } catch (error) {
    console.log("Error occured while deleting data", error);
    res.status(500).json('Internal server error'); 
  }
};

module.exports = {
  createSpace,
  getSpaceText,
  deleteSpace,
  renameSpaceText,
};
