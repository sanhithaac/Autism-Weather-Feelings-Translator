import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { authAPI } from "../services/api";

export default function ChildLogin() {
  const navigate = useNavigate();
  const [loginName, setLoginName] = useState("");
  const [loginPassword, setLoginPassword] = useState("");

  const handleLogin = async () => {
    if (!loginName || !loginPassword) {
      alert("Please fill all fields 🌸");
      return;
    }

    try {
      console.log("Attempting login for:", loginName);
      const response = await authAPI.login({
        username: loginName,
        password: loginPassword
      });

      console.log("Login successful!");
      localStorage.setItem("token", response.data.token);
      localStorage.setItem("childName", response.data.user.username);
      localStorage.setItem("userRole", response.data.user.role || "child");
      localStorage.setItem("loggedIn", "true");

      // Use window.location.hash for HashRouter to be extra safe
      window.location.hash = "/checkin";
    } catch (err) {
      console.error("Login Error:", err);
      alert(err.response?.data?.message || "Invalid login details ❌");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-4">
      <div className="bg-white w-full max-w-xl rounded-[2.5rem] p-8 shadow-2xl border-b-8 border-primary/20">
        <div className="text-center mb-8">
          <div className="text-6xl mb-3">🌤️</div>
          <h1 className="text-4xl font-bold text-primary mb-1">Welcome!</h1>
          <p className="text-lg text-gray-500">I've missed you! Let's talk about your day.</p>
        </div>

        <div className="max-w-md mx-auto space-y-5">
          {/* DEMO CREDENTIALS BOX */}
          <div className="bg-green-50 border-2 border-dashed border-primary/30 rounded-2xl p-4 mb-2">
            <p className="text-xs font-bold text-primary uppercase mb-2">🌟 Demo Login (for Sir)</p>
            <p className="text-sm text-gray-700"><strong>Name:</strong> Cherry | <strong>Secret:</strong> Password123!</p>
          </div>

          <div className="text-left">
            <label className="block text-xs font-bold text-gray-700 mb-1 uppercase ml-4">Your Name</label>
            <input
              type="text"
              placeholder="e.g. Sunny"
              value={loginName}
              onChange={(e) => setLoginName(e.target.value)}
              className="w-full px-6 py-4 rounded-full border-2 border-gray-100 focus:border-primary focus:outline-none transition-all text-base shadow-sm"
            />
          </div>

          <div className="text-left">
            <label className="block text-xs font-bold text-gray-700 mb-1 uppercase ml-4">Secret Key</label>
            <input
              type="password"
              placeholder="••••••••"
              value={loginPassword}
              onChange={(e) => setLoginPassword(e.target.value)}
              className="w-full px-6 py-4 rounded-full border-2 border-gray-100 focus:border-primary focus:outline-none transition-all text-base shadow-sm"
            />
          </div>

          <button
            onClick={handleLogin}
            className="w-full bg-primary hover:bg-accent text-white py-4 rounded-full font-bold text-xl shadow-xl transition-all transform hover:-translate-y-1 mt-2"
          >
            Let's Go! →
          </button>

          <div className="pt-6 border-t border-gray-100 text-center">
            <button
              onClick={() => navigate("/signup")}
              className="px-8 py-2 rounded-full border-2 border-primary text-primary font-bold hover:bg-green-50 transition text-sm"
            >
              Apply for an Account 🌱
            </button>
          </div>

          <button
            onClick={() => navigate("/parent-login")}
            className="w-full text-xs text-gray-400 hover:text-primary transition underline"
          >
            Are you a parent? Click here
          </button>
        </div>
      </div>
    </div>
  );
}
