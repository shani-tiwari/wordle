import axios from "axios";
import { useEffect, useState } from "react";
import { Github, Twitter, Instagram, Info, X } from "lucide-react";

function App() {
  const [word, setword] = useState([]);
  const [tries, setTries] = useState(6);
  const [val, setVal] = useState("");
  const [secret, setSecret] = useState("");
  const [gameStatus, setGameStatus] = useState("playing"); // 'playing', 'won', 'lost'
  const [showRules, setShowRules] = useState(false);
  const url = "https://api.frontendeval.com/fake/word";

  const resetGame = () => {
    setTries(6);
    setVal("");
    setGameStatus("playing");
    createWord();
  };

  async function createWord() {
    try {
      let res = await axios.get(url).then((res) => res.data);
      let words = Array.from({ length: 10 }, () =>
        String.fromCharCode(Math.floor(Math.random() * (123 - 97) + 97))
      );

      let i = res.length - 1;
      while (i >= 0) {
        let posi = Math.floor(Math.random() * words.length);
        words.splice(posi, 0, res[i]);
        i--;
      }

      setSecret(res.toLowerCase());
      setword(words.map((c) => c.toLowerCase()));
    } catch (err) {
      console.error("Failed to fetch word", err);
    }
  }

  useEffect(() => {
    createWord();
  }, []);

  const handleKeyDown = (e) => {
    if (gameStatus !== "playing") return;

    if (e.key === "Enter") {
      if (val.length === 5) {
        if (val.toLowerCase() === secret) {
          setGameStatus("won");
        } else {
          setTries((t) => {
            if (t <= 1) {
              setGameStatus("lost");
              return 0;
            }
            return t - 1;
          });
          setVal(""); // Clear input for next guess
        }
      }
    }
  };

  return (
    <>
      <main className="bg-slate-900 min-h-screen w-full flex items-center justify-center p-4">
        <div className="w-full max-w-md p-6 bg-white/5 backdrop-blur-md rounded-2xl flex flex-col gap-8 items-center border border-white/10 shadow-2xl relative overflow-hidden">
          <div className="flex justify-between items-center w-full">
            <div className="w-8 relative " /> {/* Spacer */}
            <h1 className="text-5xl tracking-wider text-center mx-auto font-black text-white italic">
              WORDLE
            </h1>
            <button
              onClick={() => setShowRules(true)}
              className=" absolute top-1 right-1 md:top-7 md:right-7 text-slate-400 hover:text-white transition-colors"
            >
              <Info size={24} />
            </button>
          </div>

          <div className="flex flex-col items-center gap-2">
            <p className="text-slate-400 font-medium">Remaining Tries</p>
            <div className="flex gap-1">
              {[...Array(6)].map((_, i) => (
                <div
                  key={i}
                  className={`h-2 w-8 rounded-full transition-colors ${
                    i < tries ? "bg-green-500" : "bg-slate-700"
                  }`}
                />
              ))}
            </div>
          </div>

          <div className="w-full relative">
            <input
              value={val}
              disabled={gameStatus !== "playing"}
              onChange={(e) => setVal(e.target.value.slice(0, 5))}
              onKeyDown={handleKeyDown}
              className="w-full bg-slate-800/50 border-2 border-slate-700 px-6 py-1 md:py-4 text-white text-2xl text-center rounded-xl outline-none focus:border-green-500 transition-all placeholder:text-slate-600 uppercase tracking-[0.5em] font-bold"
              placeholder="GUESS"
              type="text"
            />
            <p className="text-center text-slate-500 text-xs mt-2 font-mono">
              PRESS ENTER TO SUBMIT
            </p>
          </div>

          <div className="grid grid-cols-5 gap-3 w-full">
            {word.map((char, i) => {
              const isGreen = val
                .toLowerCase()
                .split("")
                .some((letter, idx) => letter === char && secret[idx] === char);
              const isYellow =
                !isGreen &&
                secret.includes(char) &&
                val.toLowerCase().includes(char);

              let bgColor = "bg-slate-800/40";
              if (isGreen)
                bgColor = "bg-green-600 shadow-[0_0_15px_rgba(22,163,74,0.4)]";
              else if (isYellow)
                bgColor = "bg-yellow-600 shadow-[0_0_15px_rgba(202,138,4,0.3)]";

              return (
                <div
                  key={i}
                  className={`${bgColor} flex items-center justify-center h-10 md:h-14 w-full aspect-square text-white text-lg md:text-xl font-bold rounded-xl border border-white/5 transition-all duration-500 uppercase`}
                >
                  {char}
                </div>
              );
            })}
          </div>

          <div className="flex gap-10 mt-2 md:mt-4 border-t border-white/10 pt-4 md:pt-6 w-full justify-center">
            <a
              href="https://github.com/shani-tiwari"
              target="_blank"
              rel="noopener noreferrer"
              className="text-slate-400 hover:text-[#2dba4e] hover:drop-shadow-[0_0_10px_rgba(45,186,78,0.4)] transition-all duration-300"
            >
              <Github size={24} />
            </a>
            <a
              href="https://x.com/shani_tiwari"
              target="_blank"
              rel="noopener noreferrer"
              className="text-slate-400 hover:text-[#1DA1F2] hover:drop-shadow-[0_0_10px_rgba(29,161,242,0.4)] transition-all duration-300"
            >
              <Twitter size={24} />
            </a>
            <a
              href="https://instagram.com/shani_tiwari"
              target="_blank"
              rel="noopener noreferrer"
              className="text-slate-400  hover:text-[#E4405F] hover:drop-shadow-[0_0_10px_rgba(228,64,95,0.4)] transition-all duration-300"
            >
              <Instagram size={24} />
            </a>
          </div>

          {/* Rules Overlay */}
          {showRules && (
            <div className="absolute inset-0 z-20 bg-slate-900/95 backdrop-blur-md p-8 flex flex-col items-center justify-center text-center animate-in fade-in slide-in-from-bottom-4 duration-300 rounded-2xl">
              <button
                onClick={() => setShowRules(false)}
                className="absolute top-1 right-1 md:top-7 md:right-7 text-slate-400 hover:text-white transition-colors"
              >
                <X size={24} />
              </button>
              <h2 className="text-3xl font-black text-white mb-6 ">
                HOW TO PLAY
              </h2>
              <div className="space-y-4 text-slate-300 text-left w-full max-w-xs">
                <p className="flex items-start gap-3">
                  <span className="bg-green-600 h-6 w-8 rounded shrink-0" />
                  <span>
                    Green tile means the letter is in the word and in the
                    correct spot.
                  </span>
                </p>
                <p className="flex items-start gap-3">
                  <span className="bg-yellow-600 h-6 w-8 rounded shrink-0" />
                  <span>
                    Yellow tile means the letter is in the word but in the wrong
                    spot.
                  </span>
                </p>
                <p className="flex items-start gap-3">
                  <span className="bg-slate-700 h-6 w-8 rounded shrink-0" />
                  <span>Gray tile means the letter is NOT in the word.</span>
                </p>
                <p className="mt-6 pt-2 border-t border-white/10 text-center font-bold text-white">
                  Press ENTER to submit your guess!
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Popups */}
        {gameStatus !== "playing" && (
          <div className="fixed inset-0 bg-slate-950/90 backdrop-blur-sm flex items-center justify-center p-6 z-50 animate-in fade-in duration-300">
            <div className="bg-slate-900 border border-white/10 p-10 rounded-3xl text-center max-w-sm w-full shadow-2xl">
              <h2
                className={`text-4xl font-black mb-2 ${
                  gameStatus === "won" ? "text-green-500" : "text-red-500"
                }`}
              >
                {gameStatus === "won" ? "PERFECT!" : "GAME OVER"}
              </h2>
              <p className="text-slate-400 mb-8">
                {gameStatus === "won"
                  ? "You found the secret word."
                  : "Better luck next time!"}
              </p>

              <div className="bg-slate-800/50 p-6 rounded-2xl mb-8 border border-white/5">
                <p className="text-slate-500 text-xs uppercase tracking-widest mb-2 font-bold">
                  The word was
                </p>
                <p className="text-white text-3xl font-mono font-black tracking-widest uppercase">
                  {secret}
                </p>
              </div>

              <button
                onClick={resetGame}
                className="w-full bg-white text-black font-bold py-4 rounded-xl hover:bg-slate-200 transition-colors uppercase tracking-widest"
              >
                Play Again
              </button>
            </div>
          </div>
        )}
      </main>
    </>
  );
}

export default App;
