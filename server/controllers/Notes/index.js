const { Notes} = require("../../Models/index");

const create = async (req, res) => {
  try {
    const { content } = req.body;
    const newNote = Notes.create({ content });
    const contentID = JSON.parse(content)[0]?.id; 
    console.log('content', content)
    console.log('contentId:', contentID)
  } catch (error) {
    res.status(500).json({ error: "internal error" });
    console.log('error occurred when creating Note:',error) 
}
};

const data = async (req, res) =>{ 
    try {
        const userNotes = await Notes.findOne({_id:'67b2588c6ccee8a21afeb7f4'})
       res.json(userNotes)
    } catch (error) {
        res.status(500).json({ error: "Internal server error" });

    }
}

module.exports = { create, data};
