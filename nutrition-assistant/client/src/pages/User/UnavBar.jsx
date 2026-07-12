import { Link } from "react-router-dom";

// Navigation bar for user pages.
export default function UnavBar() {
  return (
    <div className="navbar" style={{ background: "#2d3f34" }}>
      <span>My Account</span>
      <div>
        <Link to="/profile">Profile</Link>
        <Link to="/suggestions">My Suggestions</Link>
      </div>
    </div>
  );
}
