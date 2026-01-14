import React from "react";
import Square from "./Square";

/**
 * PUBLIC_INTERFACE
 * Board
 * Renders a 3x3 Tic Tac Toe board.
 *
 * @param {{
 *  squares: (null|'X'|'O')[],
 *  onPlay: (index: number) => void,
 *  isLocked?: boolean,
 *  winningLine?: number[]|null
 * }} props
 * @returns {JSX.Element}
 */
export default function Board({ squares, onPlay, isLocked = false, winningLine = null }) {
  return (
    <div className="ttt-board" role="grid" aria-label="Tic Tac Toe board">
      {squares.map((value, idx) => (
        <Square
          key={idx}
          index={idx}
          value={value}
          onClick={() => onPlay(idx)}
          disabled={isLocked || value !== null}
          isWinning={Array.isArray(winningLine) ? winningLine.includes(idx) : false}
        />
      ))}
    </div>
  );
}
