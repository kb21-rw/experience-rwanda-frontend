/// <reference types="cypress" />

declare namespace Cypress {
    interface Chainable {
      navigationLinks(): Chainable<void>;
<<<<<<< Updated upstream
=======
      contactForm(): Chainable<void>;
      loginForm():Chainable<void>;
>>>>>>> Stashed changes
    }
  }
  