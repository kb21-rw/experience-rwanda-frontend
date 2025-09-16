describe('Login admin', () => {
    beforeEach(() => {
      cy.wait(100);
    });
    it('should login admin successful ', () => {
      cy.loginForm().wait(20000);
    });
  });
  