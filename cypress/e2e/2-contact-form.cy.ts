describe('Contact Us Form', () => {
    beforeEach(() => {
      cy.wait(100);
    });
    it('should send message successfully', () => {
      cy.contactForm();
    });
  });
  