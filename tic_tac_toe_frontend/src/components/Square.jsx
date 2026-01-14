import React from "react";

/**
 * PUBLIC_INTERFACE
 * Square
 * A single Tic Tac Toe square rendered as an accessible button.
 *
 * @param {{ value: (null|'X'|'O'), onClick: () => void, disabled?: boolean, isWinning?: boolean, index: number }} props
 * @returns {JSX.Element}
 */
export default function Square({ value, onClick, disabled = false, isWinning = false, index }) {
  const label = value ? `Square ${index + 1}, ${value}` : `Square ${index + 1}, empty`;

  return (
    <button
      type="button"
      className={`ttt-square ${isWinning ? "ttt-square--winning" : ""}`}
      onClick={onClick}
      disabled={disabled}
      aria-label={label}
    >
      {value}
    </button>
  );
}
