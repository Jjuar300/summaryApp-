require("dotenv").config();
const cors = require("cors");
const express = require("express");
const http = require("http");
const mongoose = require("mongoose");
const PORT = process.env.PORT || 3004;
const app = express();
const routes = require("./routes");
const Imagekit = require('imagekit'); 

app.use(cors("*"));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use("/api", routes);

try {
  mongoose.connect(process.env.DEV_MONGODB || process.env.MONGO_DATABASE)
  console.log('DB connected:')
} catch (error) {
  console.log(`${error}: did not connect`);
}

//imagekit

const imagekit = new Imagekit({
  urlEndpoint: process.env.VITE_IMAGEKIT_URL_KEY,
  publicKey: process.env.VITE_IMAGEKIT_PLUBLIC_KEY, 
  privateKey: process.env.VITE_IMAGEKIT_PRIVATE_KEY, 
});

app.get('/auth', (req,res) => {
  const result = imagekit.getAuthenticationParameters(); 
  res.send(result); 
})

app.listen(PORT, () => {
  console.log("SERVER RUNNING ON PORT: ", PORT);
});