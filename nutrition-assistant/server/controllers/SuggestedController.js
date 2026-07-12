const User = require("../models/User");
const Suggestion = require("../models/Suggestion");
const { suggestNutrition } = require("../utils/suggestNutrition");

// Handles logic for creating and retrieving nutrition suggestions
// for users.

// POST /api/suggestions  (protected)
// body: { goal: "weight_loss" | "maintenance" | "muscle_gain", endDate? }
exports.createSuggestion = async (req, res) => {
  try {
    const { goal = "maintenance", endDate } = req.body;

    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const result = suggestNutrition(user, goal);

    const suggestion = await Suggestion.create({
      userId: user._id,
      goal: result.goal,
      dailyCalories: result.dailyCalories,
      macros: result.macros,
      tips: result.tips,
      endDate,
    });

    return res.status(201).json({ message: "Suggestion created", suggestion });
  } catch (error) {
    return res.status(400).json({ message: "Failed to create suggestion", error: error.message });
  }
};

// GET /api/suggestions  (protected) - all suggestions for the logged-in user
exports.getMySuggestions = async (req, res) => {
  try {
    const suggestions = await Suggestion.find({ userId: req.user.id }).sort({ createdAt: -1 });
    return res.status(200).json(suggestions);
  } catch (error) {
    return res.status(500).json({ message: "Failed to fetch suggestions", error: error.message });
  }
};

// GET /api/suggestions/:id  (protected)
exports.getSuggestionById = async (req, res) => {
  try {
    const suggestion = await Suggestion.findOne({
      _id: req.params.id,
      userId: req.user.id,
    });

    if (!suggestion) {
      return res.status(404).json({ message: "Suggestion not found" });
    }

    return res.status(200).json(suggestion);
  } catch (error) {
    return res.status(500).json({ message: "Failed to fetch suggestion", error: error.message });
  }
};

// DELETE /api/suggestions/:id  (protected)
exports.deleteSuggestion = async (req, res) => {
  try {
    const suggestion = await Suggestion.findOneAndDelete({
      _id: req.params.id,
      userId: req.user.id,
    });

    if (!suggestion) {
      return res.status(404).json({ message: "Suggestion not found" });
    }

    return res.status(200).json({ message: "Suggestion deleted" });
  } catch (error) {
    return res.status(500).json({ message: "Failed to delete suggestion", error: error.message });
  }
};
