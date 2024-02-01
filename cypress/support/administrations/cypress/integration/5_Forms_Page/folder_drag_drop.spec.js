/// <reference types="cypress" />
// Cases:

describe("Folder drag and drop", () => {
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

  const folderNameA = "Cypress_FolderA_" + new Date().getTime();
  const folderNameB = "Cypress_FolderB_" + new Date().getTime();
  const TableId = "FormsTable";
  const TableSelector = `table#${TableId}`;

  it("it should drap a folder into another folder", () => {
    cy.formCreateFolder(folderNameA);
    cy.wait(2000);
    cy.formCreateFolder(folderNameB);
    cy.DragAtoBinT(folderNameB, folderNameA, "table#FormsTable");
    cy.get('#FormsTable_wrapper').should('not.contain', folderNameB);
    cy.wait(1000);
    //cy.pause()
    //cy.contains("td", folderNameA)
    cy.get(TableSelector)
      .contains("td", folderNameA)
      .should("be.visible")
      .click();
    cy.wait(1000);
    cy.get(".breadcrumb").should("include.text", folderNameA);
    cy.get(TableSelector).contains("td", folderNameB).should("be.visible");
  });

  it("It should drap a subfolder to root folder", () => {
    cy.get(TableSelector)
      .contains("td", folderNameA)
      .should("be.visible")
      .click();
    cy.wait(1000);
    cy.get(".breadcrumb").should("include.text", folderNameA);
    cy.get(TableSelector)
      .contains("td", folderNameB)
      .should("be.visible")
      .dragTo(".breadcrumb > :nth-child(2)"); //to "Your Forms"
    cy.get(".breadcrumb > :nth-child(2)").click();
    cy.wait(1000);
    cy.get('#FormsTable_wrapper').should('contain', folderNameB);
    cy.get(TableSelector).contains("td", folderNameB).should("be.visible");
    cy.formDeleteFolder(folderNameA);
    cy.formDeleteFolder(folderNameB);
  });
});