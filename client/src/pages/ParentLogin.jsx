import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { authAPI } from "../services/api";

export default function ParentLogin() {
  const navigate = useNavigate();

  const [email, setEmail] = useState(""); // Email will be used as username for parents
  const [password, setPassword] = useState("");

  /* ---------- LOGIN ---------- */

  const handleLogin = async () => {
    if (!email || !password) {
      alert("Please fill all fields 🌸");
      return;
    }

    try {
      const response = await authAPI.login({
        username: email,
        password: password
      });

      if (response.data.user.role !== 'parent') {
        alert("This login is for parents only ❌");
        return;
      }

      localStorage.setItem("token", response.data.token);
      localStorage.setItem("parentLoggedIn", "true");
      localStorage.setItem("parentEmail", response.data.user.username);
      localStorage.setItem("loggedIn", "true");
      localStorage.setItem("userRole", "parent");

      navigate("/dashboard");
    } catch (err) {
      alert(err.response?.data?.message || "Invalid login details ❌");
    }
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-6">

      <div className="w-full max-w-4xl">

        {/* 🔙 BACK TO HOME */}
        <button
          onClick={() => navigate("/")}
          className="mb-6 text-primary font-semibold hover:underline flex items-center gap-2"
        >
          ← Back to Home
        </button>

        {/* LOGIN CARD */}
        <div className="bg-white rounded-3xl shadow-lg p-12 text-center">

          <div className="text-5xl mb-4">👨‍👩‍👧</div>

          <h1 className="text-3xl font-bold text-primary mb-2">
            Parent Login
          </h1>

          <p className="text-gray-600 mb-8">
            Access your child’s emotional dashboard 💗
          </p>

          <input
            type="email"
            placeholder="Parent Email"
            className="w-full border-2 border-primary/30 rounded-full px-6 py-4 mb-5 text-lg"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <input
            type="password"
            placeholder="Password"
            className="w-full border-2 border-primary/30 rounded-full px-6 py-4 mb-6 text-lg"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button
            onClick={handleLogin}
            className="w-full bg-primary hover:opacity-90 text-white py-4 rounded-full font-bold text-lg transition"
          >
            Login →
          </button>

          <p className="text-xs text-gray-500 mt-6">
            Password must include uppercase, lowercase, number & special character
          </p>
        </div>
      </div>
    </div>
  );
}
