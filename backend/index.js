const express = require("express");

const app = express();

app.get("/", (req, res) => {
  res.send("This is my homepage");
});

app.listen(5000, () => {
  console.log("starting server....");
});
