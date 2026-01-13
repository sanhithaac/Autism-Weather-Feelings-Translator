import { useEffect, useState } from "react";
import api from "../services/api";

export default function ParentDashboard() {
  const [logs, setLogs] = useState([]);

  useEffect(() => {
    api.get("/emotions").then(res => setLogs(res.data));
  }, []);

  return (
    <div className="page">
      <h1 className="title">Emotional Weather Dashboard</h1>
      <p className="subtitle">
        Weekly overview of emotional patterns
      </p>

      <div className="card-grid">
        <div className="card">
          <h2>{logs.length}</h2>
          <p>Days Logged</p>
        </div>

        <div className="card">
          <h2>Sunny</h2>
          <p>Current Climate</p>
        </div>
      </div>

      <h2 style={{ marginTop: "40px" }}>Recent Entries</h2>

      {logs.map((log, index) => (
        <div
          key={index}
          style={{
            background: "#fff",
            padding: "14px",
            borderRadius: "12px",
            marginTop: "10px"
          }}
        >
          🌦️ {log.weather} → 💖 {log.emotion}
        </div>
      ))}
    </div>
  );
}
