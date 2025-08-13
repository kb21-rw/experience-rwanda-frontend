describe('Navigation links', () => {
    beforeEach(() => {
      cy.wait(100);
    });
    it('navigate to the pages', () => {
      cy.navigationLinks();
    });
  });
  