describe('template spec', () => {
  it('passes', () => {
    cy.visit('https://noto-cient.onrender.com/SubscriptionPlan')
    cy.get("button.subscribe").click(); 
    cy.url().should("include", "checkout.stripe.com")
  })
})