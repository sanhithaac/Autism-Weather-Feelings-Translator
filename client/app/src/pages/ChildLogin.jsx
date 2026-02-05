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
      const response = await authAPI.login({
        username: loginName,
        password: loginPassword
      });

      localStorage.setItem("token", response.data.token);
      localStorage.setItem("childName", response.data.user.username);
      localStorage.setItem("userRole", response.data.user.role);
      localStorage.setItem("loggedIn", "true");

      navigate("/checkin");
    } catch (err) {
      alert(err.response?.data?.message || "Invalid login details ❌");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-4">
      <div className="bg-white w-full max-w-4xl rounded-[3rem] p-12 shadow-2xl border-b-8 border-primary/20">
        <div className="text-center mb-10">
          <div className="text-7xl mb-4">🌤️</div>
          <h1 className="text-5xl font-bold text-primary mb-2">Welcome Back!</h1>
          <p className="text-xl text-gray-500">I've missed you! Let's talk about your day.</p>
        </div>

        <div className="max-w-md mx-auto space-y-6">
          <div className="text-left">
            <label className="block text-sm font-bold text-gray-700 mb-2 uppercase ml-4">Your Name</label>
            <input
              type="text"
              placeholder="e.g. Sunny"
              value={loginName}
              onChange={(e) => setLoginName(e.target.value)}
              className="w-full px-8 py-5 rounded-full border-2 border-gray-100 focus:border-primary focus:outline-none transition-all text-lg shadow-sm"
            />
          </div>

          <div className="text-left">
            <label className="block text-sm font-bold text-gray-700 mb-2 uppercase ml-4">Secret Key</label>
            <input
              type="password"
              placeholder="••••••••"
              value={loginPassword}
              onChange={(e) => setLoginPassword(e.target.value)}
              className="w-full px-8 py-5 rounded-full border-2 border-gray-100 focus:border-primary focus:outline-none transition-all text-lg shadow-sm"
            />
          </div>

          <button
            onClick={handleLogin}
            className="w-full bg-primary hover:bg-accent text-white py-5 rounded-full font-bold text-2xl shadow-xl transition-all transform hover:-translate-y-1 mt-4"
          >
            Let's Go! →
          </button>

          <div className="pt-8 border-t border-gray-100 text-center">
            <p className="text-gray-500 mb-4 font-medium">New here?</p>
            <button
              onClick={() => navigate("/signup")}
              className="px-10 py-3 rounded-full border-2 border-primary text-primary font-bold hover:bg-green-50 transition"
            >
              Apply for an Account 🌱
            </button>
          </div>

          <button
            onClick={() => navigate("/parent-login")}
            className="w-full text-sm text-gray-400 hover:text-primary transition underline"
          >
            Are you a parent? Click here
          </button>
        </div>
      </div>
    </div>
  );
}
