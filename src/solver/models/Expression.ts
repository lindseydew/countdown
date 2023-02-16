export abstract class Expression {
  abstract prettyPrint: string;
  abstract value: number;
  abstract valid: boolean;

  add(n: number): Operation {
    return new Operation(this, new Literal(n), "+");
  }
}
// make a class, maybe abstract -> figure out
export function isOperationType(value: Expression): value is Operation {
  return "operation" in value;
}

export function isLiteralType(value: Expression): value is Literal {
  return !("operation" in value);
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
  operation: string;
  constructor(
    readonly exp1: Expression,
    readonly exp2: Expression,
    // TODO to make an enum / union type of these
    operation: string
  ) {
    super();
    this.value = exp1.value + exp2.value;
    this.valid = true;
    const expToString = (exp: Expression) => {
      return isOperationType(exp) ? `(${exp.prettyPrint})` : `${exp.value}`;
    };
    this.prettyPrint = `${expToString(exp1)} + ${expToString(exp2)}`;
    this.operation = operation;
  }
}
