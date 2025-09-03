import "cypress-file-upload";
import { Step } from "../types";

Cypress.Commands.add("createNewTrip", function () {
  cy.fixture("create-new-trip.json").then((data: Step[]) => {
    cy.visit("http://localhost:3000/login?redirect=/admin");
    data.forEach((step) => {
      switch (step.action) {
        case "click":
          return cy.get(step.selector).click().wait(20000);
        case "type":
          return cy
            .get(step.selector)
            .should("be.visible")
            .type(step.value)
            .wait(20000);
        case "press":
          return cy.get(step.selector).click().wait(20000);
        case "click and upload":
          return cy
            .get(step.selector)
            .should("exist")
            .attachFile(step.path, { force: true });
        case "pick-date-1":
          const now = new Date();
          const isoString = now.toISOString().slice(0, 16);
          return cy
            .get(step.selector)
            .invoke("val", isoString)
            .trigger("input")
            .trigger("change");
        case "pick-date-2":
          const returnTime = new Date();
          returnTime.setDate(returnTime.getDate() + 1);

          return cy
            .get(step.selector)
            .invoke("val", returnTime.toISOString().slice(0, 16))
            .trigger("input")
            .trigger("change");

        case "submit":
          return cy
            .get(step.selector)
            .scrollIntoView()
            .should("be.visible")
            .click()
            .wait(1000);
      }
    });
  });
});
