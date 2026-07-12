import { useEffect, useState } from "react";
import api from "../../api";

// Page for viewing suggested nutrition/diet plans that have been
// generated for the logged-in user.
export default function SuggestedNutrition() {
  const [suggestions, setSuggestions] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    api
      .get("/suggestions")
      .then((res) => setSuggestions(res.data))
      .catch((err) => setError(err.response?.data?.message || "Failed to load suggestions"));
  }, []);

  const handleDelete = async (id) => {
    await api.delete(`/suggestions/${id}`);
    setSuggestions((prev) => prev.filter((s) => s._id !== id));
  };

  return (
    <div className="container">
      <h2>Your Nutrition Suggestions</h2>
      {error && <div className="error">{error}</div>}
      {suggestions.length === 0 && !error && <p>No suggestions yet — generate one from Home.</p>}
      {suggestions.map((s) => (
        <div className="card" key={s._id}>
          <h3>{s.goal.replace("_", " ")}</h3>
          <p>
            <strong>Daily Calories:</strong> {s.dailyCalories} kcal
          </p>
          <p>
            <strong>Macros:</strong> {s.macros.protein}g protein / {s.macros.carbs}g carbs /{" "}
            {s.macros.fats}g fats
          </p>
          <ul>
            {s.tips.map((tip, i) => (
              <li key={i}>{tip}</li>
            ))}
          </ul>
          <button style={{ background: "#d9363e" }} onClick={() => handleDelete(s._id)}>
            Delete
          </button>
        </div>
      ))}
    </div>
  );
}
