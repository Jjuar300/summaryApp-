const express = require("express");
const router = express.Router();

const { Space, User, Chatgpt } = require("../controllers/index");

router.post("/spaces", Space.createSpace);
router.put("/spaces/:id", Space.renameSpaceText);
router.get('/spaces/:spaceId', Space.getSpaces)

router.post("/users", User.newUser);
router.get('/users/:userId', User.getUserByUserId)
router.delete("/users/:userId/spaces/:spaceId", Space.deleteSpace);

router.post('/chatgpt', Chatgpt.ChatgptResponse);
router.get('/chatgpt', Chatgpt.getChatGptData);

module.exports = router;
