import { Direction, FIELD_SIZE, INITIAL_SNAKE_LENGTH } from "./game_constants";
import { mod, randomInt } from "./math";
import { Point } from "./point";

export class GameState {
  direction = Direction.Right;
  snake: Array<Point> = [];
  apple: Point;

  constructor() {
    for (let i = 0; i < INITIAL_SNAKE_LENGTH; i++) {
      this.snake.push(
        new Point(
          Math.floor(FIELD_SIZE / 2 - INITIAL_SNAKE_LENGTH) + i,
          Math.floor(FIELD_SIZE / 2 - 0.1)
        )
      );
    }

    this.apple = new Point(0, 0);
    this.newApplePosition();
  }

  setDirection(newDirection: Direction) {
    switch (this.direction) {
      case Direction.Right:
        if (newDirection === Direction.Left) return;
        break;
      case Direction.Down:
        if (newDirection === Direction.Up) return;
        break;
      case Direction.Left:
        if (newDirection === Direction.Right) return;
        break;
      case Direction.Up:
        if (newDirection === Direction.Down) return;
        break;
    }

    this.direction = newDirection;
  }

  newApplePosition() {
    this.apple.x = randomInt(FIELD_SIZE);
    this.apple.y = randomInt(FIELD_SIZE);
  }

  transitionToNextState() {
    let newSnakeHead = this.snake.at(-1)!.clone();

    switch (this.direction) {
      case Direction.Right:
        newSnakeHead.x = mod(newSnakeHead.x + 1, FIELD_SIZE);
        break;
      case Direction.Down:
        newSnakeHead.y = mod(newSnakeHead.y - 1, FIELD_SIZE);
        break;
      case Direction.Left:
        newSnakeHead.x = mod(newSnakeHead.x - 1, FIELD_SIZE);
        break;
      case Direction.Up:
        newSnakeHead.y = mod(newSnakeHead.y + 1, FIELD_SIZE);
        break;
    }

    for (const snakePart of this.snake) {
      if (newSnakeHead.isOnTopOf(snakePart)) {
        throw new DeathError();
      }
    }

    if (newSnakeHead.isOnTopOf(this.apple)) {
      this.newApplePosition();
    } else {
      this.snake.splice(0, 1);
    }

    this.snake.push(newSnakeHead);
  }
}

class DeathError extends Error {}
