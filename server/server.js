const cors = require("cors");
const express = require("express");
const http = require("http");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const PORT = process.env.PORT || 3004;
const app = express();
const httpServer = http.createServer(app);
const routes = require("./routes/index");
const openAI = require('./openai/index')

dotenv.config();

httpServer.listen(PORT, () => {
  console.log("SERVER RUNNING ON PORT: ", PORT);
});

app.use(cors("*"));

app.use(express.json());
app.use("/", routes);

try {
  mongoose.connect(process.env.MONGO_DATABASE);
} catch (error) {
  console.log(`${error}: did not connect`);
}
