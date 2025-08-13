import { Step } from "../types";

Cypress.Commands.add("contactForm", function () {
  cy.fixture("contact-form.json").then((data: Step[]) => {
    cy.visit("/");
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