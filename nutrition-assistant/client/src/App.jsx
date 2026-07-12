import { useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import LandingPage from "./pages/LandingPage.jsx";
import Login from "./pages/Login.jsx";
import Register from "./pages/Register.jsx";
import Home from "./components/Home.jsx";
import LNavbar from "./components/LNavbar.jsx";
import NewPlan from "./pages/Plans/NewPlan.jsx";
import NewSuggestion from "./pages/Plans/NewSuggestion.jsx";
import SuggestedNutrition from "./pages/Plans/SuggestedNutrition.jsx";
import UserData from "./pages/User/UserData.jsx";
import "./App.css";

function PrivateLayout({ user, onLogout, children }) {
  const token = localStorage.getItem("token");
  if (!token) return <Navigate to="/login" replace />;
  return (
    <div>
      <LNavbar onLogout={onLogout} />
      {children}
    </div>
  );
}

export default function App() {
  const [user, setUser] = useState(null);

  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/login" element={<Login onLogin={setUser} />} />
      <Route path="/register" element={<Register onLogin={setUser} />} />

      <Route
        path="/home"
        element={
          <PrivateLayout user={user} onLogout={() => setUser(null)}>
            <Home user={user} />
          </PrivateLayout>
        }
      />
      <Route
        path="/plans/new"
        element={
          <PrivateLayout user={user} onLogout={() => setUser(null)}>
            <NewPlan />
          </PrivateLayout>
        }
      />
      <Route
        path="/suggestions/new"
        element={
          <PrivateLayout user={user} onLogout={() => setUser(null)}>
            <NewSuggestion />
          </PrivateLayout>
        }
      />
      <Route
        path="/suggestions"
        element={
          <PrivateLayout user={user} onLogout={() => setUser(null)}>
            <SuggestedNutrition />
          </PrivateLayout>
        }
      />
      <Route
        path="/profile"
        element={
          <PrivateLayout user={user} onLogout={() => setUser(null)}>
            <UserData />
          </PrivateLayout>
        }
      />

      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
