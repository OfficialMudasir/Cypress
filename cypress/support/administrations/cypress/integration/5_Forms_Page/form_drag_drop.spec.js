/// <reference types="cypress" />
// Cases:

describe("Form drag and drop", () => {
  beforeEach(() => {
    cy.login();
    cy.visit("/Falcon/Forms");
    cy.get("div#FormsTable_wrapper").should("be.visible");
    cy.wait(3000);
    cy.clickCookiesCheck();
  });

  const formName = "Cypress_Form_" + new Date().getTime();
  const folderName = "Cypress_Folder_" + new Date().getTime();

  const TableId = "FormsTable";
  const TableSelector = `table#${TableId}`;

  it("5.5 Should be able to drag a form to a folder", () => {
    cy.createForm(formName, "Form");
    //in the real word after search teh datatable won't refresh after search and create new folder
    cy.get("#RefreshFormsButton").click();
    cy.formCreateFolder(folderName);
    cy.wait(1000);
    cy.DragAtoBinT(formName, folderName, TableSelector);
    cy.wait(1000);
    cy.get(TableSelector)
      .contains("td", folderName)
      .should("be.visible")
      .click();
    cy.get(".breadcrumb").should("include.text", folderName);
    cy.get(TableSelector).contains("td", formName).should("be.visible");
  });

  it("5.6 Should be able to drag a form from sub folder to root folder", () => {
    cy.get(TableSelector)
      .contains("td", folderName)
      .should("be.visible")
      .click();
    cy.get(".breadcrumb").should("include.text", folderName);
    cy.get(TableSelector)
      .contains("td", formName)
      .should("be.visible")
      .dragTo(".breadcrumb > :nth-child(2)"); //to "Your Forms"
    cy.get(".breadcrumb > :nth-child(2)").click();
    cy.wait(1000);
    cy.contains("td", folderName).should("be.visible");
    cy.contains("td", formName).should("be.visible");
    cy.deleteForm(formName);
    cy.formDeleteFolder(folderName);
  });
});
