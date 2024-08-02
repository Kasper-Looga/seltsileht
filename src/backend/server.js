const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const app = express();
const PORT = process.env.PORT || 5000;
const SECRET_KEY = "your_secret_key";

app.use(cors());
app.use(bodyParser.json());

// Connect to Data database
const dataConnection = mongoose.createConnection(
  "mongodb://localhost:27017/Data",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
);
dataConnection.once("open", () => console.log("Connected to Data DB"));

// Connect to Login database
const loginConnection = mongoose.createConnection(
  "mongodb://localhost:27017/Login",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
);
loginConnection.once("open", () => console.log("Connected to Login DB"));

// Import models using the respective connections
const Data = dataConnection.model("Data", require("./models/Data").schema);
const User = loginConnection.model("User", require("./models/User").schema);

// Fetch data route
app.get("/data", async (req, res) => {
  try {
    const data = await Data.find();
    res.json(data);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Fetch users route
app.get("/users", async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Register user route
app.post("/register", async (req, res) => {
  const { name, email, password } = req.body;
  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ name, email, password: hashedPassword });
    await user.save();
    res.status(201).json({ message: "User created successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Login user route
app.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Invalid email or password" });
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(400).json({ message: "Invalid email or password" });
    }
    const token = jwt.sign({ id: user._id }, SECRET_KEY, { expiresIn: "1h" });
    res.json({ token });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

app.listen(PORT, () => console.log(`Server is running on Port ${PORT}`));
