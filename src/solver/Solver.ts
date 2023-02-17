import { Expression, Literal, Operation } from "./models/Expression";
import { Add } from "./models/OperationType";

export class Solver {
  sortedValues: number[];
  constructor(readonly target: number, readonly values: number[]) {
    this.sortedValues = values.sort().reverse();
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
    const solutions: (Expression | undefined)[] = this.sortedValues
      .map((v1, i) => {
        return this.sortedValues.map((v2, j) => {
          if (j > i) {
            return this.solverRec(
              this.sortedValues.filter((_, idx) => idx !== i && idx !== j),
              new Operation(new Literal(v1), new Literal(v2), new Add())
            );
          } else return undefined;
        });
      })
      .reduce<(Expression | undefined)[]>((acc, curVal) => {
        return acc.concat(curVal);
      }, []);

    return solutions
      .reduce<Expression[]>((prev, current) => {
        if (current !== undefined) {
          return [...prev, current];
        } else return prev;
      }, [])
      .filter((e) => e.value === this.target);
  }
}
