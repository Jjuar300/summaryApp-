const express = require("express");
const router = express.Router();
const bodyParser = require('body-parser')
const stripe = require("stripe")

const { Space, User, Chatgpt, Notes, Imagekit, Stripe } = require("../controllers/index");
const STRIPE = new stripe(process.env.STRIPE_SECRET_KEY)

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
router.get('/userNotes/:userId/space/:spaceId', Notes.data)
router.put('/updateUserNotes', Notes.update )
router.delete('/deleteNote/:noteId', Notes.remove)

//stripe
router.post('/create-checkout-session',Stripe.createSubscription)
router.post('/cancel-payment', Stripe.cancelUserPayment)
router.get('/userPayment/:userId/:email', Stripe.getUserPayment)


module.exports = router;
