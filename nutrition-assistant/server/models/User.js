const mongoose = require("mongoose");

// UserSchema: defines the schema for user data including email,
// password, and other profile info (age, weight, height, gender,
// activity level) as described in the ER diagram.
const UserSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
    },
    age: {
      type: Number,
    },
    weight: {
      // kilograms
      type: Number,
    },
    height: {
      // centimeters
      type: Number,
    },
    gender: {
      type: String,
      enum: ["male", "female", "other"],
    },
    activityLevel: {
      type: String,
      enum: ["sedentary", "light", "moderate", "active", "very_active"],
      default: "sedentary",
    },
    role: {
      type: String,
      enum: ["customer", "admin"],
      default: "customer",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", UserSchema);
