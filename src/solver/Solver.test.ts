import { it, describe, expect } from "vitest";
import { Solver } from "./Solver";

describe("Solver", () => {
  it("should be able to solve with addition", () => {
    const solver = new Solver(21, [1, 2, 3, 4, 5, 6]);
    expect(solver.solve()).toBe("1 + 2 + 3 + 4 + 5 + 6");
  });

  it("should return undefined if no solution", () => {
    const solver = new Solver(22, [1, 2, 3, 4, 5, 6]);
    expect(solver.solve()).toBe(undefined);
  });
});
