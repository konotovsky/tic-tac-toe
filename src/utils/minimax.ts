import type { SquareValue, Player } from "@/types/game.types";
import { calculateWinner, calculateTurns } from "@/utils/game.utils";

type MoveScore = {
  move: number | null;
  score: number;
};

function getAvailableMoves(squares: SquareValue[]) {
  return squares
    .map((v, i) => (v === null ? i : null))
    .filter((v): v is number => v !== null);
}

function evaluate(
  squares: SquareValue[],
  cpu: Player,
  human: Player,
): number | null {
  const winner = calculateWinner(squares);

  if (winner) {
    if (winner.player === cpu) return 10;
    if (winner.player === human) return -10;
  }

  if (calculateTurns(squares) === 9) {
    return 0;
  }

  return null;
}

function minimax(
  squares: SquareValue[],
  depth: number,
  isMaximizing: boolean,
  cpu: Player,
  human: Player,
): MoveScore {
  const evaluation = evaluate(squares, cpu, human);
  if (evaluation !== null) {
    return { move: null, score: evaluation - depth };
  }

  const moves = getAvailableMoves(squares);
  let bestMove: number | null = null;

  if (isMaximizing) {
    let bestScore = -Infinity;

    for (const move of moves) {
      const next = [...squares];
      next[move] = cpu;

      const result = minimax(next, depth + 1, false, cpu, human);

      if (result.score > bestScore) {
        bestScore = result.score;
        bestMove = move;
      }
    }

    return { move: bestMove, score: bestScore };
  } else {
    let bestScore = Infinity;

    for (const move of moves) {
      const next = [...squares];
      next[move] = human;

      const result = minimax(next, depth + 1, true, cpu, human);

      if (result.score < bestScore) {
        bestScore = result.score;
        bestMove = move;
      }
    }

    return { move: bestMove, score: bestScore };
  }
}

export function getBestMove(
  squares: SquareValue[],
  cpu: Player,
  human: Player,
): number | null {
  return minimax(squares, 0, true, cpu, human).move;
}
