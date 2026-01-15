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
  GameMode,
} from "@/types/game.types";

type GameState = {
  p1mark: Player;
  squares: SquareValue[];
  xIsNext: boolean;
  phase: GamePhase;
  score: Score;
  roundResult: GameResult | null;
  mode: GameMode;
  setMode: (mode: GameMode) => void;
  setP1Mark: (p1mark: Player) => void;
  setSquares: (squares: SquareValue[]) => void;
  togglePlayer: () => void;
  startGame: () => void;
  resetGame: () => void;
  finishRound: (result: GameResult) => void;
  nextRound: () => void;
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
      roundResult: null,
      score: {
        X: 0,
        O: 0,
        ties: 0,
      },
      mode: "pvp",

      setMode: (mode) => set({ mode }),

      setP1Mark: (p1mark) => set({ p1mark }),

      setSquares: (squares) => set({ squares }),

      togglePlayer: () =>
        set((state) => {
          state.xIsNext = !state.xIsNext;
        }),

      startGame: () => {
        set({ phase: "game" });
      },

      finishRound: (result: GameResult) =>
        set((state) => {
          if (state.roundResult !== null) return;

          state.roundResult = result;

          if (result === "tie") {
            state.score.ties += 1;
          } else {
            state.score[result] += 1;
          }
        }),

      nextRound: () =>
        set((state) => {
          state.squares = createInitialSquares();
          state.xIsNext = true;
          state.roundResult = null;
        }),

      resetGame: () => {
        set({
          mode: "pvp",
          p1mark: "X",
          phase: "menu",
          squares: createInitialSquares(),
          xIsNext: true,
          roundResult: null,
          score: { X: 0, O: 0, ties: 0 },
        });
        useGameStore.persist.clearStorage();
      },
    })),
    {
      name: "xo-game-storage",
      storage,
    },
  ),
);
