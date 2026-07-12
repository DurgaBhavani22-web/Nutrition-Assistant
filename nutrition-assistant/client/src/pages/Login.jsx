import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import api from "../api";

// Page for user login functionality.
export default function Login({ onLogin }) {
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      const { data } = await api.post("/users/login", form);
      localStorage.setItem("token", data.token);
      onLogin?.(data.user);
      navigate("/home");
    } catch (err) {
      setError(err.response?.data?.message || "Login failed");
    }
  };

  return (
    <div className="container">
      <div className="card" style={{ maxWidth: 420, margin: "0 auto" }}>
        <h2>Log In</h2>
        {error && <div className="error">{error}</div>}
        <form onSubmit={handleSubmit}>
          <input name="email" type="email" placeholder="Email" onChange={handleChange} required />
          <input
            name="password"
            type="password"
            placeholder="Password"
            onChange={handleChange}
            required
          />
          <button type="submit">Log In</button>
        </form>
        <p>
          No account? <Link to="/register">Register here</Link>
        </p>
      </div>
    </div>
  );
}
