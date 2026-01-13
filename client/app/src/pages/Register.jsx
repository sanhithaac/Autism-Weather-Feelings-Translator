import { useNavigate } from "react-router-dom";

export default function Register() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#fdf8fb] relative overflow-hidden">

      {/* dotted background */}
      <div className="absolute inset-0 bg-[radial-gradient(#fbcfe8_0.5px,transparent_0.5px)] bg-[length:24px_24px]"></div>

      {/* header */}
      <header className="relative z-10 flex justify-between items-center px-10 py-4 bg-white/80 backdrop-blur border-b border-pink-200">
        <div className="flex items-center gap-3 font-bold text-lg">
          ☁️ Weather Feelings
        </div>
        <button
  onClick={() => navigate("/parent-login")}
  className="rounded-full bg-pink-100 px-4 py-2"
>
  Parent Login
</button>

      </header>

      {/* main */}
      <main className="relative z-10 flex flex-col items-center px-4 py-12">

        {/* cloud card */}
        <div className="w-full max-w-2xl bg-gradient-to-b from-green-100 to-blue-100 rounded-3xl p-10 text-center shadow border-4 border-white">
          <div className="text-6xl mb-4">😊</div>
          <h1 className="text-3xl font-bold">
  Hi! I’m your Weather Friend 🌤️
</h1>

          <p className="text-green-600 mt-2">
            Let’s start your journey together!
          </p>
        </div>

        {/* progress */}
        <div className="w-full max-w-2xl mt-6 bg-white rounded-2xl p-6 shadow border border-pink-200">
          <div className="flex justify-between text-sm font-medium mb-2">
            <span>Your cloud is growing</span>
            <span>Step 1 of 3</span>
          </div>
          <div className="h-3 bg-pink-100 rounded-full">
            <div className="h-3 w-1/3 bg-pink-400 rounded-full"></div>
          </div>
          <p className="text-xs mt-2 text-pink-400 tracking-widest">
            BEGINNING YOUR STORY
          </p>
        </div>

        {/* form */}
        <div className="w-full max-w-xl mt-10 text-center">
          <h2 className="text-2xl font-bold mb-6">
            What is your name?
          </h2>

          <input
            placeholder="Type your name here..."
            className="w-full px-6 py-4 mb-6 rounded-full border-2 border-pink-200 focus:outline-none focus:ring-2 focus:ring-pink-300 text-lg"
          />

          <p className="font-bold mb-3">
            Choose a secret key (Password)
          </p>

          <input
            type="password"
            placeholder="Your secret code..."
            className="w-full px-6 py-4 rounded-full border-2 border-pink-200 focus:outline-none focus:ring-2 focus:ring-pink-300 text-lg"
          />

          <button onClick={() => navigate("/checkin")}className="bg-pink-500 text-white rounded-full px-10 py-4">
              
              Let’s Play →
          </button>


          <div className="mt-8 text-sm">
            <p>Wait, I already have an account</p>
            <button
  onClick={() => navigate("/login")}
  className="text-pink-500 underline"
>
  Log in here
</button>

          </div>
        </div>
      </main>
    </div>
  );
}
