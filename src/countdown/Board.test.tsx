import { render, screen } from "@testing-library/react";
import { it, describe, expect, vi } from "vitest";

import { Board } from "./Board";
import React from "react";

// should this be a cypress test?
describe("Board", () => {
  describe("initial load", () => {
    it("should have empty target", () => {
      render(<Board />);
      expect(screen.queryByTestId("targetValue")).not.toBeInTheDocument();
    });
    it("should empty card list", () => {
      render(<Board />);
      const placeholderCards = screen.getAllByTestId("card-placeholder");
      const selectedCards = screen.queryAllByTestId("card-selected");
      expect(placeholderCards.length).toBe(6);
      expect(selectedCards.length).toBe(0);
    });
    it("should have start game disabled", () => {
      render(<Board />);
      const startGameButton = screen.getByRole("button", {
        name: "Start Game",
      });
      expect(startGameButton).toBeDisabled();
    });
    it("should have show soutions button disabled", () => {
      render(<Board />);
      const showSolutionsButton = screen.getByRole("button", {
        name: "Show Solutions",
      });
      expect(showSolutionsButton).toBeDisabled();
    });
  });

  describe("setting up the game", () => {
    it("should have one selected card and 5 placeholder cards when one card has been drag and dropped", () => {
      render(<Board />);
    });

    it("should enable start game button when 6 cards are selected", () => {
      // how to select 6 cards in a test?
    });
  });

  it("should display a target number when start game has been clicked", () => {});

  it("should display solutions when show solutions has been clicked", () => {});
});
