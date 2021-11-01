describe('login and get TODOs', () => {

  it('should behave...', () => {

    cy.intercept('POST', 'auth/login').as('login');
    cy.intercept('GET', 'todos').as('getAllTodos');

    cy.visit('/');
    cy.get('#username').type('user1');
    cy.get('#password').type('12345');
    cy.get('.primary.button').click();

    cy.wait('@login').then((interception) => {
      console.log(interception);
      assert.isNotNull(interception.response?.body);
    });

    cy.visit('/');
    cy.url().should('include', '/todo-list');
    cy.wait('@getAllTodos').then( interception => {
      console.log(interception);
      assert.isNotNull(interception.response?.body);
      assert.isTrue(interception.response?.body.todos.length === 6);
    });

  });
})
