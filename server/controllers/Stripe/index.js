const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
const { UserPayment } = require("../../Models/index");

const createSubscription = async (req, res) => {
  try {
    const { priceId, email } = req.body;
    console.log('productionCLientUrl:', process.env.PRODUCTION_CLIENT_URL); 
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
      subscription_data: {
        trial_period_days: 3, 
        // trial_end: Math.floor(Date.now() / 1000) + 60,
        trial_settings:{
          end_behavior: {
            missing_payment_method: 'cancel', 
          }
        }
      },
      // payment_method_collection: 'if_required', 
      success_url: `${process.env.PRODUCTION_CLIENT_URL}/BrowseSpace`,
      cancel_url: `${process.env.PRODUCTION_CLIENT_URL}/Noto`,
    });
    res.json({ session, status: session.status });
  } catch (error) {
    console.log("Error stripe/index.js:", error);
    res.status(500).json({ error: error.message });
  }
}

const getUserPayment = async (req, res) => {
  
  try {
    const userId = req.params.userId;
    // const userPayment = await UserPayment.findOne({ userId: userId });
    if(userId){
      const userPayment = await UserPayment.findOne({email: req.params.email})
      res.status(200).json(userPayment);
    }else{
      res.status(404).json({message: 'User not found!'})      
      throw new Error('User not found!')
    }
    
  } catch (error) {
    return console.log('error in stripe/index.js :83', error);
  }
};



const cancelUserPayment = async (req, res) => {
  try {
    const { userPaymentMongoDocId, subscriptionId } = req.body;

    await UserPayment.findOneAndDelete({_id: userPaymentMongoDocId});
    
    const deletedSubscription = await stripe.subscriptions.cancel(subscriptionId);
    res.json({
      success: true,
      message: "subscription cancelled successfully!",
      deletedSubscription,
    });
  } catch (error) {
    return console.log('error in stripe/index.js :103', error);
  }
};

module.exports = {
  createSubscription,
  // saveSubscribtion,
  getUserPayment,
  cancelUserPayment,
};