import { it, describe, expect } from "vitest";
import { Literal, Operation, Solver } from "./Solver";

describe("Solver", () => {
  it("sortDesc should put the numbers high to low", () => {
    const solver = new Solver(21, [1, 2, 3, 4, 5, 6]);
    expect(solver.sortedValues).toBe([6, 5, 4, 3, 2, 1]);
  });
  it.only("should be able to solve with addition with 3", () => {
    const solver = new Solver(6, [1, 2, 3]);
    // assert that the answer is 6.
    expect(solver.solve().map((e) => e.prettyPrint)).toStrictEqual([
      "(3 + 2) + 1",
      "(3 + 1) + 2",
      "(2 + 1) + 3",
    ]);
  });

  it.only("should be able to solve with addition with 4", () => {
    const solver = new Solver(10, [1, 2, 3, 4]);

    expect(solver.solve().map((e) => e.prettyPrint)).toStrictEqual([
      "((4 + 3) + 2) + 1",
      "((4 + 2) + 3) + 1",
      "((4 + 1) + 3) + 2",
      "((3 + 2) + 4) + 1",
      "((3 + 1) + 4) + 2",
      "((2 + 1) + 4) + 3",
    ]);
  });

  it.only("should be able to solve with addition with 5 elements", () => {
    const solver = new Solver(15, [1, 2, 3, 4, 5]);

    expect(solver.solve().map((e) => e.prettyPrint)).toStrictEqual([
      "(((5 + 4) + 3) + 2) + 1",
      "(((5 + 3) + 4) + 2) + 1",
      "(((5 + 2) + 4) + 3) + 1",
      "(((5 + 1) + 4) + 3) + 2",
      "(((4 + 3) + 5) + 2) + 1",
      "(((4 + 2) + 5) + 3) + 1",
      "(((4 + 1) + 5) + 3) + 2",
      "(((3 + 2) + 5) + 4) + 1",
      "(((3 + 1) + 5) + 4) + 2",
      "(((2 + 1) + 5) + 4) + 3",
    ]);
  });
  it("should only show valid solutions", () => {
    const solver = new Solver(4, [1, 2, 3]);
    expect(solver.solve()).toStrictEqual([
      new Operation(new Literal(3), new Literal(1), "+"),
    ]);
  });

  // it("should stop computing if a solution is found", () => {
  //   const solver = new Solver(10, [1, 2, 3, 4, 5, 6]);
  //   expect(solver.solve()).toBe("1 + 2 + 3 + 4");
  // });

  // it("should return undefined if no solution", () => {
  //   const solver = new Solver(22, [1, 2, 3, 4, 5, 6]);
  //   expect(solver.solve()).toBe(undefined);
  // });
});

describe("Expression", () => {
  describe("prettyPrint", () => {
    it("addition with two numbers", () => {
      expect(
        new Operation(new Literal(1), new Literal(2), "+").prettyPrint
      ).toBe("1 + 2");
    });

    it("addition with a nested expression", () => {
      expect(
        new Operation(
          new Operation(new Literal(1), new Literal(2), "+"),
          new Literal(3),
          "+"
        ).prettyPrint
      ).toBe("(1 + 2) + 3");
    });
  });

  describe("value", () => {
    it("addition with two numbers", () => {
      expect(new Operation(new Literal(1), new Literal(2), "+").value).toBe(3);
    });
    it("addition with a nested expression", () => {
      expect(
        new Operation(
          new Operation(new Literal(1), new Literal(2), "+"),
          new Literal(3),
          "+"
        ).value
      ).toBe(6);
    });
  });
});
