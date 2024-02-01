/// <reference types="cypress" />
// Cases:

describe("Document Templates' page operations Folder: Create, delete", () => {
  beforeEach(() => {
    cy.login();
    cy.visit("/Falcon/Templates");
    cy.get("div#TemplatesTable_wrapper").should("be.visible");
    cy.wait(3000);
    cy.clickCookiesCheck();
  });

  afterEach(() => {
    cy.clearCookies();
  });

  const folderName = "Cypress_Folder_" + new Date().getTime();
  const subFolderName = "Cypress_SubFolder_" + new Date().getTime();

  const TableId = "TemplatesTable";
  const TableSelector = `table#${TableId}`;

  it("8.1 Should be able to create a new folder", () => {
    cy.docTemplateCreateFolder(folderName);
  });

  it("8.2 Should be able to create a new folder in a folder (create a sub folder)", () => {
    cy.get(TableSelector)
      .contains("td", folderName)
      .should("be.visible")
      .click();
    cy.get(".breadcrumb").should("include.text", folderName);
    cy.docTemplateCreateFolder(subFolderName);
  });
  it("Delete the new subfolder", () => {
    cy.get(TableSelector)
      .contains("td", folderName)
      .should("be.visible")
      .click();
    cy.get(".breadcrumb").should("include.text", folderName);
    cy.get(TableSelector).contains("td", subFolderName).should("be.visible");
    cy.docTemplateDeleteFolder(subFolderName);
    cy.wait(1000);
  });

  it("8.8 Should be able to delete a folder", () => {
    cy.get(TableSelector).contains("td", folderName).should("be.visible");
    cy.docTemplateDeleteFolder(folderName);
    cy.wait(1000);
  });
});
