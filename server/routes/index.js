const express = require("express");
const router = express.Router();
const multer = require('multer');


const { Space, User, Chatgpt } = require("../controllers/index");
const { uploadToS3 } = require("../services/aws/s3.js");

router.post("/spaces", Space.createSpace);
router.put("/spaces/:id", Space.renameSpaceText);
router.get('/users/:userId/spaces/:spaceId', Space.getSpaces)
 
router.post("/users", User.newUser);
router.get('/users/:userId', User.getUserByUserId)
router.delete("/users/:userId/spaces/:spaceId", Space.deleteSpace);
router.delete('/users/:userId', User.deleteUser)

router.post('/chatgpt', Chatgpt.ChatgptResponse);
router.get('/chatgpt', Chatgpt.getChatGptData);
router.delete('/chatgpt/:chatGptId', Chatgpt.deleteChatGpt);
router.put('/chatgpt/:chatGptId',Chatgpt.updateChatgpt);

//upload images
const storage = multer.memoryStorage(); 
const upload = multer({ storage });


router.post('/file', upload.single('file'), (req, res) =>{
    const file = req.file
    const fileName = req.file.originalname; 

    console.log('fileName:', fileName);

    console.log('file:', req.file)
    const {error, key} = uploadToS3({file, fileName})
    if (error) return res.status(500).json({message: error.message}); 
    return res.status(201).json({key});    
  })

module.exports = router;
