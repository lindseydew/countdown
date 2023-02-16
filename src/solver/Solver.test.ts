import { it, describe, expect } from "vitest";
import { Solver } from "./Solver";
import { Literal, Operation } from "./models/Expression";

describe("Solver", () => {
  it("sortDesc should put the numbers high to low", () => {
    const solver = new Solver(21, [1, 2, 3, 4, 5, 6]);
    expect(solver.sortedValues).toStrictEqual([6, 5, 4, 3, 2, 1]);
  });
  it("should be able to solve with addition with 3", () => {
    const solver = new Solver(6, [1, 2, 3]);
    expect(solver.solve()).toStrictEqual([
      new Literal(3).add(2).add(1),
      new Literal(3).add(1).add(2),
      new Literal(2).add(1).add(3),
    ]);
  });

  it("should be able to solve with addition with 4", () => {
    const solver = new Solver(10, [1, 2, 3, 4]);

    expect(solver.solve()).toStrictEqual([
      new Literal(4).add(3).add(2).add(1),
      new Literal(4).add(2).add(3).add(1),
      new Literal(4).add(1).add(3).add(2),
      new Literal(3).add(2).add(4).add(1),
      new Literal(3).add(1).add(4).add(2),
      new Literal(2).add(1).add(4).add(3),
    ]);
  });

  it("should be able to solve with addition with 5 elements", () => {
    const solver = new Solver(15, [1, 2, 3, 4, 5]);

    expect(solver.solve()).toStrictEqual([
      new Literal(5).add(4).add(3).add(2).add(1),
      new Literal(5).add(3).add(4).add(2).add(1),
      new Literal(5).add(2).add(4).add(3).add(1),
      new Literal(5).add(1).add(4).add(3).add(2),
      new Literal(4).add(3).add(5).add(2).add(1),
      new Literal(4).add(2).add(5).add(3).add(1),
      new Literal(4).add(1).add(5).add(3).add(2),
      new Literal(3).add(2).add(5).add(4).add(1),
      new Literal(3).add(1).add(5).add(4).add(2),
      new Literal(2).add(1).add(5).add(4).add(3),
    ]);
  });
  it("should only show valid solutions", () => {
    const solver = new Solver(4, [1, 2, 3]);
    expect(solver.solve()).toStrictEqual([new Literal(3).add(1)]);
  });
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
