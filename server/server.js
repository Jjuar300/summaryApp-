require("dotenv").config();
process.removeAllListeners('warning');
const cors = require("cors");
const express = require("express");
const mongoose = require("mongoose");
const PORT = process.env.PORT || 3004;
const app = express();
const routes = require("./routes");
const stripe = require("stripe")

const STRIPE = new stripe(process.env.STRIPE_TEST_SECRET_KEY)


app.use(cors("*"));
app.use(express.urlencoded({ extended: false }));

app.post('/api/webhook', express.raw({type:'application/json'}) , async (req, res) => {
  
  try {
    
    const sig = req.headers['stripe-signature']; 
    const event = STRIPE.webhooks.constructEvent(req.body, sig, process.env.STRIPE_WEBHOOK_SECRET);   
    console.log('event:',event.type)
    
    if(event.type === 'customer.created'){
      const customer = await STRIPE.customers.retrive(event.data.object.id); 
      console.log('Customer retrived:', customer);
    }else{
      console.log('Unhandled event', event.type)
    }
    
    return res.sendStatus(200)
  } catch (error) {
    console.log('webhook Error:', error.message)
    return res.sendStatus(400)
  }
})

app.use(express.json());
app.use("/api", routes);


try {
  mongoose.connect(process.env.DEV_MONGODB || process.env.MONGO_DATABASE)
} catch (error) {
  console.log(`${error}: did not connect`);
}


app.listen(PORT, () => {
  console.log("SERVER RUNNING ON PORT: ", PORT);
});