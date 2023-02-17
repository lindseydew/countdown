import { s } from "vitest/dist/env-afee91f0";
import { Expression, Literal, Operation } from "./models/Expression";
import { Add, Divide, Multiply, Subtract } from "./models/OperationType";

function choose(arr: number[], k: number, prefix: number[] = []): number[][] {
  if (k == 0) return [prefix];
  return arr.flatMap((v, i) => choose(arr.slice(i + 1), k - 1, [...prefix, v]));
}
export class Solver {
  sortedValues: number[];
  constructor(readonly target: number, readonly values: number[]) {
    this.sortedValues = values.sort().reverse();
  }

  static generateAllExpressions(values: number[]): Expression[] {
    const sortedValues = values.sort().reverse();
    return sortedValues.flatMap((_, i) => {
      return this.generateExpressionsOfSize(sortedValues, i + 1);
    });
  }

  static generateExpressionsOfSize(
    values: number[],
    size: number
  ): Expression[] {
    const sortedValues = values.sort().reverse();
    const combos = choose(sortedValues, size);
    return combos.flatMap((subList) => {
      return this.combineExpressionRec(
        subList.filter((_, idx) => idx != 0),
        new Literal(subList[0])
      );
    });
  }

  static combineExpressionRec(
    restOfValues: number[],
    exp: Expression
  ): Expression[] {
    if (restOfValues.length === 0) {
      return [exp];
    } else
      return [
        this.combineExpressionRec(
          restOfValues.filter((_, idx) => idx !== 0),
          new Operation(exp, new Literal(restOfValues[0]), new Add())
        ),
        this.combineExpressionRec(
          restOfValues.filter((_, idx) => idx !== 0),
          new Operation(exp, new Literal(restOfValues[0]), new Subtract())
        ),
        this.combineExpressionRec(
          restOfValues.filter((_, idx) => idx !== 0),
          new Operation(exp, new Literal(restOfValues[0]), new Multiply())
        ),
        this.combineExpressionRec(
          restOfValues.filter((_, idx) => idx !== 0),
          new Operation(exp, new Literal(restOfValues[0]), new Divide())
        ),
      ].flatMap((_) => _);
  }

  solverRec(
    restOfValues: number[],
    operation: Operation
  ): Expression | undefined {
    if (restOfValues.length === 0) {
      return undefined;
    } else if (operation.value === this.target) {
      return operation;
    } else if (restOfValues.length === 1) {
      return new Operation(operation, new Literal(restOfValues[0]), new Add());
    } else {
      return this.solverRec(
        restOfValues.splice(1),
        new Operation(operation, new Literal(restOfValues[0]), new Add())
      );
    }
  }

  solve(): Expression[] {
    return Solver.generateAllExpressions(this.sortedValues).filter(
      (e) => e.value === this.target
    );
  }
}
