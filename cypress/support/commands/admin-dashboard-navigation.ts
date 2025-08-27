import { Step } from "../types";

Cypress.Commands.add("adminDashboardNavigation", function () {
  cy.fixture("admin-dashboard-navigation.json").then((data: Step[]) => {
    cy.visit("/login?redirect=/admin");
    data.forEach((step) => {
      switch (step.action) {
        case "press":
          return cy.get(step.selector).click().wait(2000);
        case "click":
          return cy.get(step.selector).click().wait(2000);
      }
    });
  });
});
