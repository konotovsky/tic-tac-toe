export type Player = "X" | "O";

export type SquareValue = Player | null;

export type GamePhase = "menu" | "game";

export type GameResult = Player | "tie";

export type WinLine = [number, number, number];

export type GameMode = "pvp" | "cpu";

export type Winner = {
  player: Player;
  lines: WinLine;
} | null;

export type Score = Record<Player, number> & { ties: number };
