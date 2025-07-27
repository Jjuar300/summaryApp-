const express = require("express");
const router = express.Router();
const bodyParser = require('body-parser')
const stripe = require("stripe")

const { Space, User, Chatgpt, Notes, Imagekit, Stripe } = require("../controllers/index");
const STRIPE = new stripe(process.env.STRIPE_TEST_SECRET_KEY)

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
router.post('/save-payment', Stripe.saveSubscribtion)
router.post('/cancel-payment', Stripe.cancelUserPayment)
router.get('/userPayment/:userId', Stripe.getUserPayment)

// router.post('/webhook', express.raw({type:'application/json'}) , async (req, res) => {
  
//   try {
//     const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET; 
    
//     const sig = req.headers['stripe-signature']; 
//     const event = STRIPE.webhooks.constructEvent(req.body, sig, process.env.STRIPE_WEBHOOK_SECRET);   
//     console.log('event:',event.type)
    
//     if(event.type === 'customer.created'){
//       const customer = await STRIPE.customers.retrive(event.data.object.id); 
//       console.log('Customer retrived:', customer);
//     }else{
//       console.log('Unhandled event', event.type)
//     }
    
//     return res.sendStatus(200)
//   } catch (error) {
//     console.log('webhook Error:', error.message)
//     return res.sendStatus(400)
//   }
// })

module.exports = router;
