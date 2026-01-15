import logo from "/images/logo.svg";
import iconX from "/images/icon-x.svg";
import iconO from "/images/icon-o.svg";
import restartIcon from "/images/icon-restart.svg";
import Square from "@/components/ui/Square";
import { useGameStore } from "@/store/game.store";
import { useEffect } from "react";
import {
  calculateWinner,
  calculateStatus,
  calculateTurns,
} from "@/utils/game.utils";
import type { Player, GameResult } from "@/types/game.types";
import ResultOverlay from "./ResultOverlay";
import { getBestMove } from "@/utils/minimax";

export default function Board() {
  const {
    p1mark,
    squares,
    xIsNext,
    score,
    roundResult,
    mode,
    setSquares,
    togglePlayer,
    resetGame,
    finishRound,
    nextRound,
  } = useGameStore();

  const player: Player = xIsNext ? "X" : "O";
  const winner = calculateWinner(squares);
  const turns = calculateTurns(squares);
  const status = calculateStatus(winner, turns);
  const cpuPlayer: Player = p1mark === "X" ? "O" : "X";
  const humanPlayer: Player = p1mark;
  const isCpuTurn =
    mode === "cpu" && player === cpuPlayer && !winner && !roundResult;

  function handleClick(i: number) {
    if (isCpuTurn) return;
    if (squares[i] || winner) return;

    const nextSquares = [...squares];
    nextSquares[i] = player;

    setSquares(nextSquares);
    togglePlayer();
  }

  useEffect(() => {
    if (status && !roundResult) {
      finishRound(status);
    }
  }, [status, roundResult, finishRound]);

  useEffect(() => {
    if (!isCpuTurn) return;

    const timeout = setTimeout(() => {
      const move = getBestMove(squares, cpuPlayer, humanPlayer);
      if (move === null) return;

      const nextSquares = [...squares];
      nextSquares[move] = cpuPlayer;

      setSquares(nextSquares);
      togglePlayer();
    }, 400);

    return () => clearTimeout(timeout);
  }, [isCpuTurn, squares]);

  function getScoreLabel(mark: Player) {
    if (mode === "cpu") {
      return mark === p1mark ? "YOU" : "CPU";
    }

    return mark === p1mark ? "P1" : "P2";
  }

  function getOverlayText(status: GameResult) {
    if (status === "tie") {
      return {
        title: "ROUND TIED",
        subtitle: "",
      };
    }

    if (mode === "cpu") {
      const isPlayerWin = status === p1mark;

      return {
        title: isPlayerWin ? "YOU WON!" : "OH NO, YOU LOST…",
        subtitle: "",
      };
    }

    return {
      title: `${status === p1mark ? "PLAYER 1" : "PLAYER 2"} WINS!`,
      subtitle: "",
    };
  }

  const overlayText = status ? getOverlayText(status) : null;

  return (
    <>
      <div className="container mx-auto flex h-screen max-w-93.75 flex-col justify-between gap-16 p-6 md:max-w-115 md:justify-center md:gap-5 md:px-0">
        <div className="grid grid-cols-[1fr_auto_1fr] items-center">
          <div className="h-8 w-18 justify-self-start">
            <img className="w-full object-contain" src={logo} alt="Logo XO" />
          </div>
          <div className="flex items-center justify-center gap-2 justify-self-center rounded-[5px] bg-slate-800 px-3.75 py-2.25 shadow-[0_4px_0_0_#10212A] md:px-8.5 md:py-3.5">
            <img
              className="h-4 w-4"
              src={player === "X" ? iconX : iconO}
              alt="Player icon"
            />
            <p className="font-outfit text-[14px] font-bold tracking-[0.88px] text-gray-200 uppercase md:text-base md:tracking-[1px]">
              Turn
            </p>
          </div>
          <button
            onClick={resetGame}
            className="flex cursor-pointer items-center justify-center justify-self-end rounded-[5px] bg-gray-200 p-3 shadow-[0_4px_0_0_#6B8997] transition-colors duration-300 hover:bg-gray-100 md:p-4"
          >
            <img
              className="h-4 w-4 object-contain md:h-5 md:w-5"
              src={restartIcon}
              alt="Reset game"
            />
          </button>
        </div>
        <div className="grid grid-cols-3 grid-rows-3 gap-5">
          {squares.map((square, i) => (
            <div key={i} className="aspect-square w-full">
              <Square
                value={square}
                isWinning={winner?.lines.includes(i)}
                onClick={() => handleClick(i)}
              />
            </div>
          ))}
        </div>
        <div className="grid grid-cols-3 gap-5">
          <div className="rounded-[10px] bg-teal-600 py-3 text-center">
            <h2 className="font-outfit text-xs font-medium tracking-[0.75px] text-slate-900 uppercase">
              {`X (${getScoreLabel("X")})`}
            </h2>
            <p className="font-outfit text-xl font-bold tracking-[1.25px] text-slate-900">
              {score.X}
            </p>
          </div>
          <div className="rounded-[10px] bg-gray-200 py-3 text-center">
            <h2 className="font-outfit tracking-[0.75px text-slate-900] text-xs font-medium uppercase">
              Ties
            </h2>
            <p className="font-outfit text-xl font-bold tracking-[1.25px] text-slate-900">
              {score.ties}
            </p>
          </div>
          <div className="rounded-[10px] bg-amber-500 py-3 text-center">
            <h2 className="font-outfit text-xs font-medium tracking-[0.75px] text-slate-900 uppercase">
              {`O (${getScoreLabel("O")})`}
            </h2>
            <p className="font-outfit text-xl font-bold tracking-[1.25px] text-slate-900">
              {score.O}
            </p>
          </div>
        </div>
      </div>
      {status && roundResult && overlayText && (
        <ResultOverlay
          status={status}
          title={overlayText.title}
          subtitle={overlayText.subtitle}
          onQuit={resetGame}
          onNextRound={nextRound}
        />
      )}
    </>
  );
}
