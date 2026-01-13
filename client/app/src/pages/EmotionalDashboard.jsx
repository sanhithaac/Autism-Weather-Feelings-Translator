import { useNavigate } from "react-router-dom";

export default function EmotionalDashboard() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-pink-50 px-6 py-10">
      {/* HEADER */}
      <div className="max-w-6xl mx-auto mb-10">
        <button
          onClick={() => navigate(-1)}
          className="mb-4 text-pink-600 font-semibold"
        >
          ← Back
        </button>

        <h1 className="text-4xl font-bold text-pink-700">
          Emotional Weather Dashboard
        </h1>
        <p className="text-gray-600 mt-2">
          A gentle overview of emotional patterns and growth.
        </p>
      </div>

      {/* SUMMARY CARDS */}
      <div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto mb-12">
        <SummaryCard title="Days Logged" value="7 / 7" sub="Full week 🌈" />
        <SummaryCard title="New Emotions" value="4" sub="This week" />
        <SummaryCard
          title="Current Climate"
          value="Sunny"
          sub="Calm & happy ☀️"
        />
      </div>

      {/* WEEKLY TREND */}
      <div className="max-w-6xl mx-auto bg-white rounded-3xl p-8 shadow mb-12">
        <h2 className="text-2xl font-bold mb-2">
          Weekly Emotional Trend
        </h2>
        <p className="text-gray-600 mb-6">
          Mapping emotions to gentle weather patterns
        </p>

        <div className="flex justify-between items-end h-40">
          {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map(
            (day, i) => (
              <div key={day} className="flex flex-col items-center">
                <div
                  className="w-8 rounded-full bg-pink-400"
                  style={{ height: `${40 + i * 10}px` }}
                ></div>
                <span className="mt-2 text-sm">{day}</span>
              </div>
            )
          )}
        </div>
      </div>

      {/* MILESTONES */}
      <div className="max-w-6xl mx-auto mb-12">
        <h2 className="text-2xl font-bold mb-6">
          Milestones Achieved 🌟
        </h2>

        <div className="grid md:grid-cols-2 gap-6">
          <Milestone
            icon="💗"
            title="Heartfelt Mist"
            desc="Expressed empathy"
          />
          <Milestone
            icon="🌫️"
            title="Gentle Fog"
            desc="Identified confusion"
          />
          <Milestone
            icon="☀️"
            title="Clear Skies"
            desc="Showed contentment"
          />
          <Milestone
            icon="🍃"
            title="Soft Breeze"
            desc="Recognized calmness"
          />
        </div>
      </div>

      {/* RECENT ACTIVITY */}
      <div className="max-w-6xl mx-auto bg-white rounded-3xl p-8 shadow">
        <h2 className="text-2xl font-bold mb-6">
          Recent Emotional Check-ins
        </h2>

        <table className="w-full text-left">
          <thead>
            <tr className="text-gray-500 text-sm border-b">
              <th className="pb-3">Weather</th>
              <th className="pb-3">Emotion</th>
              <th className="pb-3">Intensity</th>
              <th className="pb-3">Time</th>
            </tr>
          </thead>
          <tbody>
            <ActivityRow
              weather="⛈️ Storm"
              emotion="Overwhelmed"
              intensity="High"
              time="Today, 2:15 PM"
            />
            <ActivityRow
              weather="🌧️ Rain"
              emotion="Calm"
              intensity="Medium"
              time="Yesterday"
            />
            <ActivityRow
              weather="☀️ Sunny"
              emotion="Happy"
              intensity="Low"
              time="2 days ago"
            />
          </tbody>
        </table>
      </div>
    </div>
  );
}

/* ---------- SMALL COMPONENTS ---------- */

function SummaryCard({ title, value, sub }) {
  return (
    <div className="bg-white rounded-2xl p-6 shadow text-center">
      <h3 className="text-gray-500">{title}</h3>
      <div className="text-3xl font-bold my-2">{value}</div>
      <p className="text-pink-500 font-semibold">{sub}</p>
    </div>
  );
}

function Milestone({ icon, title, desc }) {
  return (
    <div className="bg-pink-100 rounded-2xl p-6 flex items-center gap-4">
      <div className="text-3xl">{icon}</div>
      <div>
        <h4 className="font-bold">{title}</h4>
        <p className="text-sm text-gray-600">{desc}</p>
      </div>
    </div>
  );
}

function ActivityRow({ weather, emotion, intensity, time }) {
  return (
    <tr className="border-b last:border-none">
      <td className="py-4">{weather}</td>
      <td className="py-4">{emotion}</td>
      <td className="py-4">{intensity}</td>
      <td className="py-4 text-gray-500">{time}</td>
    </tr>
  );
}
