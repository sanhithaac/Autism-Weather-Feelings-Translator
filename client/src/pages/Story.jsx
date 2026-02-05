import { useState } from "react";
import { useNavigate } from "react-router-dom";

const STORIES = [
  {
    title: "Sunny the Happy Cloud ☀️",
    text: `
Sunny was a little cloud who loved bright days.
When the sun came out, Sunny felt warm and happy.
Birds sang, flowers danced, and Sunny smiled wide.
Happy feelings make the day feel bright and safe.
    `,
  },
  {
    title: "Rainy Day Calm 🌧️",
    text: `
One day, soft rain fell from the sky.
The rain made gentle sounds on the ground.
Everything slowed down and felt peaceful.
Rain helps us rest and feel calm inside.
    `,
  },
  {
    title: "Windy Thoughts 💨",
    text: `
The wind blew softly through the trees.
Leaves moved, and ideas moved too.
When the wind blows, it helps thoughts travel.
Thinking is good when we take it slow.
    `,
  },
  {
    title: "Excited Storm ⚡",
    text: `
A storm rolled in with energy and sound.
Thunder clapped, and rain danced quickly.
Sometimes excitement feels big and loud.
Taking deep breaths helps excitement feel safe.
    `,
  },
  {
    title: "Calm Cloud Sunset 🌸",
    text: `
As the sun set, the sky turned pink.
The cloud floated quietly, feeling peaceful.
Calm feelings help our body relax.
Quiet moments are special and kind.
    `,
  },
];

export default function Story() {
  const [index, setIndex] = useState(0);
  const navigate = useNavigate();

  const nextStory = () => {
    setIndex((prev) => (prev + 1) % STORIES.length);
  };

  const prevStory = () => {
    setIndex((prev) =>
      prev === 0 ? STORIES.length - 1 : prev - 1
    );
  };

  return (
    <div className="min-h-screen bg-background px-6 py-10">
      <div className="max-w-3xl mx-auto bg-white rounded-2xl p-8 shadow">
        <h1 className="text-3xl font-bold text-primary mb-4 text-center">
          📖 Story Mode
        </h1>

        <h2 className="text-2xl font-bold mb-4 text-center">
          {STORIES[index].title}
        </h2>

        <p className="text-text-muted leading-relaxed whitespace-pre-line mb-8 text-lg">
          {STORIES[index].text}
        </p>

        {/* CONTROLS */}
        <div className="flex justify-between items-center mb-6">
          <button
            onClick={prevStory}
            className="bg-primary/10 text-primary px-4 py-2 rounded-full font-bold hover:bg-primary/20 transition"
          >
            ⬅ Previous
          </button>

          <span className="text-sm text-text-muted">
            Story {index + 1} of {STORIES.length}
          </span>

          <button
            onClick={nextStory}
            className="bg-primary/10 text-primary px-4 py-2 rounded-full font-bold hover:bg-primary/20 transition"
          >
            Next ➡
          </button>
        </div>

        <div className="text-center">
          <button
            onClick={() => navigate("/checkin")}
            className="bg-primary text-white px-6 py-3 rounded-full font-bold hover:opacity-90 transition"
          >
            Back to Check-in
          </button>
        </div>
      </div>
    </div>
  );
}
