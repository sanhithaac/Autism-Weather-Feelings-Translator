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
        <div className="max-w-4xl w-full">

          <div className="bg-white rounded-[3rem] shadow-2xl overflow-hidden flex flex-col md:flex-row border-b-8 border-primary/20">

            {/* LEFT DECORATION */}
            <div className="md:w-1/3 bg-primary p-12 text-white flex flex-col justify-center text-center">
              <div className="text-7xl mb-6">🌱</div>
              <h1 className="text-4xl font-bold mb-4">Join Us!</h1>
              <p className="text-lg opacity-90">Create your special account to start tracking your weather feelings.</p>
            </div>

            {/* RIGHT FORM */}
            <div className="md:w-2/3 p-12 md:p-16">
              <h2 className="text-3xl font-bold text-gray-800 mb-8 text-left">New Account Details</h2>

              <div className="space-y-6">
                <div className="text-left">
                  <label className="block text-sm font-bold text-gray-700 mb-2 uppercase ml-4">What should we call you?</label>
                  <input
                    className="w-full bg-green-50 border-2 border-transparent focus:border-primary focus:bg-white rounded-full px-8 py-4 transition-all outline-none text-lg"
                    placeholder="Your name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>

                <div className="text-left">
                  <label className="block text-sm font-bold text-gray-700 mb-2 uppercase ml-4">Create a Secret Key</label>
                  <input
                    type="password"
                    className="w-full bg-green-50 border-2 border-transparent focus:border-primary focus:bg-white rounded-full px-8 py-4 transition-all outline-none text-lg"
                    placeholder="Make it easy to remember!"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>

                <button
                  onClick={handleRegister}
                  className="w-full bg-primary hover:bg-accent text-white py-5 rounded-full font-bold text-2xl shadow-xl transition-all transform hover:-translate-y-1 mt-6"
                >
                  Let’s Play →
                </button>

                <div className="text-center pt-6">
                  <span className="text-gray-500">Already have an account? </span>
                  <button
                    onClick={() => navigate("/")}
                    className="text-primary font-bold hover:underline"
                  >
                    Log In here
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
