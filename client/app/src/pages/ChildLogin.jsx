import { useNavigate } from "react-router-dom";

export default function ChildLogin() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-4">
      <div className="bg-white w-full max-w-4xl rounded-2xl p-8 shadow-lg">
        <h1 className="text-3xl font-bold text-center text-primary mb-6">
          Welcome Back 🌤️
        </h1>

        <div className="space-y-4">
          <input
            type="text"
            placeholder="Your Name"
            className="w-full px-4 py-3 rounded-xl border focus:outline-none focus:ring-2 focus:ring-primary/50"
          />

          <input
            type="password"
            placeholder="Secret Key"
            className="w-full px-4 py-3 rounded-xl border focus:outline-none focus:ring-2 focus:ring-primary/50"
          />

          <button
            onClick={() => navigate("/checkin")}
            className="w-full bg-primary text-white py-3 rounded-xl font-bold hover:opacity-90 transition"
          >
            Login
          </button>

          <button
            onClick={() => navigate("/")}
            className="w-full text-sm text-primary underline mt-2"
          >
            Go back
          </button>
        </div>
      </div>
    </div>
  );
}
