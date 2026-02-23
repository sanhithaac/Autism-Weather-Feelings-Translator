import { useCallback, useEffect, useMemo, useState } from "react";
import { ScreenCapture } from "react-screen-capture";

const TABS = [
  { id: "digits", label: "🔢 Digits" },
  { id: "fibonacci", label: "🌀 Fibonacci" },
  { id: "sequence", label: "🧩 Sequence" },
  { id: "addition", label: "🍎 Add Emojis" },
];

function randomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function makeDigitGame() {
  const value = randomInt(10, 999999);
  return { value, answer: String(value).length };
}

function makeFibonacciGame() {
  const length = randomInt(4, 7);
  const sequence = [0, 1];
  while (sequence.length < length) {
    const a = sequence[sequence.length - 1];
    const b = sequence[sequence.length - 2];
    sequence.push(a + b);
  }
  return {
    shown: sequence.join(", "),
    answer: sequence[sequence.length - 1] + sequence[sequence.length - 2],
  };
}

function makeNextSequenceGame() {
  const kind = randomInt(1, 3);

  if (kind === 1) {
    const start = randomInt(2, 15);
    const step = randomInt(2, 7);
    const values = [start, start + step, start + step * 2, start + step * 3];
    return {
      shown: values.join(", "),
      answer: values[3] + step,
    };
  }

  if (kind === 2) {
    const start = randomInt(1, 4);
    const values = [start, start * 2, start * 4, start * 8];
    return {
      shown: values.join(", "),
      answer: values[3] * 2,
    };
  }

  const start = randomInt(1, 4);
  const values = [
    start * start,
    (start + 1) * (start + 1),
    (start + 2) * (start + 2),
    (start + 3) * (start + 3),
  ];

  return {
    shown: values.join(", "),
    answer: (start + 4) * (start + 4),
  };
}

function makeEmojiAdditionGame() {
  const apples = randomInt(1, 5);
  const bananas = randomInt(1, 5);
  const correct = apples + bananas;
  const options = new Set([correct]);

  while (options.size < 3) {
    const candidate = correct + randomInt(-3, 3);
    if (candidate > 0) options.add(candidate);
  }

  return {
    apples,
    bananas,
    correct,
    options: Array.from(options).sort(() => Math.random() - 0.5),
  };
}

