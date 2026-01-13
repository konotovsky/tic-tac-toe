import clsx from "clsx";

import type { ButtonProps } from "@/types/ui.types";

export default function Button({
  children,
  color = "slate",
  variant = "primary",
  onClick,
}: ButtonProps) {
  return (
    <button
      className={clsx(
        "font-outfit h-full w-full cursor-pointer rounded-[15px] p-3.5 text-xl font-bold tracking-[1.25px] text-slate-900 transition-all duration-300",
        "shadow-[0_var(--shadow-y)_0_0_var(--shadow-color)]",
        {
          "[--shadow-y:8px]": variant === "primary",
          "[--shadow-y:4px]": variant === "secondary",

          "bg-amber-500 [--shadow-color:#CC8B13] hover:bg-amber-400":
            color === "yellow",
          "bg-teal-600 [--shadow-color:#118C87] hover:bg-teal-400":
            color === "blue",
          "bg-gray-200 [--shadow-color:#6B8997] hover:bg-gray-100":
            color === "gray",
          "bg-slate-800 [--shadow-color:#10212A]": color === "slate",
        },
      )}
      onClick={onClick}
    >
      {children}
    </button>
  );
}
