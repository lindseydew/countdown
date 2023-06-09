import { add, divide, multiply, subtract } from "./OperationType";

export abstract class Expression {
  abstract prettyPrint: string;
  abstract value: number;
  abstract valid: boolean;

  add(n: number): Operation {
    return new Operation(this, new Literal(n), add);
  }

  subtract(n: number): Operation {
    return new Operation(this, new Literal(n), subtract);
  }

  multiply(n: number): Operation {
    return new Operation(this, new Literal(n), multiply);
  }

  divide(n: number): Operation {
    return new Operation(this, new Literal(n), divide);
  }
}

// TODO -> how can I do a more robust type guard?
// using a string version of a field is not great.
export function isOperationType(value: Expression): value is Operation {
  return "opType" in value;
}

export function isLiteralType(value: Expression): value is Literal {
  return !("opType" in value);
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
    readonly opType: OperationType
  ) {
    super();
    // TODO - should opType own this?
    this.valid = true;
    const expToString = (exp: Expression) => {
      return isOperationType(exp) ? `(${exp.prettyPrint})` : `${exp.value}`;
    };
    this.prettyPrint = `${expToString(exp1)} ${
      opType.prettyPrint
    } ${expToString(exp2)}`;
    this.value = opType.apply(exp1.value, exp2.value);
  }
}
