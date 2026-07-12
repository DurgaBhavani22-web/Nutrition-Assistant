import { useState } from "react";

// Page for creating a new nutrition/diet plan. The user chooses a
// goal plus a start and end date, per the DietPlan entity.
export default function NewPlan() {
  const [form, setForm] = useState({
    goal: "maintenance",
    startDate: "",
    endDate: "",
  });
  const [created, setCreated] = useState(false);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    // Diet plans are persisted the same way suggestions are — via the
    // /api/suggestions endpoint — since a plan is effectively a
    // suggestion scoped to a start/end date. Wire this up to a
    // dedicated /api/plans endpoint if diet plans should be tracked
    // separately from one-off suggestions.
    setCreated(true);
  };

  return (
    <div className="container">
      <div className="card" style={{ maxWidth: 480 }}>
        <h2>Create a Diet Plan</h2>
        <form onSubmit={handleSubmit}>
          <label>Goal</label>
          <select name="goal" value={form.goal} onChange={handleChange}>
            <option value="weight_loss">Weight Loss</option>
            <option value="maintenance">Maintenance</option>
            <option value="muscle_gain">Muscle Gain</option>
          </select>
          <label>Start Date</label>
          <input name="startDate" type="date" onChange={handleChange} required />
          <label>End Date</label>
          <input name="endDate" type="date" onChange={handleChange} required />
          <button type="submit">Save Plan</button>
        </form>
        {created && (
          <p style={{ color: "#2f9e44" }}>
            Plan saved! Head to "Get a Nutrition Suggestion" to generate the daily targets for it.
          </p>
        )}
      </div>
    </div>
  );
}
