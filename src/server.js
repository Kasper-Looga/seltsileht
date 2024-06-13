//express is web framework for Node.js that siplifies building web applications and API
const express = require("express")
const mongoose = require("mongoose")
const Item = require("./models/Item.js") // create the Item model
// mongoose an ODM library for MongoDB and Node.js
const cors =require("cors")
// a middleware that allows server to accept requests from diffrent origins

const app = express();
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log("server running on port " + PORT));

//app we create an instanse of an express application
// the server will listen for incoming requests

app.use(cors());
// enables CORS which allows react app to make requests to the backend

app.use(express.json())
// middleware that parses incoming JSON requests and puts the parsed data in req.body

//connectiong to MONGODB
mongoose.connect("mongodb://localhost:27017/Seltsilehe_tekst",{
    useNewUrlParser: true,
    useUnifiedTopology: true,
    
});
// mongoose. connection connects to the database using the connection strings and the options use are there to handle warnings


const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error"))
db.once('open', () =>{
    console.log("Connected to MongoDb")
})

//db holds the connection to the database and db.on listens for connection errors and lohs them n console and db.once logs a sucess message once open


// defining a schema and model
/* const textSchema = new mongoose.Schema({
    content: String,
}); */

const Text = require("./models/Text.js")


//textschema defines the structure of the dcuments in the texts collection each document has a content field of string type
//Tet a mongoose model based on textschema representing the "texts" collection in the database

//DEFINING ROUTES
app.get("/api/text", async (req, res) => {
    try{

        const texts = await Text.find().exec();
        console.log("texts = " + texts);
        
        res.json(texts);
        
    }catch(error){
        console.error(error);
        res.status(500).send("Server Error");
    }
});
// app.get defines the GET endpoint at /api/text
//async an asynchronous route handler that functions


module.export = mongoose.model("tekst", Text)