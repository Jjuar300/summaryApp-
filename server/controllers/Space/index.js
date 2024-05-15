const { spaces, user } = require("../../Models/index");

const postSpaceText = async (req, res) => {
  try {
    const { text } = req.body;

    const newSpaceText = await spaces.create({
      Spaces: [{text}],
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

const editSpaceText = async (req, res) => {
  const { text, documentId } = req.body;
  try {
    const editSpaceText = await spaces.findByIdAndUpdate(documentId, {
      $push: {Spaces: {text}}, 
    });
    res.json(editSpaceText);
    console.log(documentId)
    
  } catch (error) {
    console.log("Error occured while updating data from mongodb:", error);
  }
};

const deleteSpace = async (req, res) => {
  try {
    const { id } = req.body;
    const deleteSpace = await spaces.findByIdAndDelete(id);
    res.json(deleteSpace);
    console.log('detele id:', id)
  } catch (error) {
    console.log("Error occured while deleting data", error);
  }
};

module.exports = {
  postSpaceText,
  getSpaceText,
  editSpaceText,
  deleteSpace,
};
