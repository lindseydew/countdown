import { it, describe, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { FetchMockExample } from "./FetchMockExample";
// todo - shouldn't actually need to import react here.
import React from "react";

describe("FetchMockExample", () => {
  it("can render a component", () => {
    render(<FetchMockExample />);
    expect(screen.getByRole("paragraph")).toHaveTextContent("helloworld!");
  });
});
