describe('CRA', () => {
  it('shows learn link', function () {
    cy.visit('http://localhost:3000')
    cy.url().should('include','/login')
  })
})