export default function MathGames() {
  const [activeTab, setActiveTab] = useState(TABS[0].id);
  const [points, setPoints] = useState(0);
  const [feedback, setFeedback] = useState("🎮 Pick a game and play!");
  const [captureImage, setCaptureImage] = useState("");
  const [flash, setFlash] = useState(false);

  const [digitGame, setDigitGame] = useState(makeDigitGame);
  const [digitInput, setDigitInput] = useState("");

  const [fibonacciGame, setFibonacciGame] = useState(makeFibonacciGame);
  const [fibonacciInput, setFibonacciInput] = useState("");

  const [sequenceGame, setSequenceGame] = useState(makeNextSequenceGame);
  const [sequenceInput, setSequenceInput] = useState("");

  const [emojiGame, setEmojiGame] = useState(makeEmojiAdditionGame);

  const tabIndex = useMemo(() => TABS.findIndex((tab) => tab.id === activeTab), [activeTab]);

  const celebrate = useCallback(() => {
    setPoints((prev) => prev + 1);
    setFlash(true);
    setTimeout(() => setFlash(false), 350);
  }, []);

  const checkDigits = useCallback(() => {
    if (Number(digitInput) === digitGame.answer) {
      celebrate();
      setFeedback("🎉 Correct!");
      setDigitGame(makeDigitGame());
      setDigitInput("");
    } else {
      setFeedback("🙂 Try again!");
    }
  }, [digitInput, digitGame.answer, celebrate]);

  const checkFibonacci = useCallback(() => {
    if (Number(fibonacciInput) === fibonacciGame.answer) {
      celebrate();
      setFeedback("🌟 Super!");
      setFibonacciGame(makeFibonacciGame());
      setFibonacciInput("");
    } else {
      setFeedback("🌀 Add the last two numbers");
    }
  }, [fibonacciInput, fibonacciGame.answer, celebrate]);

  const checkSequence = useCallback(() => {
    if (Number(sequenceInput) === sequenceGame.answer) {
      celebrate();
      setFeedback("✅ Nice pattern spotting!");
      setSequenceGame(makeNextSequenceGame());
      setSequenceInput("");
    } else {
      setFeedback("👀 Look at the pattern again");
    }
  }, [sequenceInput, sequenceGame.answer, celebrate]);

  const checkEmojiAddition = useCallback(
    (choice) => {
      if (choice === emojiGame.correct) {
        celebrate();
        setFeedback("🍎 + 🍌 Perfect!");
        setEmojiGame(makeEmojiAdditionGame());
      } else {
        setFeedback("🙂 Count once more");
      }
    },
    [emojiGame.correct, celebrate]
  );

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key >= "1" && event.key <= "4") {
        setActiveTab(TABS[Number(event.key) - 1].id);
      }
      if (event.key === "ArrowRight") {
        setActiveTab(TABS[(tabIndex + 1) % TABS.length].id);
      }
      if (event.key === "ArrowLeft") {
        setActiveTab(TABS[(tabIndex - 1 + TABS.length) % TABS.length].id);
      }
      if (event.key === "Enter") {
        if (activeTab === "digits") checkDigits();
        if (activeTab === "fibonacci") checkFibonacci();
        if (activeTab === "sequence") checkSequence();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [activeTab, tabIndex, checkDigits, checkFibonacci, checkSequence]);

  const emojiLine = (emoji, count) =>
    Array.from({ length: count }, (_, idx) => (
      <span key={`${emoji}-${idx}`} className="text-6xl md:text-7xl leading-none select-none animate-bounce-soft">
        {emoji}
      </span>
    ));

  return (
    <ScreenCapture onEndCapture={(data) => setCaptureImage(data)}>
      {({ onStartCapture }) => (
        <div className="min-h-screen game-page-bg px-4 py-6 md:py-10 relative overflow-hidden">
          <div className="bg-orb orb-a" />
          <div className="bg-orb orb-b" />
          <div className="bg-orb orb-c" />
          <div className="bg-grid" />

          <div className="max-w-6xl mx-auto relative z-10">
            <div className={`rounded-[2rem] p-5 md:p-8 bg-white/80 backdrop-blur-md shadow-2xl border border-white/70 ${flash ? "animate-pop" : ""}`}>
              <div className="flex flex-wrap items-center justify-between gap-3 mb-5">
                <h1 className="text-4xl md:text-6xl font-black text-primary tracking-tight">🧠 Math Games</h1>
                <div className="flex items-center gap-2 md:gap-3">
                  <span className="px-4 py-2 md:px-6 md:py-3 rounded-full bg-emerald-100 text-emerald-800 text-lg md:text-2xl font-black">
                    ⭐ {points}
                  </span>
                  <button
                    onClick={onStartCapture}
                    className="px-4 py-2 md:px-5 md:py-3 rounded-full bg-accent text-white text-sm md:text-lg font-bold hover:scale-105 transition"
                  >
                    📸 Capture
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-5">
                {TABS.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`rounded-2xl px-3 py-3 md:px-5 md:py-4 text-base md:text-2xl font-black transition-all duration-300 ${
                      activeTab === tab.id
                        ? "bg-primary text-white scale-105 shadow-xl"
                        : "bg-white text-primary hover:scale-105"
                    }`}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>

              <div className="rounded-[1.7rem] p-6 md:p-10 bg-gradient-to-br from-white to-emerald-50 min-h-[360px] flex items-center">
                {activeTab === "digits" && (
                  <div className="w-full text-center">
                    <h2 className="text-4xl md:text-6xl font-black text-primary mb-4">🔢 Count Digits</h2>
                    <p className="text-5xl md:text-7xl font-black mb-6">{digitGame.value}</p>
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
                      <input
                        value={digitInput}
                        onChange={(e) => setDigitInput(e.target.value)}
                        type="number"
                        placeholder="Answer"
                        className="w-full sm:w-60 text-center text-3xl md:text-4xl px-4 py-3 rounded-2xl border-2 border-emerald-300 focus:outline-none focus:ring-2 focus:ring-primary"
                      />
                      <button onClick={checkDigits} className="px-7 py-3 rounded-2xl bg-primary text-white text-2xl md:text-3xl font-black hover:scale-105 transition">
                        ✅
                      </button>
                    </div>
                  </div>
                )}

                {activeTab === "fibonacci" && (
                  <div className="w-full text-center">
                    <h2 className="text-4xl md:text-6xl font-black text-primary mb-4">🌀 Fibonacci</h2>
                    <p className="text-3xl md:text-5xl font-black mb-6 break-words">{fibonacciGame.shown}, ?</p>
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
                      <input
                        value={fibonacciInput}
                        onChange={(e) => setFibonacciInput(e.target.value)}
                        type="number"
                        placeholder="Next"
                        className="w-full sm:w-60 text-center text-3xl md:text-4xl px-4 py-3 rounded-2xl border-2 border-emerald-300 focus:outline-none focus:ring-2 focus:ring-primary"
                      />
                      <button onClick={checkFibonacci} className="px-7 py-3 rounded-2xl bg-primary text-white text-2xl md:text-3xl font-black hover:scale-105 transition">
                        ✅
                      </button>
                    </div>
                  </div>
                )}

                {activeTab === "sequence" && (
                  <div className="w-full text-center">
                    <h2 className="text-4xl md:text-6xl font-black text-primary mb-4">🧩 Next Number</h2>
                    <p className="text-3xl md:text-5xl font-black mb-6 break-words">{sequenceGame.shown}, ?</p>
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
                      <input
                        value={sequenceInput}
                        onChange={(e) => setSequenceInput(e.target.value)}
                        type="number"
                        placeholder="Next"
                        className="w-full sm:w-60 text-center text-3xl md:text-4xl px-4 py-3 rounded-2xl border-2 border-emerald-300 focus:outline-none focus:ring-2 focus:ring-primary"
                      />
                      <button onClick={checkSequence} className="px-7 py-3 rounded-2xl bg-primary text-white text-2xl md:text-3xl font-black hover:scale-105 transition">
                        ✅
                      </button>
                    </div>
                  </div>
                )}

                {activeTab === "addition" && (
                  <div className="w-full text-center">
                    <h2 className="text-4xl md:text-6xl font-black text-primary mb-4">🍎 Add Emojis</h2>
                    <div className="mb-3 flex flex-wrap justify-center gap-2">{emojiLine("🍎", emojiGame.apples)}</div>
                    <div className="mb-6 flex flex-wrap justify-center gap-2">{emojiLine("🍌", emojiGame.bananas)}</div>
                    <div className="flex flex-wrap justify-center gap-3">
                      {emojiGame.options.map((choice) => (
                        <button
                          key={choice}
                          onClick={() => checkEmojiAddition(choice)}
                          className="px-8 py-4 rounded-2xl bg-white border-2 border-emerald-300 text-primary text-3xl md:text-4xl font-black hover:scale-110 hover:bg-emerald-50 transition"
                        >
                          {choice}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              <div className="mt-5 text-center text-2xl md:text-3xl font-black text-emerald-800 animate-wiggle-lite">
                {feedback}
              </div>

              {captureImage && (
                <div className="mt-5 rounded-2xl bg-white p-3 border border-emerald-200">
                  <img src={captureImage} alt="Math capture" className="rounded-xl mx-auto max-h-64 object-contain" />
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </ScreenCapture>
  );
}
