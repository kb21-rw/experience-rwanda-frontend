import { Step } from "../types";

Cypress.Commands.add("adminDashboardNavigation", function () {
  cy.fixture("admin-dashboard-navigation.json").then((data: Step[]) => {
    data.forEach((step) => {
      switch (step.action) {
        case "click":
          return cy.get(step.selector).click().wait(2000);
      }
    });
  });
});
