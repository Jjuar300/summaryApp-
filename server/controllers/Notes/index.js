const { Notes } = require("../../Models/index");

const create = async (req, res) => {
  try {
    const { content, userId } = req.body;
    if (!userId) return Notes.create({ content, userId });
  } catch (error) {
    res.status(500).json({ error: "internal error" });
    console.log("error occurred when creating Note:", error);
  }
};

const data = async (req, res) => {
  try {
    const userNotes = await Notes.findOne({ userId: `${req.params.userId}` });
    res.json(userNotes);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

const update = async (req, res) => {
  try {
    const { content, userId } = req.body;
    const updateNote = await Notes.findOneAndUpdate({
      content: content,
      userId,
    });
    res.json(updateNote);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

module.exports = { create, data, update };
