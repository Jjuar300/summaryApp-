const express = require("express");
const router = express.Router();

const { Space, User } = require("../controllers/index");

router.post("/spaces", Space.createSpace);
router.get("/spaces", Space.getSpaceText);
router.put("/addspacetext", Space.addSpace);
router.put("/spaces/:id", Space.renameSpaceText);

// router.post("/postnewuser", User.newUser);
router.post("/users", User.newUser);
router.get("/users", User.getUsers)
router.get('/users/:userId', User.getUserByUserId)
router.delete("/users/:userId/spaces/:spaceId", Space.deleteSpace);
module.exports = router;
