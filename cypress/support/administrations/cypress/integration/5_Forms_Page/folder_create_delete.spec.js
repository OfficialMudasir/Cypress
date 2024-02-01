/// <reference types="cypress" />

/*
// Cases: 
5.1 Should be able to create a new folder
5.2 Should be able to create a new folder in a folder (create a sub folder)

*/
context("Folder operations: Create, delete", () => {
  beforeEach(() => {
    cy.login();
    cy.visit("/Falcon/Forms",{timeout: 10000});
    cy.get("div#FormsTable_wrapper",{timeout: 10000}).should("be.visible");
    cy.wait(3000);
    cy.clickCookiesCheck();
  });

  afterEach(() => {
    cy.clearCookies();
  });

  const folderName = "Cypress_Folder_" + new Date().getTime();
  const subFolderName = "Cypress_SubFolder_" + new Date().getTime();

  it("5.1 Should be able to create a new folder", () => {
    cy.formCreateFolder(folderName);
  });

  it("5.2 Should be able to create a new folder in a folder (create a sub folder)", () => {
    cy.get("table#FormsTable")
      .contains("td", folderName)
      .should("be.visible")
      .click();
    cy.wait(1000);
    cy.get(".breadcrumb").should("include.text", folderName);
    cy.formCreateFolder(subFolderName);
  });

  it("Delete the new subfolder", () => {
    cy.get("table#FormsTable")
      .contains("td", folderName)
      .should("be.visible")
      .click();
    cy.wait(1000);
    cy.get(".breadcrumb").should("include.text", folderName);
    cy.get("table#FormsTable")
      .contains("td", subFolderName)
      .should("be.visible");
    cy.formDeleteFolder(subFolderName);
    cy.wait(1000);
  });

  it("5.10 Should be able to delete a folder", () => {
    cy.get("table#FormsTable").contains("td", folderName).should("be.visible");
    cy.formDeleteFolder(folderName);
    cy.wait(1000);
  });
});
