import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import api from "../api";

// Page for new user registration. Collects username, email, age,
// weight, height, gender, and activity level, per the User entity.
export default function Register({ onLogin }) {
  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
    age: "",
    weight: "",
    height: "",
    gender: "female",
    activityLevel: "sedentary",
  });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      const { data } = await api.post("/users/register", {
        ...form,
        age: Number(form.age),
        weight: Number(form.weight),
        height: Number(form.height),
      });
      localStorage.setItem("token", data.token);
      onLogin?.(data.user);
      navigate("/home");
    } catch (err) {
      setError(err.response?.data?.message || "Registration failed");
    }
  };

  return (
    <div className="container">
      <div className="card" style={{ maxWidth: 480, margin: "0 auto" }}>
        <h2>Create Your Account</h2>
        {error && <div className="error">{error}</div>}
        <form onSubmit={handleSubmit}>
          <input name="username" placeholder="Username" onChange={handleChange} required />
          <input name="email" type="email" placeholder="Email" onChange={handleChange} required />
          <input
            name="password"
            type="password"
            placeholder="Password"
            onChange={handleChange}
            required
          />
          <input name="age" type="number" placeholder="Age" onChange={handleChange} required />
          <input
            name="weight"
            type="number"
            placeholder="Weight (kg)"
            onChange={handleChange}
            required
          />
          <input
            name="height"
            type="number"
            placeholder="Height (cm)"
            onChange={handleChange}
            required
          />
          <select name="gender" onChange={handleChange} value={form.gender}>
            <option value="female">Female</option>
            <option value="male">Male</option>
            <option value="other">Other</option>
          </select>
          <select name="activityLevel" onChange={handleChange} value={form.activityLevel}>
            <option value="sedentary">Sedentary</option>
            <option value="light">Lightly Active</option>
            <option value="moderate">Moderately Active</option>
            <option value="active">Active</option>
            <option value="very_active">Very Active</option>
          </select>
          <button type="submit">Register</button>
        </form>
        <p>
          Already have an account? <Link to="/login">Log in</Link>
        </p>
      </div>
    </div>
  );
}
