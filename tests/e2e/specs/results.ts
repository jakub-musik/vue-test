// https://docs.cypress.io/api/introduction/api.html

import { routing } from "@/router";

describe("Results page", () => {
  it("Displays the results on results route", () => {
    cy.visit(routing.results);

    cy.get(".results__list")
      .children()
      .its("length")
      .then(length => expect(length).to.be.equal(7));
  });
});
