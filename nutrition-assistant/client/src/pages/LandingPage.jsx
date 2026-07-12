import { Link } from "react-router-dom";

// Public landing page for the app.
export default function LandingPage() {
  return (
    <div className="container">
      <div className="card">
        <h1>Nutrition Assistant</h1>
        <p>
          Track your meals, build personalized diet plans, and get
          nutrition recommendations tailored to your goals.
        </p>
        <div style={{ display: "flex", gap: 12 }}>
          <Link to="/register">
            <button>Get Started</button>
          </Link>
          <Link to="/login">
            <button style={{ background: "#444" }}>Log In</button>
          </Link>
        </div>
      </div>
    </div>
  );
}
