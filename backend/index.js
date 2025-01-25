const express = require("express");
const mongoose = require("mongoose");
require("./db/config");
const User = require("./db/User");
const app = express();

app.use(express.json());

app.post("/register", async (req, res) => {
  const user = new User(req.body);
  let result = await user.save();
  res.send(result);
});

const connectDb = async () => {
  try {
    mongoose.connect("mongodb://localhost:27017/e-commerce");
    const productModel = User;
    const data = await productModel.find();
    console.log(data);
  } catch (error) {
    console.error(error);
  }
};

connectDb()

app.listen(5000, () => {
  console.log("starting server....");
});
