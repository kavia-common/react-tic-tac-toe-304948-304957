/**
 * Utility for computing Tic Tac Toe outcomes.
 */

/**
 * PUBLIC_INTERFACE
 * calculateWinner
 * Determines whether a given 3x3 board has a winner.
 *
 * @param {(null|'X'|'O')[]} squares - Array of 9 items representing the board (row-major).
 * @returns {{ winner: (null|'X'|'O'), line: (number[]|null) }} Winner info.
 */
export function calculateWinner(squares) {
  const lines = [
    // rows
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    // cols
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    // diagonals
    [0, 4, 8],
    [2, 4, 6],
  ];

  for (const [a, b, c] of lines) {
    const v = squares[a];
    if (v && v === squares[b] && v === squares[c]) {
      return { winner: v, line: [a, b, c] };
    }
  }
  return { winner: null, line: null };
}

/**
 * PUBLIC_INTERFACE
 * isBoardFull
 * @param {(null|'X'|'O')[]} squares - Array of 9 items.
 * @returns {boolean} True if there are no empty squares.
 */
export function isBoardFull(squares) {
  return squares.every((v) => v !== null);
}
