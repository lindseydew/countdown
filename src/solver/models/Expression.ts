export abstract class Expression {
  abstract prettyPrint: string;
  abstract value: number;
  abstract valid: boolean;

  add(n: number): Operation {
    return new Operation(this, new Literal(n), new Add());
  }
}

// TODO -> how can I do a more robust type guard?
// using a string version of a field is not great.
export function isOperationType(value: Expression): value is Operation {
  return "binOp" in value;
}

export function isLiteralType(value: Expression): value is Literal {
  return !("binOp" in value);
}
export class Literal extends Expression {
  prettyPrint: string;
  valid: boolean;
  constructor(readonly value: number) {
    super();
    this.prettyPrint = `${value}`;
    this.valid = true;
  }
}

export class Operation extends Expression {
  prettyPrint: string;
  value: number;
  valid: boolean;
  constructor(
    readonly exp1: Expression,
    readonly exp2: Expression,
    readonly binOp: BinOp
  ) {
    super();
    this.valid = true;
    const expToString = (exp: Expression) => {
      return isOperationType(exp) ? `(${exp.prettyPrint})` : `${exp.value}`;
    };
    this.prettyPrint = `${expToString(exp1)} + ${expToString(exp2)}`;
    this.value = binOp.apply(exp1.value, exp2.value);
  }
}

abstract class BinOp {
  abstract apply(n1: number, n2: number): number;
}

export class Add extends BinOp {
  constructor() {
    super();
  }
  apply(n1: number, n2: number) {
    return n1 + n2;
  }
}
