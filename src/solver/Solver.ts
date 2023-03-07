import { Expression, Literal, Operation } from "./models/Expression";
import { add, divide, multiply, subtract } from "./models/OperationType";

function choose(arr: number[], k: number, prefix: number[] = []): number[][] {
  if (k == 0) return [prefix];
  return arr.flatMap((v, i) => choose(arr.slice(i + 1), k - 1, [...prefix, v]));
}
interface Temp {
  expression: Expression;
  reminaingValues: number[];
}

interface Temp2 {
  value1: number;
  value2: number;
  remainingValues: number[];
}
export class Solver {
  sortedValues: number[];
  constructor(readonly target: number, readonly values: number[]) {
    this.sortedValues = values.sort((a, b) => b - a);
  }

  static generateAllExpressions(values: number[]): Expression[] {
    const sortedValues = values.sort().reverse();
    return sortedValues.flatMap((_, i) => {
      return this.generateExpressionsOfSize(sortedValues, i + 1);
    });
  }

  static chooseTwoValuesFromArray(values: number[], temp: Temp2[]): Temp2[] {
    if (values.length < 2) return temp;
    else {
      return values
        .flatMap((v1, i) => {
          return values.map((v2, j) => {
            if (j > i) {
              return {
                value1: v1,
                value2: v2,
                remainingValues: values.filter(
                  (v, index) => index !== i && index !== j
                ),
              };
            }
          });
        })
        .reduce<Temp2[]>((prev, curr) => {
          if (curr === undefined) {
            return prev;
          } else return [...prev, curr];
        }, []);
    }
  }

  static generatingSubExpressionsSize2(values: number[]): Temp[] {
    const sortedValues = values.sort().reverse();
    return this.chooseTwoValuesFromArray(sortedValues, []).flatMap((temp2) => {
      return [
        {
          expression: new Literal(temp2.value1).add(temp2.value2),
          reminaingValues: temp2.remainingValues,
        },
        {
          expression: new Literal(temp2.value1).subtract(temp2.value2),
          reminaingValues: temp2.remainingValues,
        },
        {
          expression: new Literal(temp2.value1).multiply(temp2.value2),
          reminaingValues: temp2.remainingValues,
        },
        {
          expression: new Literal(temp2.value1).divide(temp2.value2),
          reminaingValues: temp2.remainingValues,
        },
      ];
    });
  }
  static generateExpressionsOfSize(
    values: number[],
    size: number
  ): Expression[] {
    const combos = choose(values, size);
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
    }
    // make a list of the operations and map over it.
    else
      return [
        this.combineExpressionRec(
          restOfValues.filter((_, idx) => idx !== 0),
          new Operation(exp, new Literal(restOfValues[0]), add)
        ),
        this.combineExpressionRec(
          restOfValues.filter((_, idx) => idx !== 0),
          new Operation(exp, new Literal(restOfValues[0]), subtract)
        ),
        this.combineExpressionRec(
          restOfValues.filter((_, idx) => idx !== 0),
          new Operation(exp, new Literal(restOfValues[0]), multiply)
        ),
        this.combineExpressionRec(
          restOfValues.filter((_, idx) => idx !== 0),
          new Operation(exp, new Literal(restOfValues[0]), divide)
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
      return new Operation(operation, new Literal(restOfValues[0]), add);
    } else {
      return this.solverRec(
        restOfValues.splice(1),
        new Operation(operation, new Literal(restOfValues[0]), add)
      );
    }
  }

  solve(): Expression[] {
    return Solver.generateAllExpressions(this.sortedValues).filter(
      (e) => e.value === this.target
    );
  }
}
