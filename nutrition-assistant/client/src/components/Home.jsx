import { Link } from "react-router-dom";

// Component for the homepage/dashboard of the app.
export default function Home({ user }) {
  return (
    <div className="container">
      <div className="card">
        <h2>Welcome back{user?.username ? `, ${user.username}` : ""}!</h2>
        <p>Here's a quick overview of what you can do today.</p>
        <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
          <Link to="/plans/new">
            <button>Create a Diet Plan</button>
          </Link>
          <Link to="/suggestions/new">
            <button style={{ background: "#3b6ea5" }}>Get a Nutrition Suggestion</button>
          </Link>
          <Link to="/suggestions">
            <button style={{ background: "#444" }}>View Suggestions</button>
          </Link>
        </div>
      </div>
    </div>
  );
}
