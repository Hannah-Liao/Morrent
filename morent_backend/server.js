const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");

// Connect to Express
const app = express();

// Connect to MongoDB

// Middleware
app.use(cors());
app.use(bodyParser.json());

// SCHEMA

// Routes
app.get("/message", (req, res) => {
  res.json({ message: "Hello from the server!" });
});

app.listen(3001);
