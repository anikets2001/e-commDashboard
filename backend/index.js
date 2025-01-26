const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("./db/config");
const User = require("./db/User");
const Product = require("./db/Product");
const app = express();

app.use(express.json());
app.use(cors());

// api for user registration
app.post("/register", async (req, res) => {
  const user = new User(req.body);
  let result = await user.save();
  result = result.toObject();
  delete result.password;
  res.send(result);
});

// api for user login
app.post("/login", async (req, res) => {
  if (req.body.password && req.body.email) {
    // to hide password use .select('-password')
    let user = await User.findOne(req.body).select("-password");
    if (user) {
      res.send(user);
    } else {
      res.send("No User Found");
    }
  } else {
    res.send("No User Found");
  }
});

// api for add product
app.post("/addProduct", async (req, res) => {
  const product = new Product(req.body);
  const result = await product.save();
  res.send(result);
});

// api for product list
app.get("/products", async (req, res) => {
  const response = await Product.find();
  res.send(response);
});

app.listen(5000, () => {
  console.log("starting server....");
});
