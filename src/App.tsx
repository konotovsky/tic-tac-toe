import { useGameStore } from "@/store/game.store";

import NewGameMenu from "@/components/pages/NewGameMenu";
import Board from "@/components/ui/Board";

export default function App() {
  const phase = useGameStore((state) => state.phase);

  switch (phase) {
    case "menu":
      return <NewGameMenu />;

    case "game":
      return <Board />;

    default:
      return <NewGameMenu />;
  }
}
