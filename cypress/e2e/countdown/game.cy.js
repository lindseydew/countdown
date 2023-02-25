/* eslint-disable no-undef */
describe("countdown game", () => {
  beforeEach(() => {
    cy.visit("/");
  });
  const selectACard = (index, pile) => {
    const dataTransfer = new DataTransfer();
    cy.get(`[data-cy="card-pile-${pile}-${index}"]`).trigger("dragstart", {
      dataTransfer,
      force: true,
    });
    // feels a bit weird that my id is changing - revisit
    cy.get(`[data-cy="card-placeholder-0"]`).trigger("drop", {
      dataTransfer,
    });
  };

  const makeCardSelection = () => {
    Array(6)
      .fill(0)
      .forEach((_, i) => {
        selectACard(i, "little");
      });
  };

  const playGame = () => {
    cy.get('[data-cy="start-game"]').click();
  };
  describe("initial load of the game", () => {
    it("should have an empty target box", () => {
      cy.get('[data-cy="targetValue"]').should("not.exist");
    });
    it("should have an empty list of cards to be selected, and 6 placeholder cards", () => {
      cy.get('[data-cy^="card-placeholder-"]').should("have.length", 6);
      cy.get('[data-cy^="card-selected-"]').should("not.exist");
    });
    it("should have start game button disabled", () => {
      cy.get('[data-cy="start-game"]').should("be.disabled");
    });
    it("should have show solutions button disabled", () => {
      cy.get('[data-cy="show-solutions"]').should("be.disabled");
    });
  });
  describe("Setting up the game", () => {
    describe("selecting a card", () => {
      it("should add a card to the selected pile and reduce a placeholder card", () => {
        selectACard(0, "little");
        cy.get('[data-cy^="card-placeholder-"]').should("have.length", 5);
        cy.get('[data-cy^="card-selected-"]').should("have.length", 1);
      });
    });

    describe("selecting all the cards", () => {
      it("should have 6 cards selected and no placeholder cards", () => {
        makeCardSelection();
        cy.get('[data-cy^="card-placeholder-"]').should("have.length", 0);
        cy.get('[data-cy^="card-selected-"]').should("have.length", 6);
      });
      it("should enable the start game button", () => {
        makeCardSelection();
        cy.get('[data-cy="start-game"]').should("be.enabled");
      });
      it("should leave the show solutions button unchanged", () => {
        makeCardSelection();
        cy.get('[data-cy="show-solutions"]').should("be.disabled");
      });
    });
  });
  describe("Playing the game", () => {
    beforeEach(() => {
      makeCardSelection();
    });
    describe("Clicking start game", () => {
      it("should show target when start game is clicked", () => {
        playGame();
        cy.get('[data-cy="targetValue"]').should("exist");
      });
      it("should enable the show solutions buttone when start", () => {
        playGame();
        cy.get('[data-cy="show-solutions"]').should("be.enabled");
        cy.get('[data-cy="start-game"]').should("be.disabled");
      });
    });
  });
  describe("Finishing the game", () => {
    beforeEach(() => {
      makeCardSelection();
      playGame();
    });
    describe("Clicking show solutions", () => {
      it("should show the solutions", () => {});
    });
  });
});
