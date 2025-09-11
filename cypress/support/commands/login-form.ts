import { Step } from "../types";

Cypress.Commands.add("loginForm", function () {
  cy.fixture("login-form.json").then((data: Step[]) => {
    cy.visit("/login?redirect=/admin");
    data.forEach((step) => {
        switch (step.action) {
          case "type":
            return cy.get(step.selector).should('be.visible').type(step.value);
          case "click":
            return cy.get(step.selector).click().wait(2000);
        }
      });
  });
});