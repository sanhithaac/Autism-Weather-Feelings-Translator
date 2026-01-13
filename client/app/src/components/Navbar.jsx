import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="bg-white border-b border-pink-200 px-8 py-4 flex justify-between items-center">
      {/* LEFT */}
      <div className="flex items-center gap-2">
        <span className="text-2xl">🌸</span>
        <h1 className="font-bold text-lg text-pink-600">
          Weather & Feelings
        </h1>
      </div>

      {/* CENTER LINKS */}
      <div className="flex gap-8 text-sm font-semibold text-gray-600">
        <Link to="/" className="hover:text-pink-500">Home</Link>
        <Link to="/checkin" className="hover:text-pink-500">Check-in</Link>
        <Link to="/weather-details" className="hover:text-pink-500">
          Weather Details
        </Link>
        <Link to="/dashboard" className="hover:text-pink-500">
          Dashboard
        </Link>
      </div>

      {/* RIGHT */}
      <Link
        to="/parent-login"
        className="bg-pink-100 text-pink-600 px-4 py-2 rounded-full text-sm font-bold"
      >
        Parent Login
      </Link>
    </nav>
  );
}
