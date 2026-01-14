import React, { useEffect, useMemo, useState } from "react";
import "./App.css";
import Board from "./components/Board";
import { calculateWinner, isBoardFull } from "./utils/calculateWinner";

const EMPTY_BOARD = Array(9).fill(null);

// PUBLIC_INTERFACE
function App() {
  const [theme, setTheme] = useState("light");

  const [squares, setSquares] = useState(EMPTY_BOARD);
  const [xIsNext, setXIsNext] = useState(true);

  // Effect to apply theme to document element
  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  const { winner, line: winningLine } = useMemo(() => calculateWinner(squares), [squares]);
  const isDraw = useMemo(() => !winner && isBoardFull(squares), [winner, squares]);

  const currentPlayer = xIsNext ? "X" : "O";
  const isLocked = Boolean(winner) || isDraw;

  const status = useMemo(() => {
    if (winner) return { text: `Winner: ${winner}`, tone: "win" };
    if (isDraw) return { text: "Draw — no more moves", tone: "draw" };
    return { text: `Next player: ${currentPlayer}`, tone: "next" };
  }, [winner, isDraw, currentPlayer]);

  // PUBLIC_INTERFACE
  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
  };

  // PUBLIC_INTERFACE
  const handlePlay = (index) => {
    if (isLocked) return;
    if (squares[index] !== null) return;

    setSquares((prev) => {
      const next = [...prev];
      next[index] = currentPlayer;
      return next;
    });
    setXIsNext((prev) => !prev);
  };

  // PUBLIC_INTERFACE
  const handleReset = () => {
    setSquares(EMPTY_BOARD);
    setXIsNext(true);
  };

  return (
    <div className="App">
      <header className="App-header">
        <button
          className="theme-toggle"
          onClick={toggleTheme}
          aria-label={`Switch to ${theme === "light" ? "dark" : "light"} mode`}
        >
          {theme === "light" ? "Dark mode" : "Light mode"}
        </button>

        <div className="ttt-card" role="application" aria-label="Tic Tac Toe game">
          <div className="ttt-header">
            <h1 className="ttt-title">Tic Tac Toe</h1>
            <p className="ttt-subtitle">Take turns. Get three in a row.</p>
          </div>

          <div className={`ttt-status ttt-status--${status.tone}`} role="status" aria-live="polite">
            {status.text}
          </div>

          <Board squares={squares} onPlay={handlePlay} isLocked={isLocked} winningLine={winningLine} />

          <div className="ttt-actions">
            <button type="button" className="ttt-reset" onClick={handleReset}>
              Reset game
            </button>
          </div>
        </div>
      </header>
    </div>
  );
}

export default App;
