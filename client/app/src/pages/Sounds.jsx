import { useNavigate } from "react-router-dom";

export default function Sounds() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-teal-100 flex items-center justify-center px-4">
      <div className="bg-white rounded-2xl p-8 shadow-lg max-w-md w-full text-center">
        <h1 className="text-3xl font-bold text-teal-600 mb-6">
          🌧️ Nature Sounds
        </h1>

        <audio controls className="w-full mb-6">
          <source
            src="https://www.soundjay.com/nature/rain-01.mp3"
            type="audio/mpeg"
          />
        </audio>

        <p className="text-gray-600 mb-6">
          Listen to calming rain and relax your mind 💙
        </p>

        <button
          onClick={() => navigate("/checkin")}
          className="bg-teal-500 text-white px-6 py-3 rounded-full font-bold hover:bg-teal-600 transition"
        >
          Back to Check-in
        </button>
      </div>
    </div>
  );
}
