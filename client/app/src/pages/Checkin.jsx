import { useNavigate } from "react-router-dom";
import { useState } from "react";


export default function Checkin() {
  const navigate = useNavigate();

  /* ---------------- OPTIONS ---------------- */

  const WEATHER_OPTIONS = [
    { key: "Sunny", icon: "☀️", desc: "Bright and warm" },
    { key: "Rainy", icon: "💧", desc: "Soft blue rain" },
    { key: "Calm Cloud", icon: "🌸", desc: "Gentle pink sunset" },
    { key: "Windy", icon: "🍃", desc: "Breezy and cool" },
  ];

  const FEELING_OPTIONS = [
    { key: "Happy", icon: "😊", desc: "I feel sunshine" },
    { key: "Calm", icon: "😌", desc: "Quiet like sunset" },
    { key: "Excited", icon: "🤩", desc: "Full of energy" },
    { key: "Thinking", icon: "🤔", desc: "Cool and breezy" },
  ];

  /* ---------------- STATE ---------------- */

  const [weather, setWeather] = useState(null);
  const [feeling, setFeeling] = useState(null);

  /* ---------------- ACTION ---------------- */

  const goToMatch = () => {
    if (!weather || !feeling) {
      alert("Please select one weather and one feeling 🌈");
      return;
    }

    navigate("/match", {
      state: { weather, feeling },
    });
  };

  return(
  <div className="min-h-screen bg-green-50">
     
    <div className="min-h-screen bg-green-50 px-6 py-10">
      {/* TITLE */}
      <h1 className="text-4xl font-bold text-center text-green-800 mb-2">
        Let’s explore together!
      </h1>

      <p className="text-center text-green-600 mb-12 max-w-2xl mx-auto">
        Choose a weather and a feeling to see how they match.
        Everything is calm and safe here.
      </p>

      {/* WEATHER + FEELING */}
      <div className="grid md:grid-cols-2 gap-10 max-w-5xl mx-auto mb-16">
        {/* WEATHER */}
        <div className="bg-white rounded-2xl p-6 shadow">
          <h2 className="text-xl font-bold mb-6">🌤️ How is the Weather?</h2>

          <div className="grid grid-cols-2 gap-6">
            {WEATHER_OPTIONS.map((w) => (
              <SelectCard
                key={w.key}
                icon={w.icon}
                title={w.key}
                desc={w.desc}
                selected={weather?.key === w.key}
                onClick={() => setWeather(w)}
              />
            ))}
          </div>
        </div>

        {/* FEELINGS */}
        <div className="bg-white rounded-2xl p-6 shadow">
          <h2 className="text-xl font-bold mb-6">😊 How do I Feel?</h2>

          <div className="grid grid-cols-2 gap-6">
            {FEELING_OPTIONS.map((f) => (
              <SelectCard
                key={f.key}
                icon={f.icon}
                title={f.key}
                desc={f.desc}
                selected={feeling?.key === f.key}
                onClick={() => setFeeling(f)}
              />
            ))}
          </div>
        </div>
      </div>

      {/* MATCH BOX */}
      <div className="max-w-4xl mx-auto bg-pink-100 border-2 border-dashed border-pink-400 rounded-2xl p-10 text-center mb-20">
        <div className="text-4xl mb-4">
          {weather ? weather.icon : "❓"} + {feeling ? feeling.icon : "❓"}
        </div>

        <h3 className="text-2xl font-bold mb-2">
          Match your weather to a feeling!
        </h3>

        <p className="text-green-700 mb-6">
          Select one from each side to see what they have in common.
        </p>

        <button
          onClick={goToMatch}
          className="bg-pink-500 hover:bg-pink-600 text-white px-10 py-4 rounded-full font-bold text-lg transition"
        >
          Check My Match
        </button>
      </div>

      {/* ACTIVITIES */}
      <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
        <ActivityCard
          title="Story Mode"
          desc="Read stories about weather and emotions."
          emoji="📖"
          color="bg-indigo-200"
          onClick={() => navigate("/story")}
        />

        <ActivityCard
          title="Drawing Board"
          desc="Draw how you feel today."
          emoji="🎨"
          color="bg-pink-200"
          onClick={() => navigate("/draw")}
        />

        <ActivityCard
          title="Nature Sounds"
          desc="Listen to calming rain and wind."
          emoji="🌧️"
          color="bg-teal-200"
          onClick={() => navigate("/sounds")}
        />
      </div>
    </div>
    </div>

  );
}

/* ---------------- COMPONENTS ---------------- */

function SelectCard({ icon, title, desc, selected, onClick }) {
  return (
    <button
      onClick={onClick}
      className={`rounded-xl p-6 text-center transition border
        ${
          selected
            ? "bg-green-200 border-green-400 ring-4 ring-green-300"
            : "bg-green-50 border-transparent hover:bg-green-100"
        }`}
    >
      <div className="text-3xl mb-2">{icon}</div>
      <div className="font-bold">{title}</div>
      <div className="text-sm text-green-600">{desc}</div>
    </button>
  );
}

function ActivityCard({ title, desc, emoji, color, onClick }) {
  return (
    <div
      onClick={onClick}
      className={`${color} cursor-pointer rounded-2xl p-10 text-center hover:scale-105 transition`}
    >
      <div className="text-4xl mb-4">{emoji}</div>
      <h3 className="font-bold text-lg mb-2">{title}</h3>
      <p className="text-sm">{desc}</p>
    </div>
  );
}
