import type { ReactNode } from "react";
import type { SquareValue, GameResult, Player } from "./game.types";

export type ButtonColor = "yellow" | "blue" | "gray" | "slate";

export type ButtonVariant = "primary" | "secondary";

export interface ButtonProps {
  children: ReactNode;
  color?: ButtonColor;
  variant?: ButtonVariant;
  onClick?: () => void;
}

export interface SquareProps {
  value: SquareValue;
  isWinning?: boolean;
  onClick: () => void;
}

export interface ResultOverlayProps {
  status: GameResult;
  p1mark: Player;
  onNextRound: () => void;
  onQuit: () => void;
}
