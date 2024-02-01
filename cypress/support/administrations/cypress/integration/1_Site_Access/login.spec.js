/// <reference types="cypress" />

context("Access Site", () => {

  afterEach(() => {
    cy.clearCookies();
  });

  it("1.1 Should be able to acccess the site with correct username and password", () => {
    cy.login();
  });

  it("1.2 Should not be able to access the site with uncorrect Username and password", () => {
    cy.clearCookies();
    cy.visit("/");
    cy.get('.m-login__welcome').should("be.visible");
    cy.get('[name="usernameOrEmailAddress"]').type("userName");
    cy.get('[name="password"]').type("passWord");
    cy.get("#kt_login_signin_submit").click();
    cy.get(".swal-title").should("have.text", "Invalid user name or password");
  });
});
