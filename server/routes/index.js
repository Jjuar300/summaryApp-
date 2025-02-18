const express = require("express");
const router = express.Router();

const { Space, User, Chatgpt, Notes } = require("../controllers/index");
const {Imagekit} = require('../controllers/index.js'); 

//spaces 
router.post("/spaces", Space.createSpace);
router.put("/spaces/:id", Space.renameSpaceText);
router.get("/users/:userId/spaces/:spaceId", Space.getSpaces);

//user
router.post("/users", User.newUser);
router.get("/users/:userId", User.getUserByUserId);
router.delete("/users/:userId/spaces/:spaceId", Space.deleteSpace);
router.delete("/users/:userId", User.deleteUser);

//chatgpt
router.post("/chatgpt", Chatgpt.ChatgptResponse);
router.get("/chatgpt", Chatgpt.getChatGptData);
router.delete("/chatgpt/:chatGptId", Chatgpt.deleteChatGpt);
router.put("/chatgpt/:chatGptId", Chatgpt.updateChatgpt);

//imagekit
router.get('/authImage', Imagekit.uploadFileImageKit);
router.post('/imagekitfolder', Imagekit.deleteImagekitFolder);

//userNotes
router.post('/userNotes', Notes.create); 
router.get('/userNotes/:userId', Notes.data)
router.put('/userNotes', Notes.update )

module.exports = router;
