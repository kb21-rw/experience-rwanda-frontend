/// <reference types="cypress" />

declare namespace Cypress {
  interface Chainable {
    navigationLinks(): Chainable<void>;
    contactForm(): Chainable<void>;
    loginForm():Chainable<void>;
    adminDashboardNavigation():Chainable<void>;
  }
}
