const { spaces } = require("../../Models/index");

const postSpaceText = async (req, res) => {
  try {
    const { text } = req.body;

    const newSpaceText = await spaces.create({
      Spaces: [{ text }],
    });

    console.log(text);
    res.json(newSpaceText);
  } catch (error) {
    console.log(error);
  }
};

const getSpaceText = async (req, res) => {
  try {
    const spaceTextData = await spaces.find({});
    res.json(spaceTextData);
  } catch (error) {
    console.log("Error occured while fetching data from mongodb:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

const addSpace = async (req, res) => {
  const { text, documentId } = req.body;
  try {
    const editSpaceText = await spaces.findByIdAndUpdate(documentId, {
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

    await spaces.updateOne(
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
    const { documentId, text, objectId } = req.body;
    const deleteSpace = await spaces.findByIdAndUpdate(documentId, {
      $pull: { Spaces: { _id: objectId } },
    });
    res.json(deleteSpace);
    console.log("-----DELETE SPACE------");
    console.log("delete text:", text);
    console.log("detele id:", documentId);
    console.log("objectId:", objectId);
  } catch (error) {
    console.log("Error occured while deleting data", error);
  }
};

module.exports = {
  postSpaceText,
  getSpaceText,
  addSpace,
  deleteSpace,
  renameSpaceText,
};
