const { Space, User } = require("../../Models/index");

const createSpace = async (req, res) => {
  try {
    const { name, userId } = req.body;
    const newSpace = await Space.create({ name });

    await User.findOneAndUpdate(
      { userId },
      { $addToSet: { spaces: newSpace?.id } }
    );

    res.json(newSpace);
  } catch (error) {
    res.status(500).json({error: 'Internal error'})
  }
};

const renameSpaceText = async (req, res) => {
  try {
    const { newName } = req.body;

    const renameSpace = await Space.findOneAndUpdate(
      { _id: req.params.id },
      {
        name: newName,
      },
      { new: true }
    );

    res.json(renameSpace);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

const deleteSpace = async (req, res) => {
  try {
    const userId = req.params.userId;

    const deleteSpace = await Space.findOneAndDelete({
      _id: req.params.spaceId,
    });

    await User.findOneAndUpdate(
      { userId },
      {
        $pull: { spaces: req.params.spaceId },
      }
    );

    res.json(deleteSpace);
  } catch (error) {
    res.status(500).json("Internal server error");
  }
};

const getSpaces = async (req, res) => {
  try {
    const spaces = await Space.findById(req.params.spaceId).populate({
      path: "chatGpt",
    });
    if (!spaces) return res.status(400).json({ error: "no spaces were found" });
    res.json(spaces);
  } catch (error) {
    res.status(500).json({ error: "Internal error" });
  }
};

module.exports = {
  createSpace,
  deleteSpace,
  renameSpaceText,
  getSpaces,
};
