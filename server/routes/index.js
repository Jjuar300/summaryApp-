const express = require("express");
const router = express.Router();
const multer = require("multer");

const { Space, User, Chatgpt, AwsS3 } = require("../controllers/index");
const { uploadToS3, getFileS3 } = require("../services/aws/s3.js");

const storage = multer.memoryStorage();
const upload = multer({ storage });

router.post("/spaces", Space.createSpace);
router.put("/spaces/:id", Space.renameSpaceText);
router.get("/users/:userId/spaces/:spaceId", Space.getSpaces);

router.post("/users", User.newUser);
router.get("/users/:userId", User.getUserByUserId);
router.delete("/users/:userId/spaces/:spaceId", Space.deleteSpace);
router.delete("/users/:userId", User.deleteUser);

router.post("/chatgpt", Chatgpt.ChatgptResponse);
router.get("/chatgpt", Chatgpt.getChatGptData);
router.delete("/chatgpt/:chatGptId", Chatgpt.deleteChatGpt);
router.put("/chatgpt/:chatGptId", Chatgpt.updateChatgpt);

router.post('/file', upload.single('file'), AwsS3.uploadFile)
router.get('/file', AwsS3.getS3File); 

module.exports = router;
