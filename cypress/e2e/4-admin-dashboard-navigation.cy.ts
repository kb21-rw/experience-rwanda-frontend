describe('Admin Dashboard Navigation tests', () => {
    beforeEach(() => {
      cy.wait(100);
    });
    it('should navigate through the Admin Dashboard sidebar links and display the correct sections', () => {
      cy.adminDashboardNavigation();
    });
  });
  