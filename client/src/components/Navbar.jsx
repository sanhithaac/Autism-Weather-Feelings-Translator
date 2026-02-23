import { useNavigate, useLocation } from "react-router-dom";

export default function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();

  // Check if we are on home/register page
  const isHomePage = location.pathname === "/";

  return (
    <nav className="bg-white border-b border-gray-200 px-8 py-4 flex justify-between items-center bg-surface">

      {/* LOGO */}
      <div
        className="font-bold text-primary text-lg cursor-pointer"
        onClick={() => navigate("/")}
      >
        🌤️ Weather Feelings
      </div>

      {/* RIGHT SIDE */}
      <div className="flex items-center gap-6">

        {/* SHOW FULL MENU ONLY IF NOT HOME */}
        {!isHomePage && (
          <>
            <button
              onClick={() => navigate("/")}
              className="text-text-muted hover:text-primary transition-colors duration-200"
            >
              Home
            </button>

            <button
              onClick={() => navigate("/checkin")}
              className="text-text-muted hover:text-primary transition-colors duration-200"
            >
              Check-in
            </button>

            <button
              onClick={() => navigate("/weather-details")}
              className="text-text-muted hover:text-primary transition-colors duration-200"
            >
              Weather Details
            </button>

            <button
              onClick={() => navigate("/dashboard")}
              className="text-text-muted hover:text-primary transition-colors duration-200"
            >
              Dashboard
            </button>
            <button
              onClick={() => navigate("/helping-hand")}
              className="text-text-muted hover:text-primary transition-colors duration-200"
            >
              Helping Hand
            </button>
            <button
              onClick={() => navigate("/math-games")}
              className="text-text-muted hover:text-primary transition-colors duration-200"
            >
              Math Games
            </button>
          </>
        )}

        {/* PARENT LOGIN ALWAYS VISIBLE */}
        <button
          onClick={() => navigate("/parent-login")}
          className="bg-primary hover:opacity-90 text-white px-4 py-2 rounded-full font-semibold transition-all duration-200"
        >
          Parent Login
        </button>
      </div>
    </nav>
  );
}
