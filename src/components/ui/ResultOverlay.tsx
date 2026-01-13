import type { ResultOverlayProps } from "@/types/ui.types";

import iconX from "/images/icon-x.svg";
import iconO from "/images/icon-o.svg";
import Button from "./Button";

export default function ResultOverlay({
  status,
  p1mark,
  onQuit,
  onNextRound,
}: ResultOverlayProps) {
  const isTie = status === "tie";

  return (
    <div className="fixed inset-0 flex flex-col justify-center bg-black/70">
      <div className="flex flex-col items-center justify-center gap-4 bg-slate-800 p-12">
        <h2 className="font-outfit text-[14px] font-bold tracking-[0.88px] text-gray-200 uppercase">
          {isTie ? (
            <p className="font-outfit text-2xl font-bold tracking-[1.5px] text-gray-200 uppercase">
              ROUND TIED
            </p>
          ) : (
            `${status === p1mark ? "PLAYER 1" : "PLAYER 2"} WINS!`
          )}
        </h2>
        {!isTie && (
          <div className="flex items-center justify-center gap-2">
            <img
              className="h-7.5 w-7.5"
              src={status === "X" ? iconX : iconO}
              alt="Player icon"
            />
            <p className="font-outfit text-2xl font-bold tracking-[1.5px] whitespace-nowrap text-teal-600 uppercase">
              TAKES THE ROUND
            </p>
          </div>
        )}
        <div className="flex gap-4">
          <div>
            <Button color="gray" variant="secondary" onClick={onQuit}>
              QUIT
            </Button>
          </div>
          <div className="whitespace-nowrap">
            <Button color="yellow" variant="secondary" onClick={onNextRound}>
              NEXT ROUND
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
