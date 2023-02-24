import { it, describe, expect, vi } from "vitest";
import { act, render, screen } from "@testing-library/react";
import { FetchMockAsyncLoader } from "./FetchMockAsyncLoader";
// todo - shouldn't actually need to import react here.
import React from "react";

describe("FetchMockExampleAsyncLoader", () => {
  const mockApiResponse = (
    { status, json }: { status: number; json?: Object } = {
      status: 200,
      json: { fact: "A very interesting fact" },
    }
  ) => {
    globalThis.fetch = vi.fn(() => {
      return Promise.resolve({
        status: status,
        json: async () => json,
      } as Response);
    });
  };

  it("When the api returns a 200 it will display the cat facts", async () => {
    mockApiResponse();
    await act(async () => render(<FetchMockAsyncLoader />));
    expect(screen.getByText("Cat Facts!"));
    expect(screen.getByText("A very interesting fact"));
  });

  it("When the api errors, see an error page", async () => {
    mockApiResponse({ status: 500 });
    await act(async () => render(<FetchMockAsyncLoader />));
    expect(screen.getByText("oops! something went wrong"));
  });

  it("When the api returns a 200, but data in the wrong structure see an error page", async () => {
    mockApiResponse({ status: 200, json: { foo: "bar" } });
    await act(async () => render(<FetchMockAsyncLoader />));
    expect(screen.getByText("oops! something went wrong"));
  });
  it("When the api has not returned, it should show a loading element", () => {
    render(<FetchMockAsyncLoader />);
    expect(screen.getByText("Loading Cat facts"));
  });
});
