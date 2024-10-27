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
//upload images
// const storage = multer.memoryStorage();
// const upload = multer({ storage });

// router.post("/file", upload.single("file"), (req, res) => {
//   const file = req.file;
//   const fileName = req.file.originalname;
//   const {userId} = req.body; 
//   console.log('userId:', userId); 

//   // const userId = req.headers["x-user-id"];
//   const Bucket = process.env.AWS_S3_BUCKET;
//   const Region = process.env.AWS_REGION;
//   const fileLink = `https://${Bucket}.s3.${Region}.amazonaws.com/${fileName}`

//   console.log("fileName:", fileName);
//   console.log("userId:", userId);

//   console.log("file:", req.file);
//   const { error} = uploadToS3({ file, fileName, userId });
 
  
  
//   console.log("fileLink:", fileLink);
//   if (error) return res.status(500).json({ message: error.message });
//   return res.status(201).json({ fileLink });
// });

router.get("/file", async (req, res) => {
  // const fileName = req.file.originalname;
  // const {userId} = req.body; 

  const user = req.headers['x-user-id']; 
  console.log('user:', user)

  try {
    // const {command} = await getFileS3(fileName, userId);
    // return res.json(command);  
  } catch (error) {
    console.log('error on sendObject:', error)
  }
})

module.exports = router;
