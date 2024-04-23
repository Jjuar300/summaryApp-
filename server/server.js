const express = require('express');
const app = express(); 
const http = require('http'); 
const PORT = process.env.PORT || 3004; 
const httpServer = http.createServer(app);
const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config(); 

httpServer.listen(PORT, () => {
    console.log('SERVER RUNNING ON PORT: ', PORT)
})


try{
    mongoose.connect(process.env.MONGO_DATABASE)
}catch(error){
    console.log(`${error}: did not connect`)
}

