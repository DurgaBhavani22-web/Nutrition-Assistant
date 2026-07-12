// Contains the core logic to generate personalized nutrition
// suggestions based on user input (age, weight, height, gender,
// activity level, and goal).

const ACTIVITY_MULTIPLIERS = {
  sedentary: 1.2,
  light: 1.375,
  moderate: 1.55,
  active: 1.725,
  very_active: 1.9,
};

const GOAL_CALORIE_ADJUSTMENT = {
  weight_loss: -500,
  maintenance: 0,
  muscle_gain: 300,
};

/**
 * Calculates Basal Metabolic Rate using the Mifflin-St Jeor equation.
 */
function calculateBMR({ weight, height, age, gender }) {
  const base = 10 * weight + 6.25 * height - 5 * age;
  if (gender === "male") return base + 5;
  if (gender === "female") return base - 161;
  return base - 78; // rough midpoint for "other"
}

/**
 * Generates a personalized nutrition suggestion (daily calories +
 * macro split + tips) for a given user profile and goal.
 */
function suggestNutrition(user, goal = "maintenance") {
  const { weight, height, age, gender, activityLevel } = user;

  if (!weight || !height || !age || !gender) {
    throw new Error("weight, height, age, and gender are required to generate a suggestion");
  }

  const bmr = calculateBMR({ weight, height, age, gender });
  const activityMultiplier = ACTIVITY_MULTIPLIERS[activityLevel] || 1.2;
  const maintenanceCalories = bmr * activityMultiplier;

  const adjustment = GOAL_CALORIE_ADJUSTMENT[goal] ?? 0;
  const dailyCalories = Math.max(1200, Math.round(maintenanceCalories + adjustment));

  // Macro split: protein 30%, carbs 40%, fats 30% (reasonable general default)
  const proteinCalories = dailyCalories * 0.3;
  const carbCalories = dailyCalories * 0.4;
  const fatCalories = dailyCalories * 0.3;

  const macros = {
    protein: Math.round(proteinCalories / 4), // 4 kcal/g
    carbs: Math.round(carbCalories / 4), // 4 kcal/g
    fats: Math.round(fatCalories / 9), // 9 kcal/g
  };

  const tips = buildTips(goal, activityLevel);

  return { dailyCalories, macros, tips, goal };
}

function buildTips(goal, activityLevel) {
  const tips = [
    "Stay hydrated — aim for at least 2 liters of water per day.",
    "Prioritize whole foods over heavily processed options.",
  ];

  if (goal === "weight_loss") {
    tips.push("Favor high-protein, high-fiber meals to stay full for longer.");
    tips.push("Track portion sizes rather than eliminating entire food groups.");
  } else if (goal === "muscle_gain") {
    tips.push("Spread protein intake evenly across meals to support muscle repair.");
    tips.push("Pair strength training with a slight calorie surplus.");
  } else {
    tips.push("Focus on consistency and balanced meals rather than strict restriction.");
  }

  if (activityLevel === "sedentary") {
    tips.push("Consider adding light daily movement, like a 20-30 minute walk.");
  }

  return tips;
}

module.exports = { suggestNutrition, calculateBMR };
