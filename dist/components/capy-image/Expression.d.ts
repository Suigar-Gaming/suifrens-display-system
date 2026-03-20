import { ComponentType } from "react";
import { type CapyExpression } from "./types.js";
type ExpressionProps = {
    expression: CapyExpression;
};
export declare const expressionComponents: Record<CapyExpression, ComponentType>;
export declare function Expression({ expression }: ExpressionProps): import("react/jsx-runtime").JSX.Element;
export {};
