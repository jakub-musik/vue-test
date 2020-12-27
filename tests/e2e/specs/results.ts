// https://docs.cypress.io/api/introduction/api.html

import { routing } from "@/router";

describe("Results page", () => {
  it("Displays the results on results route", () => {
    cy.visit(routing.results);

    console.log(cy.get(".results__list").children());
  });
});
