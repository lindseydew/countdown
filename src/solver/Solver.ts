export class Solver {
  sortedValues: number[];
  constructor(readonly target: number, readonly values: number[]) {
    this.sortedValues = values.sort().reverse();
  }
  solverRec(
    restOfValues: number[],
    operation: Operation
  ): Expression | undefined {
    if (operation.value === this.target) {
      return operation;
    } else if (restOfValues.length === 0) {
      return undefined;
    } else {
      return this.solverRec(
        restOfValues.splice(1),
        new Operation(operation, new Literal(restOfValues[0]), "+")
      );
    }
  }
  solve(): Expression[] {
    const startValue = this.sortedValues[0];

    const solutions: (Expression | undefined)[] = this.sortedValues.map(
      (v, idx) => {
        if (idx === 0) {
          return undefined;
        } else {
          return this.solverRec(
            this.sortedValues.filter((_, i) => i === idx),
            new Operation(
              new Literal(startValue),
              new Literal(this.sortedValues[v]),
              "+"
            )
          );
        }
      }
    );

    return solutions.reduce<Expression[]>((prev, current) => {
      if (current !== undefined) {
        return [...prev, current];
      } else return prev;
    }, []);
  }
}

// class Expression {
//   constructor(a: number, b: number, operation: string) {}
// }

// interface literal -> string and numeric value

// two implementations -> one literal
// an operation -> accepts expressions
// toString,

// class Solution {
//     constructor()
// }

export interface Expression {
  prettyPrint: string;
  value: number;
  valid: boolean;
}

export function isOperationType(value: Expression): value is Operation {
  return "operation" in value;
}

export function isLiteralType(value: Expression): value is Literal {
  return !("operation" in value);
}
export class Literal implements Expression {
  prettyPrint: string;
  valid: boolean;
  constructor(readonly value: number) {
    this.prettyPrint = `${value}`;
    this.valid = true;
  }
}

export class Operation implements Expression {
  prettyPrint: string;
  value: number;
  valid: boolean;
  operation: string;
  constructor(
    readonly exp1: Expression,
    readonly exp2: Expression,
    // TODO to make an enum / union type of these
    operation: string
  ) {
    this.value = exp1.value + exp2.value;
    this.valid = true;
    const expToString = (exp: Expression) => {
      return isOperationType(exp) ? `(${exp.prettyPrint})` : `${exp.value}`;
    };
    this.prettyPrint = `${expToString(exp1)} + ${expToString(exp2)}`;
    this.operation = operation;
  }
}
