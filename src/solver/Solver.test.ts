import { it, describe, expect } from "vitest";
import { Literal, Operation, Solver } from "./Solver";

describe("Solver", () => {
  it("sortDesc should put the numbers high to low", () => {
    const solver = new Solver(21, [1, 2, 3, 4, 5, 6]);
    expect(solver.sortedValues).toBe([6, 5, 4, 3, 2, 1]);
  });
  it.only("should be able to solve with addition", () => {
    const solver = new Solver(6, [1, 2, 3]);
    console.log("&*&*");
    console.log(solver.solve());
    console.log("&*&*");
    expect(solver.solve()).toStrictEqual([
      new Operation(
        new Operation(new Literal(3), new Literal(2), "+"),
        new Literal(1),
        "+"
      ),
      new Operation(
        new Operation(new Literal(3), new Literal(1), "+"),
        new Literal(2),
        "+"
      ),
      // new Operation(
      //   new Operation(new Literal(2), new Literal(1), "+"),
      //   new Literal(2),
      //   "+"
      // ),
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
