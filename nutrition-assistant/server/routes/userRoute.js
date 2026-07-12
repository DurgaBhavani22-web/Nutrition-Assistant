const express = require("express");
const router = express.Router();
const authMiddleware = require("../middlewares/authMiddleware");
const {
  registerUser,
  loginUser,
  getProfile,
  updateProfile,
} = require("../controllers/userController");

// Defines user-related API endpoints and connects them with
// user controller functions.
router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/profile", authMiddleware, getProfile);
router.put("/profile", authMiddleware, updateProfile);

module.exports = router;
