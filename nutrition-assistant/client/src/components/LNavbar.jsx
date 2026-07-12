import { Link, useNavigate } from "react-router-dom";

// The logged-in user's navigation bar.
export default function LNavbar({ onLogout }) {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    onLogout?.();
    navigate("/login");
  };

  return (
    <nav className="navbar">
      <Link to="/home" style={{ fontWeight: 700, fontSize: "1.1rem" }}>
        Nutrition Assistant
      </Link>
      <div>
        <Link to="/home">Home</Link>
        <Link to="/plans/new">New Plan</Link>
        <Link to="/suggestions">Suggestions</Link>
        <Link to="/profile">Profile</Link>
        <a href="#" onClick={handleLogout}>
          Logout
        </a>
      </div>
    </nav>
  );
}
