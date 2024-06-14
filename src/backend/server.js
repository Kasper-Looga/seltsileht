const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");
const tekst = require("./models/Tekst.js");

const app = express();
const PORT = process.env.Port || 5000;

app.use(cors());
app.use(bodyParser.json());

const uri = "mongodb://localhost:27017/Seltsilehe_tekst"
mongoose.connect(uri,{useNewUrlParser: true, useUnifiedTopology: true})
    .then(() => console.log("Mongodb connected"))
    .catch(err => console.log(err, "MongoDb not connected"))

app.get("/tekst", async(req,res) => {
    try{
        const Tekst = await tekst.find()
        res.json(Tekst)
    } catch(err){
        res.status(500).json({message: err.message});
    }
});

app.listen(PORT, () => console.log("Server is running on Port 5000"));