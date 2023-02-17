export abstract class OperationType {
  abstract apply(n1: number, n2: number): number;
  abstract prettyPrint: string;
}

export class Add extends OperationType {
  prettyPrint: string = "+";
  constructor() {
    super();
  }
  apply(n1: number, n2: number) {
    return n1 + n2;
  }
}

export class Subtract extends OperationType {
  prettyPrint: string = "-";
  constructor() {
    super();
  }
  apply(n1: number, n2: number) {
    return n1 - n2;
  }
}

export class Multiply extends OperationType {
  prettyPrint: string = "*";
  constructor() {
    super();
  }
  apply(n1: number, n2: number) {
    return n1 * n2;
  }
}

export class Divide extends OperationType {
  prettyPrint: string = "%";
  constructor() {
    super();
  }
  apply(n1: number, n2: number) {
    return n1 % n2;
  }
}
