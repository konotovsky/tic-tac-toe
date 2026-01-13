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
import type { Player } from "@/types/game.types";
import ResultOverlay from "./ResultOverlay";

export default function Board() {
  const {
    p1mark,
    squares,
    xIsNext,
    score,
    roundResult,
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

  function handleClick(i: number) {
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
            <h2 className="font-outfit tracking-[0.75px text-slate-900] text-xs font-medium uppercase">
              {`X (${p1mark === "X" ? "P1" : "P2"})`}
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
            <h2 className="font-outfit tracking-[0.75px text-slate-900] text-xs font-medium uppercase">
              {`O (${p1mark === "O" ? "P1" : "P2"})`}
            </h2>
            <p className="font-outfit text-xl font-bold tracking-[1.25px] text-slate-900">
              {score.O}
            </p>
          </div>
        </div>
      </div>
      {status && (
        <ResultOverlay
          status={status}
          p1mark={p1mark}
          onQuit={resetGame}
          onNextRound={nextRound}
        />
      )}
    </>
  );
}
