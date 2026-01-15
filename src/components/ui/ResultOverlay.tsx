import type { ResultOverlayProps } from "@/types/ui.types";

import iconX from "/images/icon-x.svg";
import iconO from "/images/icon-o.svg";
import Button from "./Button";
import clsx from "clsx";

export default function ResultOverlay({
  status,
  title,
  subtitle,
  onQuit,
  onNextRound,
}: ResultOverlayProps) {
  const isTie = status === "tie";

  return (
    <div className="fixed inset-0 flex flex-col justify-center bg-black/70">
      <div className="flex flex-col items-center justify-center gap-4 bg-slate-800 p-12">
        <p className="font-outfit text-sm font-bold tracking-[1px] text-gray-200 uppercase">
          {subtitle}
        </p>

        <h2 className="font-outfit text-sm font-bold tracking-[1px] text-gray-200 uppercase">
          {title}
        </h2>

        {!isTie && (
          <div className="flex items-center justify-center gap-2 md:gap-6">
            <img
              className="h-7.5 w-7.5 md:h-16 md:w-16"
              src={status === "X" ? iconX : iconO}
              alt="Player icon"
            />
            <p
              className={clsx(
                "font-outfit text-2xl font-bold tracking-[1.5px] whitespace-nowrap uppercase md:text-[40px] md:tracking-[2.5px]",
                {
                  "text-teal-600": status === "X",
                  "text-amber-500": status === "O",
                },
              )}
            >
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
          <div>
            <Button color="yellow" variant="secondary" onClick={onNextRound}>
              NEXT ROUND
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
