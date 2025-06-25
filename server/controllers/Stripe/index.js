const stripe = require("stripe")(process.env.STRIPE_TEST_SECRET_KEY);

const createSubscription = async (req, res) => {
  try {
    const { priceId, email } = req.body;
   
    const session = await stripe.checkout.sessions.create({
      mode: "subscription",
      payment_method_types: ["card"],
      customer_email: email, 
      line_items: [
        {
          price: priceId,
          quantity: 1,
        },
      ],
      success_url: `${process.env.CLIENT_URL}settings?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.CLIENT_URL}`,
    });

    console.log("session:", session);

    res.json({ url: session.url, status: session.status });
  } catch (error) {
    console.log("Error:", error);
    res.status(500).json({ error: error.message });
  }
};

const saveSubscribtion = async (req, res) => {
   const {session_id} = req.body;
   console.log('sessionId:', session_id) 
  try {
    const session = await stripe.checkout.session.retrieve(session_id); 
    const subscription = await stripe.subscriptions.retrieve(session.subscription); 
   
    if(session.status === 'complete'){
      console.log({session, subscription}); 
      return res.status(200).json({session, subscription}); 
    }

  } catch (error) {
    console.log("Error:", error);
  }
};

module.exports = {
  createSubscription,
  saveSubscribtion, 
};
