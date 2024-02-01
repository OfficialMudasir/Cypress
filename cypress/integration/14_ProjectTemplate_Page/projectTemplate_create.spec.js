/// <reference types="cypress" />

context("Create a project template, then delete project template.", () => {
  beforeEach(() => {
    cy.login();
    cy.visit("/Falcon/ProjectTemplates");
    cy.get("div#ProjectTemplatesTable_wrapper").should("be.visible");
    cy.wait(3000);
    cy.clickCookiesCheck();
  });

  afterEach(() => {
    cy.clearCookies();
  });

  const ptName = "Cypress_pt_" + new Date().getTime();
  const TableId = "ProjectTemplatesTable";
  const TableSelector = `table#${TableId}`;

  it.only("14.1 Should be able to create project template", () => {
    // cy.createForm(formName, "Form");
    cy.createPT(ptName);

    cy.wait(3000);
    cy.get(TableSelector).should("contain", ptName);
  });

  it("14.2 Should be able to search project template", () => {
    cy.get("#ProjectTemplatesTableFilter").should("be.visible");
    cy.get("#ProjectTemplatesTableFilter").type(ptName);
    cy.get("#GetProjectsButton").click();
    cy.wait(5000);

    cy.get("tbody > :nth-child(1) > :nth-child(2)").should("contain", ptName);
  });

  it("14.3 Should be able to view project template", () => {
    cy.get(TableSelector).contains("td", ptName).should("be.visible");
    cy.ptView(ptName);
  });

  // it("14.5 Should be able to share project template",()=>{
  //   cy.get(TableSelector).contains("td", ptName).should("be.visible");
  //   cy.ptView(ptName);

  // });

  it("14.6 Should be able to delete project template", () => {
    cy.get(TableSelector).contains("td", ptName).should("be.visible");
    cy.ptDelete(ptName);
    cy.wait(1000);
  });
});
