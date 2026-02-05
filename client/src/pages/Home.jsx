import { useNavigate } from "react-router-dom";

export default function Home() {
  const navigate = useNavigate();

  return (
    <div className="page">
      <h1 className="title">How is your weather today?</h1>
      <p className="subtitle">
        Pick the weather that matches your feeling
      </p>

      <div className="card-grid">
        <div className="card" onClick={() => navigate("/checkin")}>
          <div className="card-icon">☀️</div>
          <div className="card-label">Happy</div>
        </div>

        <div className="card" onClick={() => navigate("/checkin")}>
          <div className="card-icon">🌧️</div>
          <div className="card-label">Sad</div>
        </div>

        <div className="card" onClick={() => navigate("/checkin")}>
          <div className="card-icon">☁️</div>
          <div className="card-label">Calm</div>
        </div>

        <div className="card" onClick={() => navigate("/checkin")}>
          <div className="card-icon">🌪️</div>
          <div className="card-label">Silly</div>
        </div>
      </div>
    </div>
  );
}
