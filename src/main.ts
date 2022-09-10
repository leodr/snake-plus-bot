import { CanvasController } from "./canvas_controller";
import { Direction } from "./game_constants";
import { GameState } from "./game_state";

const state = new GameState();
const canvasController = new CanvasController();

canvasController.drawState(state);

const intervalId = setInterval(() => {
  try {
    state.transitionToNextState();
  } catch {
    clearInterval(intervalId);
    alert("You are dead.");
  } finally {
    canvasController.drawState(state);
  }
}, 300);

window.addEventListener("keydown", (e) => {
  switch (e.key) {
    case "ArrowRight":
      state.setDirection(Direction.Right);
      break;
    case "ArrowDown":
      state.setDirection(Direction.Down);
      break;
    case "ArrowLeft":
      state.setDirection(Direction.Left);
      break;
    case "ArrowUp":
      state.setDirection(Direction.Up);
      break;
  }
});
