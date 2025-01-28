const express = require("express");
const cors = require("cors");
const jwt = require("jsonwebtoken");
require("./db/config");
const User = require("./db/User");
const Product = require("./db/Product");
const jwtKey = "e-comm";
const app = express();

app.use(express.json());
app.use(cors());

// api for user registration
app.post("/register", async (req, res) => {
  const user = new User(req.body);
  let result = await user.save();
  result = result.toObject();
  delete result.password;
  jwt.sign({ result }, jwtKey, { expiresIn: "2h" }, (err, token) => {
    if (err) {
      res.send({ result: "something went wrong" });
    }
    res.send({ result, auth: token });
  });
});

// api for user login
app.post("/login", async (req, res) => {
  if (req.body.password && req.body.email) {
    // to hide password use .select('-password')
    let user = await User.findOne(req.body).select("-password");
    if (user) {
      jwt.sign({ user }, jwtKey, { expiresIn: "2h" }, (err, token) => {
        if (err) {
          res.send({ result: "something went wrong" });
        }
        res.send({ user, auth: token });
      });
    } else {
      res.send("No User Found");
    }
  } else {
    res.send("No User Found");
  }
});

// api for add product
app.post("/addProduct", verifyToken, async (req, res) => {
  const product = new Product(req.body);
  const result = await product.save();
  res.send(result);
});

// api for product list
app.get("/products", verifyToken, async (_, res) => {
  const response = await Product.find();
  res.send(response);
});

// api for delete product
app.delete("/deleteProduct/:id", verifyToken, async (req, res) => {
  const result = await Product.deleteOne({ _id: req.params.id });
  res.send(result);
});

// api for get single product
app.get("/product/:id", verifyToken, async (req, res) => {
  const result = await Product.findOne({ _id: req.params.id });
  if (result) {
    res.send(result);
  } else {
    res.send("No Product found with given id");
  }
});

// api for update product
app.put("/updateProduct/:id", verifyToken, async (req, res) => {
  const result = await Product.updateOne(
    {
      _id: req.params.id,
    },
    {
      $set: req.body,
    }
  );
  res.send(result);
});

// api for search product
app.get("/search/:key", verifyToken, async (req, res) => {
  const searchKey = req.params.key;

  const result = await Product.find({
    $or: [
      { name: { $regex: searchKey, $options: "i" } },
      { category: { $regex: searchKey, $options: "i" } },
      { company: { $regex: searchKey, $options: "i" } },
      { price: { $regex: searchKey } },
    ],
  });

  res.send(result);
});

// middleware for verity token (it must be a regular function not arrow function)
function verifyToken(req, res, next) {
  let token = req.headers["authorization"]; //this should be lowercase
  if (token) {
    token = token.split(" ")[1];
    jwt.verify(token, jwtKey, (err, valid) => {
      if (err) {
        res.status(401).send({ result: "Please provide valid token" });
      } else {
        next();
      }
    });
  } else {
    res.status(403).send({ result: "Please add token with header" });
  }
}

app.listen(5000, () => {
  console.log("starting server....");
});
