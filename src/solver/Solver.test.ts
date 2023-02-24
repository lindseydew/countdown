import { it, describe, expect } from "vitest";
import { Solver } from "./Solver";
import { Literal, Operation } from "./models/Expression";
import { Add } from "./models/OperationType";

describe("Solver", () => {
  describe("sortDesc", () => {
    it("should put the numbers high to low", () => {
      const solver = new Solver(21, [1, 2, 3, 4, 5, 6]);
      expect(solver.sortedValues).toStrictEqual([6, 5, 4, 3, 2, 1]);
    });

    it("should handle two digit numbers", () => {
      const solver = new Solver(21, [1, 5, 3, 10, 7, 6]);
      expect(solver.sortedValues).toStrictEqual([10, 7, 6, 5, 3, 1]);
    });

    it("should handle three digit numbers", () => {
      const solver = new Solver(21, [4, 1, 5, 3, 100, 75]);
      expect(solver.sortedValues).toStrictEqual([100, 75, 5, 4, 3, 1]);
    });
  });

  describe("generateExpressionsOfSize", () => {
    it("list size 1, choose 1 element", () => {
      expect(Solver.generateExpressionsOfSize([1], 1)).toStrictEqual([
        new Literal(1),
      ]);
    });
    it("list size 2, choose 2 elements", () => {
      expect(Solver.generateExpressionsOfSize([2, 1], 2)).toStrictEqual([
        new Literal(2).add(1),
        new Literal(2).subtract(1),
        new Literal(2).multiply(1),
        new Literal(2).divide(1),
      ]);
    });

    // missing bracket
    // (4 op 3) op (2 op 1)

    // [3, 2, 1],

    // choose 2 elements

    // (3,2), (3 ,1) (2, 1)
    // 3 + 2 = 5 => (3,1)
    // 3 - 2 = 1 => (1,1)
    // 3 * 2 = 12 => (12,1)
    // 3 / 2 = 1 => (1.5,1)

    // given a list => produce the correct tuples after one step
    // (3, 2, 1) => list of remaining values
    
    // (3,2,1) =>  [3 + 2, [1], 3 - 2, [1]]
    it.only("list size 3, choose 3 elements", () => {
      expect(
        Solver.generateExpressionsOfSize([3, 2, 1], 3).map((s) => s.prettyPrint)
      ).toStrictEqual(
        [
          // 3 op 2 op 1
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

          // 3 op 1 op 2
          new Literal(3).add(1).add(2),
          new Literal(3).add(1).subtract(2),
          new Literal(3).add(1).multiply(2),
          new Literal(3).add(1).divide(2),

          new Literal(3).subtract(1).add(2),
          new Literal(3).subtract(1).subtract(2),
          new Literal(3).subtract(1).multiply(2),
          new Literal(3).subtract(1).divide(2),

          new Literal(3).multiply(1).add(2),
          new Literal(3).multiply(1).subtract(2),
          new Literal(3).multiply(1).multiply(2),
          new Literal(3).multiply(1).divide(2),

          new Literal(3).divide(1).add(2),
          new Literal(3).divide(1).subtract(2),
          new Literal(3).divide(1).multiply(2),
          new Literal(3).divide(1).divide(2),

          // allow  
        ].map((s) => s.prettyPrint)
      );

      it("list size 3, choose 2 elements", () => {
        // todo - is there a nicer way to output the strings?
        expect(
          Solver.generateExpressionsOfSize([3, 2, 1], 2).map(
            (s) => s.prettyPrint
          )
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

    describe("generateAllExpressions", () => {
      it("list size 1", () => {
        expect(Solver.generateAllExpressions([1]).length).toBe(1);
      });
      it("list size 2", () => {
        expect(Solver.generateAllExpressions([1, 2]).length).toBe(6);
      });
      it("list size 3", () => {
        // ensure they are all distinct
        expect(Solver.generateAllExpressions([1, 2, 3]).length).toBe(51);
      });
      it("list size 6", () => {
        // ensure they are all distinct
        expect(Solver.generateAllExpressions([1, 2, 3, 4, 5, 6]).length).toBe(
          3516060
        );
      });
    });
  });
  describe("solver", () => {
    it("should only show expressions where the value is the target", () => {
      const solver = new Solver(6, [3, 2, 1]);
      expect(solver.solve()).toStrictEqual([
        new Literal(3).multiply(2),
        new Literal(3).add(2).add(1),
        new Literal(3).multiply(2).multiply(1),
      ]);
    });
    it("should have solutions when target is possible", () => {
      const solver = new Solver(425, [4, 1, 5, 3, 100, 75]);
      expect(solver.solve().length).toBeGreaterThan(0);
    });
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
