describe('Create New trip', () => {
    beforeEach(() => {
      cy.wait(100);
    });
    it('should create and submit new trip successfully ', () => {
      cy.createNewTrip();
    });
  });
    