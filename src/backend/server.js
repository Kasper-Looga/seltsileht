const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");
const Data = require("./models/Data.js");

const app = express();
const PORT = process.env.Port || 5000;

app.use(cors());
app.use(bodyParser.json());

const uri = "mongodb://localhost:27017/Data";
const uri2 = "mongodb://localhost:27017/Login";
mongoose
  .connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("Mongodb connected data"))
  .catch((err) => console.log(err, "MongoDb not connected data "));

mongoose
  .connect(uri2, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("Mongodb connected Login"))
  .catch((err) => console.log(err, "MongoDb not connected Login "));

app.get("/data", async (req, res) => {
  try {
    const data = await Data.find();
    console.log("Fetched Data", data);
    res.json(data);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});
app.get("/Login", async (req, res) => {
  try {
    const data = await Data.find();
    console.log("Fetched Data", data);
    res.json(data);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

app.listen(PORT, () => console.log("Server is running on Port 5000"));
