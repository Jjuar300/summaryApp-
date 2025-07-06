const stripe = require("stripe")(process.env.STRIPE_TEST_SECRET_KEY);
const { UserPayment } = require("../../Models/index");

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
      success_url: `${process.env.CLIENT_URL}?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.CLIENT_URL}`,
    });
    res.json({ session, status: session.status });
  } catch (error) {
    console.log("Error:", error);
    res.status(500).json({ error: error.message });
  }
};

const saveSubscribtion = async (req, res) => {
  try {
    const { session_id, userId } = req.body;
    const session = await stripe.checkout.sessions.retrieve(`${session_id}`);
    const subscription = await stripe.subscriptions.retrieve(
      session.subscription
    );

    const isUserPayment = UserPayment.findOne({ session: { _id: session_id } });

    // if(isUserPayment) return console.log("user paid")

    const newUserPayment = await UserPayment.create({
      userId: userId,
      session: {
        _id: session.id,
        status: session.status,
        userId: userId,
        createAt: session.created,
      },
      subscription: {
        userId: userId,
        customerId: subscription.customer,
        subscriptionId: subscription.id,
        priceId: subscription.items.data[0].price?.id,
        paymentMethodId: subscription.default_payment_method,
        status: subscription.status,
        currentPeriodEnd: subscription.items.data[0].current_period_end,
        isSubscribed: true,
        Plan: {
          priceId: subscription.plan.id,
          productId: subscription.plan.product,
          planName: subscription.plan.nickname,
          amount: subscription.plan.amount,
          currency: subscription.plan.currency,
          interval: subscription.plan.interval,
        },
      },
    });

    if (session.status === "complete") {
      await newUserPayment.save();
      return res.status(200).json({ session, subscription });
    }
  } catch (error) {
    console.log("Error:", error);
  }
};

const getUserPayment = async (req, res) => {
  try {
    const userId = req.params.userId;
    const userPayment = await UserPayment.findOne({ userId: userId });
    res.json(userPayment);
  } catch (error) {
    return error;
  }
};

const cancelUserPayment = async (req, res) => {
  try {
    const { userPaymentMongoDocId } = req.body;
    console.log('userPaymentMongoDocId:',userPaymentMongoDocId)
   await UserPayment.findOneAndDelete({_id: userPaymentMongoDocId});

    const { subscription_Id } = req.body;
    const deletedSubscription = await stripe.subscriptions.cancel(
      subscription_Id
    );
    res.json({
      success: true,
      message: "subscription cancelled successfully!",
      deletedSubscription,
    });
  } catch (error) {
    return error;
  }
};

module.exports = {
  createSubscription,
  saveSubscribtion,
  getUserPayment,
  cancelUserPayment,
};
