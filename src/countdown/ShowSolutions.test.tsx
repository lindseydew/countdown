import React from "react";
import { render, screen } from "@testing-library/react";
import { ShowSolutions } from "./ShowSolutions";
import { Solver } from "../solver/Solver";

describe("ShowSolutions", () => {
  it("should render nothing if solver is undefined", () => {
    render(<ShowSolutions solver={undefined} />);
    expect(screen.queryByTestId("solutions-display")).toBe(null);
  });
  it("should display a message if there are no solutions", () => {
    render(<ShowSolutions solver={new Solver(954, [1, 1, 2, 2, 3, 3])} />);
    expect(screen.getByTestId("solutions-display"));
    expect(screen.getByTestId("no-solutions"));
    expect(screen.queryByTestId("solutions-list")).toBe(null);
  });
  //TODO - implement this when the solver is fixed
  it.skip("should list all the possible solutions if there is one", () => {
    render(<ShowSolutions solver={new Solver(148, [2, 7, 10, 4, 4, 1])} />);
    expect(screen.getByTestId("solutions-display"));
    expect(screen.getByTestId("solutions-list"));
    expect(screen.queryByTestId("no-solutions")).toBe(null);
  });
});
