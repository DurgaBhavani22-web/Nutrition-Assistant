require("dotenv").config();
const express = require("express");
const cors = require("cors");
const connectDB = require("./db/config");
const userRoute = require("./routes/userRoute");
const suggestionRoute = require("./routes/suggestionRoute");

const app = express();

// Connect to MongoDB via db/config.js
connectDB();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/users", userRoute);
app.use("/api/suggestions", suggestionRoute);

app.get("/", (req, res) => {
  res.send("Nutrition Assistant API is running");
});

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`Server listening on http://localhost:${PORT}`);
});
