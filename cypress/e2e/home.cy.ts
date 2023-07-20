/// <reference types="Cypress" />

describe("Main", () => {
  it("should display the app title", () => {
    cy.visit("/");
    cy.contains("Volebna kalkulacka");
  });
});
