const { Notes } = require("../../Models/index");

const create = async (req, res) => {
  try {
    const { content, id } = req.body;
    id ? console.log('note ready created!') :  Notes.create({ content, id });

    console.log("content", content);
    console.log("contentId:", id);
  } catch (error) {
    res.status(500).json({ error: "internal error" });
    console.log("error occurred when creating Note:", error);
  }
};

const data = async (req, res) => {
  // console.log('getNoteId:', req.params.noteId)
  try {
    const userNotes = await Notes.findOne({_id: "67b3b96dd3daa371faa3016e"});
    res.json(userNotes);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

const update = async (req, res) => {
  try {
    // const updateNote = await Notes.findOneAndUpdate({id: req.params.noteId})
    res.json(updateNote);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

module.exports = { create, data, update };
