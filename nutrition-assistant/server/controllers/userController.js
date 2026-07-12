const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const mockDB = require("../db/mockDB");
const mongoose = require("mongoose");

// Manages user-related actions like registration, login, and
// fetching/updating user profiles.

const generateToken = (user) =>
  jwt.sign({ id: user._id, email: user.email, role: user.role || "customer" }, process.env.JWT_SECRET, {
    expiresIn: "7d",
  });

// Check if MongoDB is connected
const isMongoDBConnected = () => {
  return mongoose.connection.readyState === 1;
};

// POST /api/users/register
exports.registerUser = async (req, res) => {
  try {
    const { username, email, password, age, weight, height, gender, activityLevel } = req.body;

    if (!username || !email || !password) {
      return res.status(400).json({ message: "username, email, and password are required" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    let user;
    
    if (isMongoDBConnected()) {
      // Use MongoDB
      const existing = await User.findOne({ $or: [{ email }, { username }] });
      if (existing) {
        return res.status(409).json({ message: "User with that email or username already exists" });
      }

      user = await User.create({
        username,
        email,
        password: hashedPassword,
        age,
        weight,
        height,
        gender,
        activityLevel,
      });
    } else {
      // Use mock database
      const existing = await mockDB.findUserByEmailOrUsername(email, username);
      if (existing) {
        return res.status(409).json({ message: "User with that email or username already exists" });
      }

      user = await mockDB.createUser({
        username,
        email,
        password: hashedPassword,
        age,
        weight,
        height,
        gender,
        activityLevel,
        role: "customer",
      });
    }

    const token = generateToken(user);

    return res.status(201).json({
      message: "User registered successfully",
      token,
      user: sanitizeUser(user),
    });
  } catch (error) {
    return res.status(500).json({ message: "Registration failed", error: error.message });
  }
};

// POST /api/users/login
exports.loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "email and password are required" });
    }

    let user;

    if (isMongoDBConnected()) {
      // Use MongoDB
      user = await User.findOne({ email });
    } else {
      // Use mock database
      user = await mockDB.findUserByEmail(email);
    }

    if (!user) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const token = generateToken(user);

    return res.status(200).json({
      message: "Login successful",
      token,
      user: sanitizeUser(user),
    });
  } catch (error) {
    return res.status(500).json({ message: "Login failed", error: error.message });
  }
};

// GET /api/users/profile  (protected)
exports.getProfile = async (req, res) => {
  try {
    let user;

    if (isMongoDBConnected()) {
      // Use MongoDB
      user = await User.findById(req.user.id).select("-password");
    } else {
      // Use mock database
      user = await mockDB.findUserById(req.user.id);
      if (user) {
        delete user.password;
      }
    }

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    return res.status(200).json(user);
  } catch (error) {
    return res.status(500).json({ message: "Failed to fetch profile", error: error.message });
  }
};

// PUT /api/users/profile  (protected)
exports.updateProfile = async (req, res) => {
  try {
    const updates = { ...req.body };
    delete updates.password; // password changes should go through a dedicated flow
    delete updates.email;
    delete updates.role;

    let user;

    if (isMongoDBConnected()) {
      // Use MongoDB
      user = await User.findByIdAndUpdate(req.user.id, updates, {
        new: true,
        runValidators: true,
      }).select("-password");
    } else {
      // Use mock database
      user = await mockDB.updateUser(req.user.id, updates);
      delete user.password;
    }

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    return res.status(200).json({ message: "Profile updated", user });
  } catch (error) {
    return res.status(500).json({ message: "Failed to update profile", error: error.message });
  }
};

function sanitizeUser(user) {
  // Handle both Mongoose models and plain objects (from mock DB)
  const obj = user.toObject ? user.toObject() : user;
  delete obj.password;
  return obj;
}
