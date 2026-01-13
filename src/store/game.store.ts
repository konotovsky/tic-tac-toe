import { create } from "zustand";
import { persist } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";

import type { PersistStorage } from "zustand/middleware";
import type {
  SquareValue,
  GamePhase,
  Player,
  Score,
  GameResult,
} from "@/types/game.types";

type GameState = {
  p1mark: Player;
  squares: SquareValue[];
  xIsNext: boolean;
  phase: GamePhase;
  score: Score;
  setP1Mark: (p1mark: Player) => void;
  setSquares: (squares: SquareValue[]) => void;
  setScore: (result: GameResult) => void;
  togglePlayer: () => void;
  startGame: () => void;
  resetGame: () => void;
};

const createInitialSquares = () => Array<SquareValue>(9).fill(null);

const storage: PersistStorage<GameState> = {
  getItem: (name) => {
    const item = localStorage.getItem(name);

    return item ? JSON.parse(item) : null;
  },
  setItem: (name, value) => {
    localStorage.setItem(name, JSON.stringify(value));
  },
  removeItem: (name) => {
    localStorage.removeItem(name);
  },
};

export const useGameStore = create<GameState>()(
  persist(
    immer((set) => ({
      p1mark: "X",
      squares: createInitialSquares(),
      xIsNext: true,
      phase: "menu",
      score: {
        X: 0,
        O: 0,
        ties: 0,
      },

      setScore: (result: GameResult) =>
        set((state) => {
          if (result === "tie") {
            state.score.ties += 1;
          } else {
            state.score[result] += 1;
          }
        }),

      setP1Mark: (p1mark) => set({ p1mark }),

      setSquares: (squares) => set({ squares }),

      togglePlayer: () =>
        set((state) => {
          state.xIsNext = !state.xIsNext;
        }),

      startGame: () => {
        set({ phase: "playing" });
      },

      resetGame: () => {
        set({ phase: "menu", squares: createInitialSquares(), xIsNext: true });
        localStorage.removeItem("xo-game-storage");
      },
    })),
    {
      name: "xo-game-storage",
      storage,
    },
  ),
);
