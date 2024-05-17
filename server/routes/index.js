const express = require("express");
const router = express.Router();

const { Space, User } = require("../controllers/index");

router.post("/postspacetext", Space.postSpaceText);
router.get("/getspacetext", Space.getSpaceText);
router.put("/editspacetext", Space.editSpaceText);
router.put("/deletespace", Space.deleteSpace);
router.put("/renamespacetext", Space.renameSpaceText)

// router.post("/postnewuser", User.newUser);
router.post("/postnewuserid", User.newUserId); 
module.exports = router;
