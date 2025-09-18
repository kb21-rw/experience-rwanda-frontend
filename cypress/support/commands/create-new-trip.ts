import "cypress-file-upload";
import { Step } from "../types";

Cypress.Commands.add("createNewTrip", function () {
  cy.fixture("create-new-trip.json").then((data: Step[]) => {
    cy.visit("http://localhost:3000/login?redirect=/admin");

    data.forEach((step) => {
      switch (step.action) {
        case "click":
          cy.get(step.selector).click().wait(10000);
          break;

        case "type":
          cy.get(step.selector).should("be.visible").clear().type(step.value);
          break;

        case "press":
          cy.get(step.selector).click().wait(10000);
          break;

        case "click and upload":
          cy.get(step.selector)
            .should("exist")
            .attachFile(step.path, { force: true });
          break;

          case "pick-date-1":
            const departureDate = new Date();
            departureDate.setDate(departureDate.getDate() + 1); 
            const depISO = departureDate.toISOString().slice(0, 16);
            cy.get(step.selector)
              .should("be.visible")
              .clear() 
              .type(depISO) 
              .trigger("change"); 
            break;
          
          case "pick-date-2":
            const returnDate = new Date();
            returnDate.setDate(returnDate.getDate() + 3); 
            const retISO = returnDate.toISOString().slice(0, 16);
            cy.get(step.selector)
              .should("be.visible")
              .clear()
              .type(retISO)
              .trigger("change");
            break;

        case "submit":
          cy.get(step.selector).within(() => {
            cy.get("button")
              .contains("Create New Trip")
              .scrollIntoView()
              .should("be.visible")
              .click({ force: true })
              .wait(10000);
          });
          cy.url({ timeout: 10000 }).should("include", "/admin/trips");
          cy.contains("Trip was created successfully", { timeout: 10000 }).should(
            "be.visible"
          );
          break;
      }
    });
  });
});
