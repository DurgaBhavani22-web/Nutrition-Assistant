import { useEffect, useState } from "react";
import api from "../../api";
import UnavBar from "./UnavBar";

// Displays user data or profile information, and allows the
// customer to keep their personal details up to date.
export default function UserData() {
  const [profile, setProfile] = useState(null);
  const [error, setError] = useState("");
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    api
      .get("/users/profile")
      .then((res) => setProfile(res.data))
      .catch((err) => setError(err.response?.data?.message || "Failed to load profile"));
  }, []);

  const handleChange = (e) => setProfile({ ...profile, [e.target.name]: e.target.value });

  const handleSave = async (e) => {
    e.preventDefault();
    setSaved(false);
    try {
      const { data } = await api.put("/users/profile", {
        age: Number(profile.age),
        weight: Number(profile.weight),
        height: Number(profile.height),
        gender: profile.gender,
        activityLevel: profile.activityLevel,
      });
      setProfile(data.user);
      setSaved(true);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to update profile");
    }
  };

  if (error) return <div className="container error">{error}</div>;
  if (!profile) return <div className="container">Loading profile...</div>;

  return (
    <div>
      <UnavBar />
      <div className="container">
        <div className="card" style={{ maxWidth: 480 }}>
          <h2>My Profile</h2>
          <p>
            <strong>Username:</strong> {profile.username}
          </p>
          <p>
            <strong>Email:</strong> {profile.email}
          </p>
          <form onSubmit={handleSave}>
            <input
              name="age"
              type="number"
              value={profile.age || ""}
              onChange={handleChange}
              placeholder="Age"
            />
            <input
              name="weight"
              type="number"
              value={profile.weight || ""}
              onChange={handleChange}
              placeholder="Weight (kg)"
            />
            <input
              name="height"
              type="number"
              value={profile.height || ""}
              onChange={handleChange}
              placeholder="Height (cm)"
            />
            <select name="gender" value={profile.gender || "female"} onChange={handleChange}>
              <option value="female">Female</option>
              <option value="male">Male</option>
              <option value="other">Other</option>
            </select>
            <select
              name="activityLevel"
              value={profile.activityLevel || "sedentary"}
              onChange={handleChange}
            >
              <option value="sedentary">Sedentary</option>
              <option value="light">Lightly Active</option>
              <option value="moderate">Moderately Active</option>
              <option value="active">Active</option>
              <option value="very_active">Very Active</option>
            </select>
            <button type="submit">Save Changes</button>
          </form>
          {saved && <p style={{ color: "#2f9e44" }}>Profile updated!</p>}
        </div>
      </div>
    </div>
  );
}
