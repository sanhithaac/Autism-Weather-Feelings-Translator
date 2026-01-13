import { useNavigate } from "react-router-dom";

export default function ChildLogin() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex items-center justify-center bg-pink-50 px-4">
      <div className="bg-white w-full max-w-md rounded-2xl p-8 shadow-lg">
        <h1 className="text-3xl font-bold text-center text-pink-600 mb-6">
          Welcome Back 🌤️
        </h1>

        <div className="space-y-4">
          <input
            type="text"
            placeholder="Your Name"
            className="w-full px-4 py-3 rounded-xl border focus:outline-none focus:ring-2 focus:ring-pink-400"
          />

          <input
            type="password"
            placeholder="Secret Key"
            className="w-full px-4 py-3 rounded-xl border focus:outline-none focus:ring-2 focus:ring-pink-400"
          />

          <button
            onClick={() => navigate("/checkin")}
            className="w-full bg-pink-500 text-white py-3 rounded-xl font-bold hover:bg-pink-600 transition"
          >
            Login
          </button>

          <button
            onClick={() => navigate("/")}
            className="w-full text-sm text-pink-500 underline mt-2"
          >
            Go back
          </button>
        </div>
      </div>
    </div>
  );
}
