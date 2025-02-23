const { Notes } = require("../../Models/index");

const create = async (req, res) => {
  try {
    const { content, userId } = req.body;
    console.log('content:', content)
    if(content == undefined){
      return console.log('no content found!')
    }else{
      return await Notes.create({ content, userId });
    }

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
    console.log('erro occured getting note Data:', error)
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
    console.log("error ocurred when updating Note:", error);
  }
};

module.exports = { create, data, update };
