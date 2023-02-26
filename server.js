const express = require("express");
require("dotenv").config();
const mongoose = require("mongoose");
const problemsRoutes = require("./routes/problemsRoutes");
const userRoutes = require("./routes/user");
const cors = require("cors");

//express app
const app = express();

// middleware & static files
app.use(express.static("public"));
app.use(express.json());
app.use(cors());

// middleware
app.use((req, res, next) => {
  // console.log(req.path, req.method);
  next();
});

// TODO: add routes here
app.use("/user", userRoutes);
app.use("/problems", problemsRoutes);

// routes
app.get("/", function (req, res) {
  // res.send("hi");
  // res.sendFile(__dirname + "/index.html");
});

const PORT = process.env.PORT || 4000;
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    // listen for requests
    app.listen(PORT, () => {
      console.log("Connected with DB and Server started on " + PORT);
    });
  })
  .catch((err) => {
    console.log(err);
  });
