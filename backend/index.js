const express = require("express");
const mongoose = require("mongoose");
const app = express();

const connectDb = async () => {
  try {
    mongoose.connect("mongodb://localhost:27017/e-comm");
    const productSchema = new mongoose.Schema({});
    const productModel = mongoose.model("products", productSchema);
    const data = await productModel.find();
    console.log(data);
  } catch (error) {
    console.error(error);
  }
};

connectDb();

app.listen(5000, () => {
  console.log("starting server....");
});
