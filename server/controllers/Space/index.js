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
    const spaceTextData = await Space.find({});
    res.json(spaceTextData);
  } catch (error) {
    console.log("Error occured while fetching data from mongodb:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

const addSpace = async (req, res) => {
  const { text, documentId } = req.body;
  try {
    const editSpaceText = await Space.findByIdAndUpdate(documentId, {
      $push: { Spaces: { text } },
    });
    res.json(editSpaceText);
    console.log(documentId);
  } catch (error) {
    console.log("Error occured while updating data from mongodb:", error);
  }
};

const renameSpaceText = async (req, res) => {
  try {
    const { text, documentId, objectId } = req.body;

    await Space.updateOne(
      { _id: documentId, "Spaces._id": objectId },
      { $set: { "Spaces.$.text": text } }
    );

    console.log("----RENAME SPACE ------");
    console.log("rename new text:", text);
    console.log("rename documentId:", documentId);
    console.log("rename objectId:", objectId);
  } catch (error) {
    console.log("Error occured while upadting spaceText", error);
  }
};

const deleteSpace = async (req, res) => {
  try {
    const { spaceId, name} = req.body;
    const deleteSpace = await User.findByIdAndUpdate('6656793fdadf6ea20548f258', {
       $pull: {spaces: {type: spaceId}},
    });
    res.json(deleteSpace);
  } catch (error) {
    console.log("Error occured while deleting data", error);
  }
};

module.exports = {
  createSpace,
  getSpaceText,
  addSpace,
  deleteSpace,
  renameSpaceText,
};
