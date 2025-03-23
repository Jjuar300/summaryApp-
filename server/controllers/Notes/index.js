const { Notes, Space } = require("../../Models/index");

const create = async (req, res, next) => {
  try {
    const { content, userId, spaceId} = req.body;
    
    const note = await Notes.create({ content, userId });

    await Space.findOneAndUpdate(
      { _id: spaceId },
      { $addToSet: { notes: note._id } }
    );
  } catch (error) {
    res.status(500).json({ error: "internal error" });
    console.log("error occurred when creating Note:", error);
  }
};

const data = async (req, res) => {
  try {
    const { spaceId, userId } = req.params;

    console.log("spaceId:", spaceId);
    console.log("userId:", userId);

    const userNotes = await Notes.findOne({ _id: `${spaceId}` });
    return res.json(userNotes);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
    console.log("erro occured getting note Data:", error);
  }
};

const update = async (req, res) => {
  try {
    const { content, userId, noteDoId } = req.body;

    const updateNote = await Notes.findByIdAndUpdate(noteDoId, {
      content: content,
      userId,
    });
    res.json(updateNote);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
    console.log("error ocurred when updating Note:", error);
  }
};

const remove = async (req, res) => {
  const {noteId} = req.params
  try {
    await Notes.findOneAndDelete({_id: noteId});

    res.status(200).json({ message: "Note has being delete!" });
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

module.exports = { create, data, update, remove };
