const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    const uri = process.env.MONGO_URI || "mongodb://localhost:27017/Nutrition_Assistant";
    await mongoose.connect(uri);
    console.log("MongoDB connected:", uri);
  } catch (error) {
    console.error("MongoDB connection error:", error.message);
    console.warn("⚠️  Server will continue running, but database operations may fail.");
    console.warn("📌 Please ensure MongoDB is running on:", process.env.MONGO_URI || "mongodb://localhost:27017/Nutrition_Assistant");
  }
};

module.exports = connectDB;
