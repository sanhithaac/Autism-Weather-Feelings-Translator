import { useNavigate } from "react-router-dom";
import { useState } from "react";
import Navbar from "../components/Navbar";
import { authAPI } from "../services/api";

export default function Register() {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [password, setPassword] = useState("");

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

  return (
    <>
      <Navbar />

      <div className="min-h-[calc(100vh-72px)] bg-background flex items-center justify-center py-12 px-4">
        <div className="min-h-[calc(100vh-72px)] bg-background flex items-center justify-center py-8 px-4">
          <div className="max-w-md w-full">

            <div className="bg-white rounded-[2.5rem] shadow-2xl overflow-hidden border-b-8 border-primary/20 p-8">
              <div className="text-center mb-8">
                <div className="text-6xl mb-4">🌱</div>
                <h1 className="text-3xl font-bold text-gray-800 mb-2">Join Us!</h1>
                <p className="text-gray-500">Create your special account 💗</p>
              </div>

              <div className="space-y-5">
                <div className="text-left">
                  <label className="block text-xs font-bold text-gray-700 mb-1 uppercase ml-4">What's your name?</label>
                  <input
                    className="w-full bg-green-50 border-2 border-transparent focus:border-primary focus:bg-white rounded-full px-6 py-3 transition-all outline-none text-base"
                    placeholder="Your name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>

                <div className="text-left">
                  <label className="block text-xs font-bold text-gray-700 mb-1 uppercase ml-4">Secret Key</label>
                  <input
                    type="password"
                    className="w-full bg-green-50 border-2 border-transparent focus:border-primary focus:bg-white rounded-full px-6 py-3 transition-all outline-none text-base"
                    placeholder="Make it easy to remember!"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>

                <button
                  onClick={handleRegister}
                  className="w-full bg-primary hover:bg-accent text-white py-4 rounded-full font-bold text-xl shadow-xl transition-all transform hover:-translate-y-1 mt-4"
                >
                  Let’s Play →
                </button>

                <div className="text-center pt-4">
                  <span className="text-sm text-gray-500">Already have an account? </span>
                  <button
                    onClick={() => navigate("/")}
                    className="text-sm text-primary font-bold hover:underline"
                  >
                    Log In
                  </button>
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>
    </>
  );
}
