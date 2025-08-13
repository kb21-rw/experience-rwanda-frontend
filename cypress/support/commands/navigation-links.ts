import { Step } from "../types";

Cypress.Commands.add("navigationLinks", function () {
  cy.fixture("navigation-links.json").then((data: Step[]) => {
    cy.visit("/");
    data.forEach((step) => {
      switch (step.action) {
        case "click":
          return cy.get(step.selector).click().wait(2000);
      }
    });
  });
});
