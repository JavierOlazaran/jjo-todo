describe('login and get TODOs', () => {
  cy.intercept('GET', 'auth/login', 'fixture:todosList');


  cy.visit('/');

  cy.get('#username')
})
