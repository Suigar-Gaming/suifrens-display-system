import { formatNumber } from "./parts.js";

export type Matrix = [number, number, number, number, number, number];

export const IDENTITY_MATRIX: Matrix = [1, 0, 0, 1, 0, 0];

export function multiplyMatrix(a: Matrix, b: Matrix): Matrix {
  return [
    a[0] * b[0] + a[2] * b[1],
    a[1] * b[0] + a[3] * b[1],
    a[0] * b[2] + a[2] * b[3],
    a[1] * b[2] + a[3] * b[3],
    a[0] * b[4] + a[2] * b[5] + a[4],
    a[1] * b[4] + a[3] * b[5] + a[5],
  ];
}

export function parseMatrix(transform: string | undefined | null): Matrix | null {
  if (!transform) {
    return null;
  }
  const match = transform.match(
    /matrix\(\s*(-?\d*\.?\d+(?:e[-+]?\d+)?)\s*,\s*(-?\d*\.?\d+(?:e[-+]?\d+)?)\s*,\s*(-?\d*\.?\d+(?:e[-+]?\d+)?)\s*,\s*(-?\d*\.?\d+(?:e[-+]?\d+)?)\s*,\s*(-?\d*\.?\d+(?:e[-+]?\d+)?)\s*,\s*(-?\d*\.?\d+(?:e[-+]?\d+)?)\s*\)/
  );
  if (!match) {
    return null;
  }
  const [, a, b, c, d, e, f] = match;
  return [a, b, c, d, e, f].map((value) => Number(value)) as Matrix;
}

export function matrixToString(matrix: Matrix): string {
  return `matrix(${formatNumber(matrix[0])}, ${formatNumber(matrix[1])}, ${formatNumber(matrix[2])}, ${formatNumber(matrix[3])}, ${formatNumber(matrix[4])}, ${formatNumber(matrix[5])})`;
}

export function translateMatrix(x: number, y: number): Matrix {
  return [1, 0, 0, 1, x, y];
}

export function rotateMatrix(angleDeg: number, pivotX: number, pivotY: number): Matrix {
  const angle = (angleDeg * Math.PI) / 180;
  const cos = Math.cos(angle);
  const sin = Math.sin(angle);
  const translateToOrigin = translateMatrix(-pivotX, -pivotY);
  const rotation: Matrix = [cos, sin, -sin, cos, 0, 0];
  const translateBack = translateMatrix(pivotX, pivotY);
  return multiplyMatrix(translateBack, multiplyMatrix(rotation, translateToOrigin));
}
