const express = require("express");
const router = express.Router();

const { Space, User } = require("../controllers/index");

router.post("/postspacetext", Space.postSpaceText);
router.get("/getspacetext", Space.getSpaceText);
router.put("/editspacetext", Space.editSpaceText);
router.delete("/deletespace", Space.deleteSpace);

// router.post("/postnewuser", User.newUser);
module.exports = router;
