export type Matrix = [number, number, number, number, number, number];
export declare const IDENTITY_MATRIX: Matrix;
export declare function multiplyMatrix(a: Matrix, b: Matrix): Matrix;
export declare function parseMatrix(transform: string | undefined | null): Matrix | null;
export declare function matrixToString(matrix: Matrix): string;
export declare function translateMatrix(x: number, y: number): Matrix;
export declare function rotateMatrix(angleDeg: number, pivotX: number, pivotY: number): Matrix;
