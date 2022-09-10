import { FIELD_SIZE } from "./game_constants";
import { GameState } from "./game_state";

const Colors = {
  FieldDarker: "#334155",
  FieldLighter: "#475569",
  Snake: "#22c55e",
  Apple: "#f43f5e",
};

export class CanvasController {
  static #CANVAS_SIZE = 1000;

  #ctx: CanvasRenderingContext2D;

  #rectangleSize: number;

  constructor() {
    const canvas = document.querySelector<HTMLCanvasElement>("#main-canvas")!;
    this.#ctx = canvas.getContext("2d")!;

    canvas.width = CanvasController.#CANVAS_SIZE;
    canvas.height = CanvasController.#CANVAS_SIZE;

    this.#rectangleSize = CanvasController.#CANVAS_SIZE / FIELD_SIZE;
  }

  drawState({ snake, apple }: GameState) {
    for (let x = 0; x < FIELD_SIZE; x++) {
      for (let y = 0; y < FIELD_SIZE; y++) {
        const color =
          (x + y) % 2 === 0 ? Colors.FieldDarker : Colors.FieldLighter;

        this.#drawRectangle(y, x, color);
      }
    }

    for (let i = 0; i < snake.length; i++) {
      this.#drawRectangle(snake[i].x, snake[i].y, Colors.Snake);
    }

    this.#drawSmallerRectangle(apple.x, apple.y, Colors.Apple);
  }

  #drawRectangle(x: number, y: number, color: string) {
    this.#ctx.fillStyle = color;

    this.#ctx.fillRect(
      this.#rectangleSize * x,
      this.#rectangleSize * (FIELD_SIZE - 1 - y),
      this.#rectangleSize,
      this.#rectangleSize
    );
  }

  #drawSmallerRectangle(x: number, y: number, color: string) {
    this.#ctx.fillStyle = color;

    this.#ctx.fillRect(
      this.#rectangleSize * x + this.#rectangleSize * 0.15,
      this.#rectangleSize * (FIELD_SIZE - 1 - y) + this.#rectangleSize * 0.15,
      this.#rectangleSize - this.#rectangleSize * 0.3,
      this.#rectangleSize - this.#rectangleSize * 0.3
    );
  }
}
