/// <reference types="cypress" />
// Cases:

describe("Record's page operations Folder: Create, delete", () => {
  beforeEach(() => {
    cy.login();
    cy.visit("/Falcon/Records");
    cy.get("div#RecordsTable_wrapper").should("be.visible");
    cy.wait(3000);
    cy.clickCookiesCheck();
  });

  afterEach(() => {
    cy.clearCookies();
  });

  const folderName = "Cypress_Folder_" + new Date().getTime();
  const subFolderName = "Cypress_SubFolder_" + new Date().getTime();

  const TableId = "RecordsTable";
  const TableSelector = `table#${TableId}`;

  it("7.1 Should be able to create a new folder", () => {
    cy.recordCreateFolder(folderName);
  });

  it("7.2 Should be able to create a new folder in a folder (create a sub folder)", () => {
    cy.get(TableSelector)
      .contains("td", folderName)
      .should("be.visible")
      .click();
    cy.get(".breadcrumb").should("include.text", folderName);
    cy.recordCreateFolder(subFolderName);
  });
  it("Delete the new subfolder", () => {
    cy.get(TableSelector)
      .contains("td", folderName)
      .should("be.visible")
      .click();
    cy.get(".breadcrumb").should("include.text", folderName);
    cy.get(TableSelector).contains("td", subFolderName).should("be.visible");
    cy.recordDeleteFolder(subFolderName);
    cy.wait(1000);
  });

  it("7.7 Should be able to delete a folder", () => {
    cy.get(TableSelector).contains("td", folderName).should("be.visible");
    cy.recordDeleteFolder(folderName);
    cy.wait(1000);
  });
});
