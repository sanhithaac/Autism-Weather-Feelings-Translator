import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { ScreenCapture } from "react-screen-capture";
import { useParams, useNavigate, Link } from "react-router-dom";

const TABS = [
  { id: "digits", label: "🔢 Digits", color: "bg-blue-500", desc: "Count the number of digits!" },
  { id: "fibonacci", label: "🌀 Fibonacci", color: "bg-purple-500", desc: "Find the next magic number." },
  { id: "sequence", label: "🧩 Sequence", color: "bg-pink-500", desc: "Solve the pattern puzzle." },
  { id: "addition", label: "🍎 Emoji Add", color: "bg-red-500", desc: "Add up the tasty fruits!" },
  { id: "shapes", label: "📐 Shape Count", color: "bg-emerald-500", desc: "How many shapes do you see?" },
  { id: "colors", label: "🎨 Color Math", color: "bg-amber-500", desc: "Identify and add by color." },
];

const DIFFICULTIES = [
  { id: "auto", label: "⚡ Auto" },
  { id: "easy", label: "🌱 Easy" },
  { id: "medium", label: "🌤️ Medium" },
  { id: "hard", label: "🔥 Hard" },
];

function randomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function shuffle(arr) {
  const copy = [...arr];
  for (let i = copy.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

function resolveDifficulty(mode, points, streak) {
  if (mode !== "auto") return mode;
  if (points >= 14 || streak >= 6) return "hard";
  if (points >= 7 || streak >= 3) return "medium";
  return "easy";
}

// Game Generators
function makeDigitGame(level) {
  const ranges = { easy: [10, 999], medium: [1000, 99999], hard: [100000, 9999999] };
  const [min, max] = ranges[level];
  const value = randomInt(min, max);
  return { value, answer: String(value).length, hint: "Count each place from left to right." };
}

function makeFibonacciGame(level) {
  const lengthMap = { easy: 5, medium: 6, hard: 7 };
  const sequence = [0, 1];
  const length = lengthMap[level];
  while (sequence.length < length) {
    sequence.push(sequence[sequence.length - 1] + sequence[sequence.length - 2]);
  }
  return {
    shown: sequence.join(", "),
    answer: sequence[sequence.length - 1] + sequence[sequence.length - 2],
    hint: `Add ${sequence[sequence.length - 2]} + ${sequence[sequence.length - 1]}`,
  };
}

function makeNextSequenceGame(level) {
  const kind = randomInt(1, level === "hard" ? 4 : 3);
  if (kind === 1) {
    const step = level === "easy" ? randomInt(2, 4) : level === "medium" ? randomInt(3, 7) : randomInt(5, 11);
    const start = randomInt(1, 20);
    const values = [start, start + step, start + step * 2, start + step * 3];
    return { shown: values.join(", "), answer: values[3] + step, hint: `Keep adding ${step}` };
  }
  if (kind === 2) {
    const mult = level === "easy" ? 2 : level === "medium" ? randomInt(2, 3) : randomInt(3, 4);
    const start = randomInt(1, 4);
    const values = [start, start * mult, start * mult * mult, start * mult * mult * mult];
    return { shown: values.join(", "), answer: values[3] * mult, hint: `Multiply by ${mult}` };
  }
  const base = level === "easy" ? randomInt(1, 3) : randomInt(2, 6);
  const values = [base * base, (base + 1) * (base + 1), (base + 2) * (base + 2), (base + 3) * (base + 3)];
  return { shown: values.join(", "), answer: (base + 4) * (base + 4), hint: "These are square numbers." };
}

function makeEmojiAdditionGame(level) {
  const range = { easy: [1, 4], medium: [2, 6], hard: [3, 8] }[level];
  const apples = randomInt(range[0], range[1]);
  const bananas = randomInt(range[0], range[1]);
  const correct = apples + bananas;
  const choices = new Set([correct]);
  while (choices.size < 3) {
    const candidate = correct + randomInt(-4, 4);
    if (candidate > 1) choices.add(candidate);
  }
  return { apples, bananas, correct, options: shuffle(Array.from(choices)), hint: `${apples} + ${bananas} = ?` };
}

function makeShapeCountingGame(level) {
  const shapes = ["🔺", "🟦", "🟡", "⭐"];
  const targetShape = shapes[randomInt(0, shapes.length - 1)];
  const range = { easy: [3, 6], medium: [6, 10], hard: [10, 15] }[level];
  const targetCount = randomInt(range[0], range[1]);
  const totalItems = targetCount + randomInt(2, 5);
  const items = Array(targetCount).fill(targetShape);
  while (items.length < totalItems) {
    const other = shapes[randomInt(0, shapes.length - 1)];
    if (other !== targetShape) items.push(other);
  }
  return { targetShape, targetCount, items: shuffle(items), hint: `Count ONLY the ${targetShape}` };
}

function makeColorMathGame(level) {
  const colors = [
    { n: "Red", e: "🔴" },
    { n: "Blue", e: "🔵" },
    { n: "Yellow", e: "🟡" },
  ];
  const c1 = colors[randomInt(0, 2)];
  const c2 = colors[randomInt(0, 2)];
  const v1 = randomInt(1, 5);
  const v2 = randomInt(1, 5);
  return {
    c1,
    c2,
    v1,
    v2,
    answer: v1 + v2,
    hint: `How many ${c1.n} plus ${c2.n}?`,
  };
}

export default function MathGames() {
  const { gameId } = useParams();
  const navigate = useNavigate();
  const [difficultyMode, setDifficultyMode] = useState("auto");
  const [points, setPoints] = useState(0);
  const [streak, setStreak] = useState(0);
  const [feedback, setFeedback] = useState("🎮 Pick a game and play!");
  const [captureImage, setCaptureImage] = useState("");
  const [flash, setFlash] = useState(false);
  const [showHint, setShowHint] = useState(false);
  const [calmMode, setCalmMode] = useState(false);
  const [soundOn, setSoundOn] = useState(true);
  const [breakSeconds, setBreakSeconds] = useState(0);

  const [gameState, setGameState] = useState(null);
  const [inputValue, setInputValue] = useState("");

  const audioContextRef = useRef(null);

  const effectiveDifficulty = useMemo(
    () => resolveDifficulty(difficultyMode, points, streak),
    [difficultyMode, points, streak]
  );

  const playTone = useCallback(
    (kind) => {
      if (!soundOn || typeof window === "undefined") return;
      try {
        if (!audioContextRef.current) {
          audioContextRef.current = new (window.AudioContext || window.webkitAudioContext)();
        }
        const ctx = audioContextRef.current;
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.frequency.value = kind === "good" ? 660 : 220;
        gain.gain.value = 0.0001;
        osc.connect(gain);
        gain.connect(ctx.destination);
        const now = ctx.currentTime;
        gain.gain.exponentialRampToValueAtTime(0.08, now + 0.01);
        gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.18);
        osc.start(now);
        osc.stop(now + 0.2);
      } catch (err) {}
    },
    [soundOn]
  );

  const refreshGame = useCallback(
    (id = gameId, level = effectiveDifficulty) => {
      setShowHint(false);
      setInputValue("");
      if (id === "digits") setGameState(makeDigitGame(level));
      else if (id === "fibonacci") setGameState(makeFibonacciGame(level));
      else if (id === "sequence") setGameState(makeNextSequenceGame(level));
      else if (id === "addition") setGameState(makeEmojiAdditionGame(level));
      else if (id === "shapes") setGameState(makeShapeCountingGame(level));
      else if (id === "colors") setGameState(makeColorMathGame(level));
      else setGameState(null);
    },
    [gameId, effectiveDifficulty]
  );

  useEffect(() => {
    refreshGame();
  }, [gameId, effectiveDifficulty, refreshGame]);

  const handleCorrect = useCallback(
    (message) => {
      const nextPoints = points + 1;
      const nextStreak = streak + 1;
      setPoints(nextPoints);
      setStreak(nextStreak);
      setFeedback(message);
      setFlash(true);
      setTimeout(() => setFlash(false), 320);
      playTone("good");
      refreshGame(gameId, resolveDifficulty(difficultyMode, nextPoints, nextStreak));
      if (nextStreak > 0 && nextStreak % 5 === 0) {
        setBreakSeconds(20);
        setFeedback("🌬️ Break Time! Breathe slowly...");
      }
    },
    [points, streak, difficultyMode, playTone, refreshGame, gameId]
  );

  const handleWrong = useCallback(
    (message) => {
      setStreak(0);
      setFeedback(message);
      playTone("bad");
    },
    [playTone]
  );

  const checkAnswer = useCallback(
    (answer) => {
      const correct = Number(answer) === gameState?.answer || Number(answer) === gameState?.correct || Number(answer) === gameState?.targetCount;
      if (correct) handleCorrect("🎉 Awesome job!");
      else handleWrong("🙂 Let's try again!");
    },
    [gameState, handleCorrect, handleWrong]
  );

  useEffect(() => {
    if (breakSeconds <= 0) return;
    const id = setInterval(() => setBreakSeconds((p) => (p > 0 ? p - 1 : 0)), 1000);
    return () => clearInterval(id);
  }, [breakSeconds]);

  const emojiLine = (items) => (
    <div className="flex flex-wrap justify-center gap-4">
      {items.map((item, idx) => (
        <span key={idx} className="text-6xl md:text-7xl animate-bounce-soft select-none">
          {item}
        </span>
      ))}
    </div>
  );

  return (
    <ScreenCapture onEndCapture={(data) => setCaptureImage(data)}>
      {({ onStartCapture }) => (
        <div className={`min-h-screen game-page-bg px-4 py-8 relative overflow-hidden ${calmMode ? "calm-mode" : ""}`}>
          <div className="bg-orb orb-a" />
          <div className="bg-orb orb-b" />
          <div className="bg-orb orb-c" />
          <div className="bg-grid" />
          <div className="math-float float-1">➕</div>
          <div className="math-float float-2">✖️</div>
          <div className="math-float float-3">➗</div>
          <div className="math-float float-4">🔢</div>
          
          <div className="max-w-6xl mx-auto relative z-10">
            {/* Header */}
            <div className="flex flex-wrap items-center justify-between gap-4 mb-8 bg-white/80 backdrop-blur-md p-6 rounded-[2.5rem] shadow-xl border border-white/50">
              <div className="flex items-center gap-4">
                <Link to="/math-games" className="hover:scale-110 transition-transform text-4xl">🏠</Link>
                <h1 className="text-4xl md:text-6xl font-black text-emerald-600 tracking-tight">
                  Math Games
                </h1>
              </div>
              <div className="flex items-center gap-3">
                <span className="pill-score">⭐ {points}</span>
                <span className="pill-streak">🔥 {streak}</span>
                <button onClick={onStartCapture} className="pill-btn">📸 Capture</button>
              </div>
            </div>

            {!gameId ? (
              /* Hub Menu */
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 animate-pop">
                {TABS.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => navigate(`/math-games/${tab.id}`)}
                    className="group relative flex flex-col items-center p-8 bg-white rounded-[2rem] shadow-lg hover:shadow-2xl transition-all hover:-translate-y-2 border-4 border-transparent hover:border-emerald-200"
                  >
                    <div className={`w-24 h-24 ${tab.color} rounded-3xl mb-6 flex items-center justify-center text-5xl shadow-inner group-hover:rotate-12 transition-transform`}>
                      {tab.label.split(" ")[0]}
                    </div>
                    <h3 className="text-3xl font-black text-slate-800 mb-2">{tab.label.split(" ").slice(1).join(" ")}</h3>
                    <p className="text-slate-500 font-bold text-center">{tab.desc}</p>
                    <div className="mt-4 py-2 px-6 bg-emerald-50 text-emerald-600 rounded-full font-black text-lg group-hover:bg-emerald-600 group-hover:text-white transition-colors">
                      PLAY NOW
                    </div>
                  </button>
                ))}
              </div>
            ) : (
              /* Active Game */
              <div className={`rounded-[3rem] p-6 md:p-12 bg-white/90 backdrop-blur-lg shadow-2xl border border-white/70 relative ${flash ? "animate-pop" : ""}`}>
                <div className="flex flex-wrap gap-2 mb-8 justify-center">
                  {DIFFICULTIES.map((mode) => (
                    <button
                      key={mode.id}
                      onClick={() => setDifficultyMode(mode.id)}
                      className={`mini-toggle ${difficultyMode === mode.id ? "mini-toggle-on" : ""}`}
                    >
                      {mode.label}
                    </button>
                  ))}
                  <button onClick={() => setShowHint(!showHint)} className={`mini-toggle ${showHint ? "mini-toggle-on" : ""}`}>💡 Hint</button>
                  <button onClick={() => setCalmMode(!calmMode)} className={`mini-toggle ${calmMode ? "mini-toggle-on" : ""}`}>🧘 Calm</button>
                  <button onClick={() => setSoundOn(!soundOn)} className={`mini-toggle ${soundOn ? "mini-toggle-on" : ""}`}>{soundOn ? "🔊" : "🔈"}</button>
                </div>

                <div className="min-h-[400px] flex flex-col items-center justify-center text-center">
                  {gameState && (
                    <>
                      <h2 className="text-4xl md:text-6xl font-black text-emerald-600 mb-8">{TABS.find(t => t.id === gameId)?.label}</h2>
                      
                      {gameId === "digits" && (
                        <div className="animate-pop">
                          <p className="text-7xl md:text-9xl font-black mb-10 text-slate-800 tracking-widest">{gameState.value}</p>
                        </div>
                      )}

                      {gameId === "fibonacci" && (
                        <div className="animate-pop">
                          <p className="text-5xl md:text-7xl font-black mb-10 text-slate-700">{gameState.shown}, <span className="text-emerald-500">?</span></p>
                        </div>
                      )}

                      {gameId === "sequence" && (
                        <div className="animate-pop">
                          <p className="text-5xl md:text-7xl font-black mb-10 text-slate-700">{gameState.shown}, <span className="text-emerald-500">?</span></p>
                        </div>
                      )}

                      {gameId === "addition" && (
                        <div className="animate-pop space-y-4">
                          {emojiLine(Array(gameState.apples).fill("🍎"))}
                          <div className="text-4xl font-black text-slate-300">➕</div>
                          {emojiLine(Array(gameState.bananas).fill("🍌"))}
                        </div>
                      )}

                      {gameId === "shapes" && (
                        <div className="animate-pop space-y-8">
                          <p className="text-3xl font-black text-slate-600">Count the {gameState.targetShape} shapes!</p>
                          <div className="max-w-xl mx-auto flex flex-wrap justify-center gap-6 p-6 bg-emerald-50 rounded-[2rem] border-2 border-emerald-100">
                            {gameState.items.map((item, idx) => (
                              <span key={idx} className="text-6xl hover:scale-125 transition-transform cursor-default">{item}</span>
                            ))}
                          </div>
                        </div>
                      )}

                      {gameId === "colors" && (
                        <div className="animate-pop space-y-6">
                          <div className="flex items-center justify-center gap-6">
                            <div className="flex flex-col items-center">
                              <span className="text-7xl mb-2">{gameState.c1.e}</span>
                              <span className="text-2xl font-black text-slate-600">{gameState.v1}</span>
                            </div>
                            <span className="text-5xl text-slate-300 font-black">➕</span>
                            <div className="flex flex-col items-center">
                              <span className="text-7xl mb-2">{gameState.c2.e}</span>
                              <span className="text-2xl font-black text-slate-600">{gameState.v2}</span>
                            </div>
                          </div>
                        </div>
                      )}

                      <div className="mt-12 w-full max-w-md">
                        {gameId === "addition" ? (
                          <div className="flex flex-wrap justify-center gap-4">
                            {gameState.options.map(opt => (
                              <button key={opt} onClick={() => checkAnswer(opt)} className="choice-btn">{opt}</button>
                            ))}
                          </div>
                        ) : (
                          <div className="flex flex-col sm:flex-row gap-4 items-center justify-center">
                            <input
                              type="number"
                              value={inputValue}
                              onChange={(e) => setInputValue(e.target.value)}
                              onKeyDown={(e) => e.key === "Enter" && checkAnswer(inputValue)}
                              placeholder="?"
                              className="answer-input"
                              autoFocus
                            />
                            <button onClick={() => checkAnswer(inputValue)} className="answer-btn">OK! ✅</button>
                          </div>
                        )}
                      </div>
                    </>
                  )}
                </div>

                {showHint && <div className="hint-box">💡 {gameState?.hint}</div>}
                
                <div className="mt-8 text-3xl font-black text-emerald-600 h-10 animate-wiggle-lite">
                  {feedback}
                </div>

                <div className="mt-8 flex justify-between items-center opacity-40">
                  <button onClick={() => navigate("/math-games")} className="font-black hover:opacity-100 transition-opacity">← BACK TO MENU</button>
                  <button onClick={() => refreshGame()} className="font-black hover:opacity-100 transition-opacity">SKIP GAME →</button>
                </div>
              </div>
            )}
          </div>

          {/* Break Overlay */}
          {breakSeconds > 0 && (
            <div className="break-overlay">
              <div className="break-card">
                <div className="text-6xl mb-4 animate-bounce-soft">🌬️</div>
                <h3 className="text-4xl font-black text-emerald-800 mb-2">Calm Break</h3>
                <p className="text-6xl font-black text-emerald-600 mb-6">{breakSeconds}</p>
                <div className="space-y-4">
                  <p className="text-xl font-bold text-slate-600">Breath in... Breath out...</p>
                  <button onClick={() => setBreakSeconds(0)} className="answer-btn text-xl px-12">I'm ready!</button>
                </div>
              </div>
            </div>
          )}

          {captureImage && (
            <div className="fixed bottom-10 right-10 z-[100] animate-pop">
              <div className="bg-white p-2 rounded-2xl shadow-2xl border-4 border-emerald-500 max-w-[250px]">
                <img src={captureImage} alt="Math capture" className="rounded-xl" />
                <button onClick={() => setCaptureImage("")} className="absolute -top-4 -right-4 bg-red-500 text-white w-8 h-8 rounded-full font-black">X</button>
              </div>
            </div>
          )}
        </div>
      )}
    </ScreenCapture>
  );
}