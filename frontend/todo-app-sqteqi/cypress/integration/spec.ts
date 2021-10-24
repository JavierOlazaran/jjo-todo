describe('My First Test', () => {
  it('Visits the initial project page', () => {
    cy.visit('/');
    cy.contains('T O D O');
    cy.url().should('include', '/login');
    cy.get('.theme__toggle__btn').should('exist');
  })
})
