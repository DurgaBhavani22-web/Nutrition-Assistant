const express = require("express");
const router = express.Router();
const authMiddleware = require("../middlewares/authMiddleware");
const {
  createSuggestion,
  getMySuggestions,
  getSuggestionById,
  deleteSuggestion,
} = require("../controllers/SuggestedController");

// Defines API endpoints related to nutrition suggestions and links
// them to their controller functions.
router.post("/", authMiddleware, createSuggestion);
router.get("/", authMiddleware, getMySuggestions);
router.get("/:id", authMiddleware, getSuggestionById);
router.delete("/:id", authMiddleware, deleteSuggestion);

module.exports = router;
