import { getGreeting } from '../support/app.po';

describe('community', () => {
  beforeEach(() => cy.visit('/'));

  it('should display welcome message', () => {
    getGreeting().contains('Welcome to community!');
  });
});
