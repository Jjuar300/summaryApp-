const stripe = require("stripe")(process.env.STRIPE_TEST_SECRET_KEY);

const createSubscription = async (req, res) => {
  try {
    const { priceId } = req.body;
   const session = await stripe.checkout.sessions.create({
      mode: "subscription",
      payment_method_types: ["card"],
      line_items: [
        {
          price: priceId,
          quantity: 1,
        },
      ],
      success_url: `${process.env.CLIENT_URL}settings`,
      cancel_url: `${process.env.CLIENT_URL}`,
    });

    console.log('session:', session)

    res.json({url:session.url, status:session.status });
  } catch (error) {
    console.log("Error:", error);
    res.status(500).json({ error: error.message });
  }
};


const getSubscription = async (req, res) =>{ 
    try {
        const sessionId = req.query.session_id;
       console.log('sessionId:', sessionId)
    } catch (error) {
        console.log('Error:', error)
    }
}


module.exports = {
    createSubscription, 
}