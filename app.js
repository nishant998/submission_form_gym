const express = require("express");
const app = express();
const pug = require("pug");
const path = require("path");
const fs = require("fs");
// const {urlencoded} = require('express')
const port = 80;

app.use(express.static("Static")); //for static files
app.use(express.urlencoded());
// Pug
app.set("view engine", "pug");
//Set the view directory
app.set("views", path.join(__dirname, "views"));

//pug endpoints
app.get("/", (req, res) => {
  const con = "This is the best content so far";
  const params = { title: "National Gym Of India", content: con };
  res.status(200).render("home.pug", params);
});

// Taking output
app.post("/", (req, res) => {
  let response = {
    Fname: req.body.Fname,
    Lname: req.body.Lname,
    MoNo: req.body.MoNo,
    SGym: req.body.SGym,
  };
  console.log(response);
  let Myoutput = JSON.stringify(response);
  fs.appendFile("output.txt", Myoutput, function (err) {
    if (err) throw err;
  });
  const params = { message: "your form has been submitted sucessfully" };
  res.status(200).render("home.pug", params);
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
