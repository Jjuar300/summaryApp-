require("dotenv").config();
const cors = require("cors");
const express = require("express");
const mongoose = require("mongoose");
const PORT = process.env.PORT || 3004;
const app = express();
const routes = require("./routes");

app.use(cors("*"));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());


try {
  mongoose.connect(process.env.DEV_MONGODB || process.env.MONGO_DATABASE)
  console.log('DB connected:')
} catch (error) {
  console.log(`${error}: did not connect`);
}

app.use("/api", routes);

app.listen(PORT, () => {
  console.log("SERVER RUNNING ON PORT: ", PORT);
});