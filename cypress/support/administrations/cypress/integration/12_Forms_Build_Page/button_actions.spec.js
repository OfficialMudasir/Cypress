/// <reference types="cypress" />

describe("Form's Build page: all the buttons and Tabs actions", () => {
    
    const formName = "Cypress_Build_" + new Date().getTime();
    //const formName = "CyTest";

    before(()=>{
      cy.login();
      cy.visit("/Falcon/Forms");
      cy.get("div#FormsTable_wrapper").should("be.visible");
      //cy.wait(3000);
      cy.createForm(formName, "Form");
      cy.clearCookies();
      cy.visit("/Account/Logout")
      cy.get('.m-login__welcome').should('contain','Build and automate legal agreements faster');
      cy.clearCookies();
  });

  beforeEach(() => {
    cy.login();
    cy.visit("/Falcon/Forms");
    cy.get("div#FormsTable_wrapper").should("be.visible");
    cy.wait(3000);
    cy.clickCookiesCheck();
  });
  
    afterEach(() => {
      cy.clearCookies();
    });

    it("12.6 Should be able to respon all clickable Tab  (Builder, preview, JSON, Logic)",()=>{
        cy.buildForm(formName);
        cy.wait(1000);
        //Builder
        cy.get(':nth-child(1) > .nav-link').click();
        cy.get("div.drag-container").should("be.visible");
        //Preview
        cy.get(':nth-child(2) > .nav-link').click();
        cy.get('#formio').should("be.visible");
        //JSON
        cy.get(':nth-child(3) > .nav-link').click();
        cy.get('#json').should("be.visible");
        // Logic
        cy.get(':nth-child(4) > #btnGroupDrop1').click();

        //cy.get('#builder-sfatextfield').dragTo("div.drag-container");
    });

    it("12.7 Should be able to open each modal (Embed, Share, Submission settings, Form settings, Create New Version )",()=>{
        cy.buildForm(formName);
        cy.wait(1000);

        // Form -> Embed
        cy.get(':nth-child(2) > #btnGroupDrop1').click();
        cy.get('#btn-embed').click();
        cy.wait(1000);
        cy.get('.modal-title > span').should("contain.text","Generate Form Embed Code");
        cy.wait(1000);
        cy.get('.modal-footer > .btn').click();
        
        // Form -> Share
        cy.get(':nth-child(2) > #btnGroupDrop1').click();
        cy.get('#btn-share').click();
        cy.wait(1000);
        cy.get('.pt-2').should("contain.text",formName);
        cy.wait(1000);
        cy.get('.modal-footer > .btn').click();

        // Settings -> Submission Settings
        cy.get('#btnGroupDrop2').click();
        cy.get('#btn-submission-settings').click();
        cy.wait(1000);
        cy.get('.modal-title > span').should("contain.text","New Job");
        cy.wait(1000);
        cy.get('.modal-footer > .btn').click();

        // Settings -> Form Settings
        cy.get('#btnGroupDrop2').click();
        cy.get('#btn-form-settings').click();
        cy.wait(1000);
        cy.get('#general_setting').should("be.visible");
        cy.wait(1000);
        cy.get('.modal-footer > .btn-secondary').click();

        //Version
        cy.get(':nth-child(5) > #btnGroupDrop1').click();
        cy.get('#btn-new-version').click();
        cy.wait(1000);
        cy.get('#FormVersionName').should("be.visible");
        cy.wait(1000);
        cy.get('.modal-footer > .btn-secondary').click();
    });



    it("12.1 Should be able to open a Form by click 'Save&Open' button", () => {
      cy.buildForm(formName);
      cy.wait(1000);
      cy.preventNewWindowOpen();
      cy.get("button.btn.btn-primary.btn-save-open").click()
      cy.get("@popup").should("be.called");
      cy.url().should('include', '/Falcon/forms/load?OriginalId');
      cy.go('back');
    });

});