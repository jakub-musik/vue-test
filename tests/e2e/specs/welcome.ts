// https://docs.cypress.io/api/introduction/api.html

import { routing } from "@/router";

describe("Welcome page", () => {
  it("Displays the welcome message on root route", () => {
    cy.visit(routing.home);

    cy.get(".welcome").contains(
      "h1",
      "Single place for all your lottery needs"
    );
  });
});
