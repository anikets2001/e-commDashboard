const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("./db/config");
const User = require("./db/User");
const app = express();

app.use(express.json());
app.use(cors());

app.post("/register", async (req, res) => {
  const user = new User(req.body);
  let result = await user.save();
  result = result.toObject();
  delete result.password;
  res.send(result);
});

app.post("/login", async (req, res) => {
  if (req.body.password && req.body.email) {
    // to hide password use .select('-password')
    let user = await User.findOne(req.body).select("-password");
    if (user) {
      res.send(user);
    } else {
      res.send("No User Found");
    }
  }else {
    res.send("No User Found")
  }
});

// const connectDb = async () => {
//   try {
//     mongoose.connect("mongodb://flocalhost:27017/e-commerce");
//     const productModel = User;
//     const data = await productModel.find();
//     console.log(data);
//   } catch (error) {
//     console.error(error);
//   }
// };

// connectDb()

app.listen(5000, () => {
  console.log("starting server....");
});
