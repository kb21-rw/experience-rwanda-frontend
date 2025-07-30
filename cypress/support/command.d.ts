/// <reference types="cypress" />

declare namespace Cypress {
    interface Chainable {
      navigationLinks(): Chainable<void>;
    }
  }
  