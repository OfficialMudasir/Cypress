/// <reference types="cypress" />

context("Create a project template, then delete project template.", () => {
    // beforeEach(() => {
    //   cy.login();
    //   cy.visit("/Falcon/Projects");
    //   cy.get("div#ProjectsTable_wrapper").should("be.visible");
    //   cy.wait(3000);
    //   cy.clickCookiesCheck();
    // });
  
    // afterEach(() => {
    //   cy.clearCookies();
    // });
  
    const prjName = "Cypress_prj_" + new Date().getTime();
    const TableId = "ProjectsTable";
    const TableSelector = `table#${TableId}`;
    
    // it("15.1 Should be able to start new projects", () => {
    //   cy.createproj(prjName);
     
    // });

    // it("15.2 Should be able to search projects", () => {
    //   cy.searchProj(prjName);
    // });

    // it("15.3 Should be able to view projects", () => {
    //   cy.viewProj(prjName);
    // });


    // it("14.2 Should be able to search project template",()=>{
    //   cy.get('#ProjectTemplatesTableFilter').should('be.visible');
    //   cy.get('#ProjectTemplatesTableFilter').type(ptName);
    //   cy.get('#GetProjectsButton').click();
    //   cy.wait(5000);

    //   cy.get('tbody > :nth-child(1) > :nth-child(2)').should('contain',ptName);
    // });
   
    // it("14.3 Should be able to view project template",()=>{
    //   cy.get(TableSelector).contains("td", ptName).should("be.visible");
    //   cy.ptView(ptName);
      
    // });

    
    // it("14.5 Should be able to share project template",()=>{
    //   cy.get(TableSelector).contains("td", ptName).should("be.visible");
    //   cy.ptView(ptName);
      
    // });

    // it("14.6 Should be able to delete project template",()=>{
    //   cy.get(TableSelector).contains("td", ptName).should("be.visible");
    //   cy.ptDelete(ptName);
    //   cy.wait(1000);
      
    // });
    


  });
  