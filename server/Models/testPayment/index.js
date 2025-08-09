const mongoose = require('mongoose')

const testPayment = new mongoose.Schema({
 email: String,
 name: String, 
 customerId: String, 
 hasAccess: Boolean, 
 priceId: String, 
 
})

const TestPayment = mongoose.model('testPayment', testPayment); 
module.exports = TestPayment; 
