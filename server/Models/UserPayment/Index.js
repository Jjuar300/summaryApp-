const mongoose = require('mongoose'); 

const UserPayment = new mongoose.Schema({
   userId: String, 
    session: {
        _id: String, 
        status: String, 
        userId: String, 
        createAt: Number, 
    }, 
    subscription: {
        userId: String, 
        customerId: String, 
        subscriptionId: String, 
        priceId: String, 
        paymentMethodId: String, 
        status: String, 
        currentPeriodEnd: Number, 
        isSubscribed: Boolean, 
        Plan: {
            priceId: String, 
            productId: String, 
            planName: String, 
            amount: Number, 
            currency: String, 
            interval: String, 
        }
    }

})

const UserPaymentModel = mongoose.model('userPayment', UserPayment); 
module.exports = UserPaymentModel