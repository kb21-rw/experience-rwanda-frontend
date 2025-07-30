import { Step } from "../types";
const UI_BASE_URL = Cypress.env("UI_BASE_URL");

Cypress.Commands.add("navigationLinks", function () {
  cy.fixture("navigation-links.json").then((data: Step[]) => {
    cy.visit(`${UI_BASE_URL}`);
    data.forEach((step) => {
      switch (step.action) {
        case "click":
          return cy.get(step.selector).click().wait(2000);
      }
    });
  });
});
