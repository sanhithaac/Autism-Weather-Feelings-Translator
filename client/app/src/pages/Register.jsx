import { useNavigate } from "react-router-dom";
import { useState } from "react";
import Navbar from "../components/Navbar";
import { authAPI } from "../services/api";

export default function Register() {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [password, setPassword] = useState("");

  const [loginName, setLoginName] = useState("");
  const [loginPassword, setLoginPassword] = useState("");

  const handleRegister = async () => {
    if (!name || !password) {
      alert("Please fill all fields 🌸");
      return;
    }

    try {
      const response = await authAPI.register({
        username: name,
        password: password,
        role: 'child'
      });

      localStorage.setItem("token", response.data.token);
      localStorage.setItem("childName", response.data.user.username);
      localStorage.setItem("userRole", response.data.user.role);
      localStorage.setItem("loggedIn", "true");

      navigate("/checkin");
    } catch (err) {
      alert(err.response?.data?.message || "Registration failed ❌");
    }
  };

  /* ---------- LOGIN ---------- */
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

    <>
      <Navbar />

      <div className="min-h-[calc(100vh-72px)] bg-background flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl w-full space-y-8">

          {/* TOP HERO */}
          <div className="bg-gradient-to-r from-green-100 to-blue-100 rounded-3xl p-8 text-center mb-6">
            <div className="text-5xl mb-4">🌞</div>
            <h1 className="text-3xl font-bold mb-2">
              Hi! I’m your Weather Friend 🌤️
            </h1>
            <p className="text-green-700">
              Let’s start your journey together!
            </p>
          </div>

          {/* TWO COLUMNS */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">

            {/* NEW ACCOUNT */}
            <div className="bg-white rounded-3xl p-8 shadow">
              <h2 className="text-2xl font-bold mb-6 text-center">
                🌱 New Account
              </h2>

              <input
                className="w-full border-2 border-primary/30 rounded-full px-6 py-3 mb-4"
                placeholder="Your name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />

              <input
                type="password"
                className="w-full border-2 border-primary/30 rounded-full px-6 py-3 mb-6"
                placeholder="Create a secret key"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />

              <button
                onClick={handleRegister}
                className="w-full bg-primary hover:opacity-90 text-white py-4 rounded-full font-bold transition-all"
              >
                Let’s Play →
              </button>
            </div>

            {/* EXISTING USER */}
            <div className="bg-white rounded-3xl p-8 shadow">
              <h2 className="text-2xl font-bold mb-6 text-center">
                🔑 Existing User
              </h2>

              <input
                className="w-full border-2 border-primary/30 rounded-full px-6 py-3 mb-4"
                placeholder="Your name"
                value={loginName}
                onChange={(e) => setLoginName(e.target.value)}
              />

              <input
                type="password"
                className="w-full border-2 border-primary/30 rounded-full px-6 py-3 mb-6"
                placeholder="Your secret key"
                value={loginPassword}
                onChange={(e) => setLoginPassword(e.target.value)}
              />

              <button
                onClick={handleLogin}
                className="w-full bg-green-500 hover:bg-green-600 text-white py-4 rounded-full font-bold"
              >
                Log In →
              </button>
            </div>

          </div>
        </div>
      </div>
    </>
  );
}
