export interface Operation {
  prettyPrint: string;
  apply: (n1: number, n2: number) => number;
}
export const multiply: Operation = {
  prettyPrint: "*",
  apply: (n1, n2) => n1 * n2,
};
export const divide: Operation = {
  prettyPrint: "/",
  apply: (n1, n2) => n1 / n2,
};
export const subtract: Operation = {
  prettyPrint: "-",
  apply: (n1, n2) => n1 - n2,
};
export const add: Operation = {
  prettyPrint: "+",
  apply: (n1, n2) => n1 + n2,
};
