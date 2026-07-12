const mongoose = require("mongoose");

// SuggestionSchema: defines the schema for storing personalized
// nutrition suggestions generated for a user.
const SuggestionSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    goal: {
      type: String,
      enum: ["weight_loss", "maintenance", "muscle_gain"],
      required: true,
    },
    dailyCalories: {
      type: Number,
      required: true,
    },
    macros: {
      protein: { type: Number, required: true }, // grams
      carbs: { type: Number, required: true }, // grams
      fats: { type: Number, required: true }, // grams
    },
    tips: [
      {
        type: String,
      },
    ],
    startDate: {
      type: Date,
      default: Date.now,
    },
    endDate: {
      type: Date,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Suggestion", SuggestionSchema);
