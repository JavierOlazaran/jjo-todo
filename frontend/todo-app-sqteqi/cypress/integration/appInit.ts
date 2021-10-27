describe('App init', () => {

  it('Load the login page on app start', () => {
    cy.visit('/');
    cy.url().should('include', '/login');

    // validates the header existence
    cy.contains('T O D O');
    cy.get('.theme__toggle__btn').should('exist');

    // Validates the input fields
    cy.get('#username').should('exist').should('have.attr', 'placeholder', 'User name');
    cy.get('#password').should('exist').should('have.attr', 'placeholder', 'Password');

    // Validates the action buttons.
    cy.get('.primary.button').should('exist').should('contain.text', 'Login');
    cy.get('.secondary.button').should('exist').should('contain.text', 'Register');
  });

  it('should show confirm password field and switch action buttons', () => {
    cy.get('.secondary.button').click();

    cy.get('#confirmPassword').should('exist').should('have.attr', 'placeholder', 'Repeat Password');

    cy.get('.primary.button').should('exist').should('contain.text', 'Register');
    cy.get('.secondary.button').should('exist').should('contain.text', 'Login');

    cy.get('.secondary.button').click();

    cy.get('#confirmPassword').should('not.exist');

    cy.get('.primary.button').should('exist').should('contain.text', 'Login');
    cy.get('.secondary.button').should('exist').should('contain.text', 'Register');
  });

  it('should display required field error for every input', () => {
    // Test for username field.
    cy.get('#username').focus();
    cy.get('#username').blur();

    cy.get('#username').should('have.class', 'invalid__input');
    cy.get('#username').siblings('p').should('exist').should('have.text', 'Required field');

    cy.get('#username').type('a');
    cy.get('#username').should('not.have.class', 'invalid__input');
    cy.get('#username').siblings('p').should('not.exist');

    cy.get('#username').clear();
    cy.get('#username').should('have.class', 'invalid__input');
    cy.get('#username').siblings('p').should('exist').should('have.text', 'Required field');

    // Test for password field.
    cy.get('#password').focus();
    cy.get('#password').blur();

    cy.get('#password').should('have.class', 'invalid__input');
    cy.get('#password').siblings('p').should('exist').should('have.text', 'Required field');

    cy.get('#password').type('a');
    cy.get('#password').should('not.have.class', 'invalid__input');
    cy.get('#password').siblings('p').should('not.exist');

    cy.get('#password').clear();
    cy.get('#password').should('have.class', 'invalid__input');
    cy.get('#password').siblings('p').should('exist').should('have.text', 'Required field');

    // Test for confirm password field.
    cy.get('.secondary.button').click();

    cy.get('#confirmPassword').focus();
    cy.get('#confirmPassword').blur();

    cy.get('#confirmPassword').should('have.class', 'invalid__input');
    cy.get('#confirmPassword').siblings('p').should('exist').should('have.text', 'Required field');

    cy.get('#confirmPassword').type('a');
    cy.get('#confirmPassword').siblings('p').should('not.exist');

    cy.get('#confirmPassword').clear();
    cy.get('#confirmPassword').should('have.class', 'invalid__input');
    cy.get('#confirmPassword').siblings('p').should('exist').should('have.text', 'Required field');
  });

  it('should display password not matching msg', () => {
    cy.get('#password').type('a');
    cy.get('#password').siblings('p').should('not.exist');

    cy.get('.wrong__credentials__msg').should('exist');

    cy.get('#confirmPassword').type('a');

    cy.get('#confirmPassword').should('not.have.class', 'invalid__input');
    cy.get('#password').should('not.have.class', 'invalid__input');

    cy.get('#confirmPassword').siblings('p').should('not.exist');
    cy.get('#password').siblings('p').should('not.exist');
  });
})
