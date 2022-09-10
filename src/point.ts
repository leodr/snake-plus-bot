export class Point {
  x: number;
  y: number;

  constructor(x: number, y: number) {
    this.x = x;
    this.y = y;
  }

  clone() {
    return new Point(this.x, this.y);
  }

  isOnTopOf(otherPoint: Point) {
    return this.x === otherPoint.x && this.y === otherPoint.y;
  }
}
