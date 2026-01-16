import clsx from "clsx";

import { useGameStore } from "@/store/game.store";

import Button from "@/components/ui/Button";
import logo from "/images/logo.svg";
import type { Player } from "@/types/game.types";

export default function NewGameMenu() {
  const p1mark = useGameStore((state) => state.p1mark);
  const setP1Mark = useGameStore((state) => state.setP1Mark);
  const { setMode, startGame } = useGameStore();

  const onClick = (player: Player) => {
    setP1Mark(player);
  };

  return (
    <>
      <div className="container mx-auto flex h-dvh max-w-93.75 items-center justify-center px-6 md:max-w-115 md:px-0">
        <div className="flex w-full flex-col items-center gap-8">
          <div className="h-8 w-18">
            <img className="w-full object-contain" src={logo} alt="Logo XO" />
          </div>
          <div className="w-full rounded-[15px] bg-slate-800 p-6 shadow-[0_8px_0_0_#10212A]">
            <h1 className="font-outfit text-center font-bold tracking-[1px] text-gray-200 uppercase">
              Pick player 1's mark
            </h1>
            <div className="mt-6 mb-4 flex items-center justify-between rounded-[10px] bg-slate-900 p-2">
              <button
                className={clsx(
                  "w-1/2 cursor-pointer rounded-[10px] py-3 transition-colors duration-300",
                  {
                    "bg-gray-200": p1mark === "X",
                  },
                )}
                onClick={() => onClick("X")}
              >
                <svg
                  viewBox="0 0 64 64"
                  className="mx-auto h-8 w-8"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M15.002 1.147 32 18.145 48.998 1.147a3 3 0 0 1 4.243 0l9.612 9.612a3 3 0 0 1 0 4.243L45.855 32l16.998 16.998a3 3 0 0 1 0 4.243l-9.612 9.612a3 3 0 0 1-4.243 0L32 45.855 15.002 62.853a3 3 0 0 1-4.243 0L1.147 53.24a3 3 0 0 1 0-4.243L18.145 32 1.147 15.002a3 3 0 0 1 0-4.243l9.612-9.612a3 3 0 0 1 4.243 0Z"
                    fill={p1mark === "O" ? "#A8BFC9" : "#1f3641"}
                    fillRule="evenodd"
                  />
                </svg>
              </button>
              <button
                className={clsx(
                  "w-1/2 cursor-pointer rounded-[10px] py-3 transition-colors duration-300",
                  {
                    "bg-gray-200": p1mark === "O",
                  },
                )}
                onClick={() => onClick("O")}
              >
                <svg
                  viewBox="0 0 64 64"
                  className="mx-auto h-8 w-8"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M32 0c17.673 0 32 14.327 32 32 0 17.673-14.327 32-32 32C14.327 64 0 49.673 0 32 0 14.327 14.327 0 32 0Zm0 18.963c-7.2 0-13.037 5.837-13.037 13.037 0 7.2 5.837 13.037 13.037 13.037 7.2 0 13.037-5.837 13.037-13.037 0-7.2-5.837-13.037-13.037-13.037Z"
                    fill={p1mark === "X" ? "#A8BFC9" : "#1f3641"}
                  />
                </svg>
              </button>
            </div>
            <h2 className="font-outfit text-center text-sm font-medium tracking-[0.88px] text-gray-200 uppercase">
              Remember: X goes first
            </h2>
          </div>
          <div className="flex w-full flex-col gap-4">
            <Button
              color="yellow"
              onClick={() => {
                setMode("cpu");
                startGame();
              }}
            >
              <p className="font-outfit text-base font-bold tracking-[1px] text-slate-900 uppercase">
                NEW GAME (VS CPU)
              </p>
            </Button>
            <Button color="blue" onClick={startGame}>
              <p className="font-outfit text-base font-bold tracking-[1px] text-slate-900 uppercase">
                NEW GAME (VS PLAYER)
              </p>
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}
