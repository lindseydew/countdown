import { it, describe, expect } from "vitest";
import { Solver } from "./Solver";
import { Literal, Operation } from "./models/Expression";
import { Add } from "./models/OperationType";

describe("Solver", () => {
  it("sortDesc should put the numbers high to low", () => {
    const solver = new Solver(21, [1, 2, 3, 4, 5, 6]);
    expect(solver.sortedValues).toStrictEqual([6, 5, 4, 3, 2, 1]);
  });

  describe("generateExpressionsOfSize", () => {
    it("list size 1, choose 1 element", () => {
      expect(Solver.generateExpressionsOfSize([1], 1)).toStrictEqual([
        new Literal(1),
      ]);
    });
    it("list size 2, choose 2 elements", () => {
      expect(Solver.generateExpressionsOfSize([1, 2], 2)).toStrictEqual([
        new Literal(2).add(1),
        new Literal(2).subtract(1),
        new Literal(2).multiply(1),
        new Literal(2).divide(1),
      ]);
    });

    it("list size 3, choose 3 elements", () => {
      expect(Solver.generateExpressionsOfSize([1, 2, 3], 3)).toStrictEqual([
        new Literal(3).add(2).add(1),
        new Literal(3).add(2).subtract(1),
        new Literal(3).add(2).multiply(1),
        new Literal(3).add(2).divide(1),

        new Literal(3).subtract(2).add(1),
        new Literal(3).subtract(2).subtract(1),
        new Literal(3).subtract(2).multiply(1),
        new Literal(3).subtract(2).divide(1),

        new Literal(3).multiply(2).add(1),
        new Literal(3).multiply(2).subtract(1),
        new Literal(3).multiply(2).multiply(1),
        new Literal(3).multiply(2).divide(1),

        new Literal(3).divide(2).add(1),
        new Literal(3).divide(2).subtract(1),
        new Literal(3).divide(2).multiply(1),
        new Literal(3).divide(2).divide(1),
      ]);
    });

    it("list size 3, choose 2 elements", () => {
      expect(
        Solver.generateExpressionsOfSize([1, 2, 3], 2).map((s) => s.prettyPrint)
      ).toStrictEqual(
        [
          new Literal(3).add(2),
          new Literal(3).subtract(2),
          new Literal(3).multiply(2),
          new Literal(3).divide(2),

          new Literal(3).add(1),
          new Literal(3).subtract(1),
          new Literal(3).multiply(1),
          new Literal(3).divide(1),

          new Literal(2).add(1),
          new Literal(2).subtract(1),
          new Literal(2).multiply(1),
          new Literal(2).divide(1),
        ].map((s) => s.prettyPrint)
      );
    });
  });
  it("should only show expressions where the value is the target", () => {
    const solver = new Solver(6, [1, 2, 3]);
    expect(solver.solve()).toStrictEqual([
      new Literal(3).multiply(2),
      new Literal(3).add(2).add(1),
      new Literal(3).multiply(2).multiply(1),
    ]);
  });
});

describe("Expression", () => {
  describe("prettyPrint", () => {
    it("addition with two numbers", () => {
      expect(
        new Operation(new Literal(1), new Literal(2), new Add()).prettyPrint
      ).toBe("1 + 2");
    });

    it("addition with a nested expression", () => {
      expect(
        new Operation(
          new Operation(new Literal(1), new Literal(2), new Add()),
          new Literal(3),
          new Add()
        ).prettyPrint
      ).toBe("(1 + 2) + 3");
    });
  });

  describe("value", () => {
    it("addition with two numbers", () => {
      expect(
        new Operation(new Literal(1), new Literal(2), new Add()).value
      ).toBe(3);
    });
    it("addition with a nested expression", () => {
      expect(
        new Operation(
          new Operation(new Literal(1), new Literal(2), new Add()),
          new Literal(3),
          new Add()
        ).value
      ).toBe(6);
    });
  });
});
