import { Expression, Literal, Operation } from "./models/Expression";
import { add, divide, multiply, subtract } from "./models/OperationType";

function choose(arr: number[], k: number, prefix: number[] = []): number[][] {
  if (k == 0) return [prefix];
  return arr.flatMap((v, i) => choose(arr.slice(i + 1), k - 1, [...prefix, v]));
}
interface Temp {
  expression: Expression;
  remainingExpressions: Expression[];
}

interface Temp2 {
  exp1: Expression;
  exp2: Expression;
  remainingExpressions: Expression[];
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

  static chooseTwoValuesFromArray(
    expressions: Expression[],
    temp: Temp2[]
  ): Temp2[] {
    if (expressions.length < 2) return temp;
    else {
      return expressions
        .flatMap((v1, i) => {
          return expressions.map((v2, j) => {
            if (j > i) {
              return {
                exp1: v1,
                exp2: v2,
                remainingExpressions: expressions.filter(
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

  static generatingSubExpressionsSize2(sortedValues: Expression[]): Temp[] {
    return this.chooseTwoValuesFromArray(sortedValues, []).flatMap((temp2) => {
      return [
        {
          expression: temp2.exp1.add(temp2.exp2.value),
          remainingExpressions: temp2.remainingExpressions,
        },
        {
          expression: temp2.exp1.subtract(temp2.exp2.value),
          remainingExpressions: temp2.remainingExpressions,
        },
        {
          expression: temp2.exp1.multiply(temp2.exp2.value),
          remainingExpressions: temp2.remainingExpressions,
        },
        {
          expression: temp2.exp1.divide(temp2.exp2.value),
          remainingExpressions: temp2.remainingExpressions,
        },
      ];
    });
  }
  static recurse(exp: Expression[], acc: Expression[]): Expression[] {
    const temps = this.generatingSubExpressionsSize2(exp);
    return temps.reduce<Expression[]>((exps, temp) => {
      if (temp.remainingExpressions.length === 0) {
        return [temp.expression, ...exps];
      } else {
        const temps2 = this.generatingSubExpressionsSize2([
          temp.expression,
          ...temp.remainingExpressions,
        ]);
        return temps2.reduce<Expression[]>((e, t) => {
          return [
            ...e,
            ...this.recurse(t.remainingExpressions, [t.expression, ...e]),
          ];
        }, acc);
      }
    }, acc);
  }

  static generateAllExpressions2(values: number[]): Expression[] {
    const sortedValues = values
      .sort()
      .reverse()
      .map((c) => new Literal(c));
    return this.recurse(sortedValues, []);
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
