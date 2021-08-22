// note_app.spec.js created with Cypress
//
// Start writing your Cypress tests below!
// If you're unfamiliar with how Cypress works,
// check out the link below and learn how to write your first test:
// https://on.cypress.io/writing-first-test
describe('Note app', function () {
	beforeEach(function () {
		cy.visit('http://localhost:3000');
	});

	it('front page can be opened', function () {
		cy.contains('Notes');
		cy.contains(
			'Note app, Department of Computer Science, University of Helsinki 2021'
		);
	});

	it('login form can be opened', function () {
		cy.contains('log in').click();
	});

	it('user can login', function () {
		cy.contains('log in').click();
		cy.get('#username').type('OrangeKitty');
		cy.get('#password').type('terrorism');
		cy.get('#login-button').click();

		cy.contains('Orange Kitty logged in');
	});
});
