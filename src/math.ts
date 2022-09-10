/**
 *
 * @param max Maximum possible random number (excluded)
 * @returns Random number
 */
export function randomInt(max: number) {
  return Math.floor(Math.random() * max);
}

/**
 * Runs a true modulo operation (a % b) where the result cannot be a negative
 * number
 */
export function mod(a: number, b: number) {
  return ((a % b) + b) % b;
}
