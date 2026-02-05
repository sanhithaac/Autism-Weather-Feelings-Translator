import { useState } from "react";


const WEATHER_DATA = [
  {
    name: "Sunny",
    icon: "☀️",
    desc: "The sun is bright and the day feels warm.",
    feeling: "Happy and energetic",
    tips: ["🧢 Wear a cap", "🧴 Apply sunscreen", "👕 Light clothes"],
  },
  {
    name: "Rainy",
    icon: "🌧️",
    desc: "Rain is falling softly from the sky.",
    feeling: "Calm or sleepy",
    tips: ["☂️ Carry umbrella", "🧥 Raincoat", "👢 Waterproof shoes"],
  },
  {
    name: "Thunderstorm",
    icon: "⛈️",
    desc: "Loud thunder and dark clouds fill the sky.",
    feeling: "Scared or overwhelmed",
    tips: ["🏠 Stay indoors", "🎧 Use headphones", "🤗 Stay with an adult"],
  },
  {
    name: "Snowy",
    icon: "❄️",
    desc: "Snowflakes fall and the air feels cold.",
    feeling: "Quiet and cozy",
    tips: ["🧥 Thick jacket", "🧤 Gloves", "🧣 Scarf"],
  },
  {
    name: "Windy",
    icon: "🍃",
    desc: "Strong wind blows through the air.",
    feeling: "Restless or excited",
    tips: ["🧥 Light jacket", "👟 Covered shoes"],
  },
  {
    name: "Foggy",
    icon: "🌫️",
    desc: "The air looks cloudy and misty.",
    feeling: "Confused or sleepy",
    tips: ["👀 Walk carefully", "🤝 Hold an adult’s hand"],
  },
];

export default function WeatherDetails() {
  const [selectedWeather, setSelectedWeather] = useState(null);

  return (
    <div className="min-h-screen bg-slate-50">


      <div className="max-w-5xl mx-auto px-6 py-10">
        <h1 className="text-3xl font-bold text-center mb-4">
          How is the weather today?
        </h1>
        <p className="text-center text-gray-600 mb-10">
          Choose one weather to learn more about it.
        </p>

        {/* WEATHER SELECT BUTTONS */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {WEATHER_DATA.map((w) => (
            <button
              key={w.name}
              onClick={() => setSelectedWeather(w)}
              className={`px-6 py-3 rounded-full font-semibold transition
                ${selectedWeather?.name === w.name
                  ? "bg-primary text-white"
                  : "bg-surface border hover:bg-primary/10"
                }`}
            >
              {w.icon} {w.name}
            </button>
          ))}
        </div>

        {/* DETAILS SHOWN ONLY AFTER SELECTION */}
        {!selectedWeather ? (
          <div className="text-center text-gray-500 text-lg">
            👆 Select a weather above to see details
          </div>
        ) : (
          <div className="bg-white rounded-3xl shadow-lg p-8 max-w-3xl mx-auto">
            <div className="text-center mb-6">
              <div className="text-6xl mb-3">
                {selectedWeather.icon}
              </div>
              <h2 className="text-2xl font-bold mb-2">
                {selectedWeather.name}
              </h2>
              <p className="text-gray-600">
                {selectedWeather.desc}
              </p>
            </div>

            <div className="mb-6">
              <h3 className="font-semibold text-lg mb-2">
                How might it feel?
              </h3>
              <p className="bg-primary/10 inline-block px-4 py-2 rounded-full">
                {selectedWeather.feeling}
              </p>
            </div>

            <div>
              <h3 className="font-semibold text-lg mb-3">
                What should I do?
              </h3>
              <div className="flex flex-wrap gap-3">
                {selectedWeather.tips.map((tip) => (
                  <span
                    key={tip}
                    className="bg-blue-100 px-4 py-2 rounded-full text-sm"
                  >
                    {tip}
                  </span>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
