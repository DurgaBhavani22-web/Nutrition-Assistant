import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../api";

// Page for submitting a new nutrition suggestion request. Calls the
// backend, which generates calorie/macro targets from the user's
// stored profile plus the chosen goal.
export default function NewSuggestion() {
  const [goal, setGoal] = useState("maintenance");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      await api.post("/suggestions", { goal });
      navigate("/suggestions");
    } catch (err) {
      setError(err.response?.data?.message || "Failed to generate suggestion");
    }
  };

  return (
    <div className="container">
      <div className="card" style={{ maxWidth: 420 }}>
        <h2>Get a Nutrition Suggestion</h2>
        {error && <div className="error">{error}</div>}
        <form onSubmit={handleSubmit}>
          <label>What's your goal?</label>
          <select value={goal} onChange={(e) => setGoal(e.target.value)}>
            <option value="weight_loss">Weight Loss</option>
            <option value="maintenance">Maintenance</option>
            <option value="muscle_gain">Muscle Gain</option>
          </select>
          <button type="submit">Generate Suggestion</button>
        </form>
      </div>
    </div>
  );
}
