import { Step } from "../types";

Cypress.Commands.add("adminDashboardNavigation", function () {
  cy.fixture("admin-dashboard-navigation.json").then((data: Step[]) => {
    cy.visit("http://localhost:3000/login?redirect=/admin");
    data.forEach((step) => {
      switch (step.action) {
        case "type":
          return cy.get(step.selector).should('be.visible').type(step.value).wait(20000);
        case "press":
          return cy.get(step.selector).click().wait(20000);
        case "click":
          return cy.get(step.selector).click().wait(20000);
      }
    });
  });
});
