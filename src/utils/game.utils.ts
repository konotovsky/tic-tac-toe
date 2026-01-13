import type { SquareValue, Winner } from "@/types/game.types";

const WINNING_LINES = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
] as const;

export function calculateWinner(squares: SquareValue[]): Winner {
  for (const [a, b, c] of WINNING_LINES) {
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return { player: squares[a], lines: [a, b, c] };
    }
  }
  return null;
}

export function calculateTurns(squares: SquareValue[]) {
  return squares.filter(Boolean).length;
}

export function calculateStatus(winner: Winner, turns: number) {
  if (winner) {
    return winner.player;
  }

  if (turns === 9) {
    return "tie";
  }

  return null;
}
