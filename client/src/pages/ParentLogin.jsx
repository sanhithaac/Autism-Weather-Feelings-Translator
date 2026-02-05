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

      <div className="w-full max-w-md">

        {/* 🔙 BACK TO HOME */}
        <button
          onClick={() => navigate("/")}
          className="mb-4 text-primary font-semibold hover:underline flex items-center gap-2 text-sm"
        >
          ← Back to Login
        </button>

        {/* LOGIN CARD */}
        <div className="bg-white rounded-[2.5rem] shadow-lg p-8 text-center border-b-8 border-primary/20">

          <div className="text-4xl mb-3">👨‍👩‍👧</div>

          <h1 className="text-3xl font-bold text-primary mb-1">
            Parent Login
          </h1>

          <p className="text-gray-500 mb-6 text-sm">
            Access your child’s emotional dashboard 💗
          </p>

          {/* DEMO CREDENTIALS BOX */}
          <div className="bg-blue-50 border-2 border-dashed border-primary/30 rounded-2xl p-4 mb-6">
            <p className="text-xs font-bold text-primary uppercase mb-2">🌟 Demo Parent Account</p>
            <p className="text-sm text-gray-700"><strong>Email:</strong> parent@cherry.com | <strong>Pass:</strong> Password123!</p>
          </div>

          <input
            type="email"
            placeholder="Parent Email"
            className="w-full border-2 border-primary/30 rounded-full px-6 py-3 mb-4 text-base"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <input
            type="password"
            placeholder="Password"
            className="w-full border-2 border-primary/30 rounded-full px-6 py-3 mb-6 text-base"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button
            onClick={handleLogin}
            className="w-full bg-primary hover:opacity-90 text-white py-3 rounded-full font-bold text-lg transition shadow-lg"
          >
            Login →
          </button>

          <p className="text-[10px] text-gray-400 mt-6 leading-tight">
            Password must include uppercase, lowercase, number & special character
          </p>
        </div>
      </div>
    </div>
  );
}
