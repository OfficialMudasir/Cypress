/// <reference types="cypress" />

context("Create a new from, then delete the form.", () => {
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

  const formName = "Cypress_Form_" + new Date().getTime();
  const wizardName = "Cypress_Wizard_" + new Date().getTime();

  // const formName = "Cypress_Form";
  // const wizardName = "Cypress_Wizard";

  const TableId = "FormsTable";
  const TableSelector = `table#${TableId}`;

  it("5.3 Should be able to create a Form in Forms page(root folder)", () => {
    cy.createForm(formName, "Form");
    cy.wait(1000);
    cy.get(TableSelector).contains("td", formName).should("be.visible").click();
    cy.get("#Form-select").should("have.text", "Form");
    cy.wait(1000);
  });

  it("5.3 Should be able to create a Wizard in Forms page(root folder)", () => {
    cy.createForm(wizardName, "Wizard");
    cy.wait(1000);
    cy.get(TableSelector)
      .contains("td", wizardName)
      .should("be.visible")
      .click();
    cy.get("#Form-select").should("have.text", "Wizard");
    cy.wait(1000);
  });

  it("5.11 Should be able to delete a Form", () => {
    cy.deleteForm(formName);
  });

  it("5.11 Should be able to delete a Wizard", () => {
    cy.deleteForm(wizardName);
  });

  it("5.4 Should be able to create a form/Wizard in a folder(sub folder)", () => {
    const folderName = "Cypress_Folder_" + new Date().getTime();
    cy.formCreateFolder(folderName);
    cy.wait(1000);
    cy.get(TableSelector)
      .contains("td", folderName)
      .should("be.visible")
      .click();
    cy.get(".breadcrumb").should("include.text", folderName);
    cy.createForm(formName, "Form");
    cy.wait(1000);
    cy.get(TableSelector).contains("td", formName).should("be.visible");
    cy.deleteForm(formName);
    cy.get(".breadcrumb > :nth-child(2)").click();
    cy.wait(1000);
    cy.formDeleteFolder(folderName);
  });

  it("5.7 Should be able to edit a form", () => {
    const editedFormName = "Edited_Cypress_Form";
    cy.createForm(formName, "Form");
    cy.wait(1000);
    cy.get(TableSelector).contains("td", formName).should("be.visible").click();
    cy.get(".modal-title > span").should("have.text", "Edit form");
    cy.get("#Form_Name").clear().type(editedFormName);
    cy.get(".modal-footer > .btn-primary").click();
    cy.wait(1000);
    cy.get(TableSelector).contains("td", editedFormName).should("be.visible");
    cy.deleteForm(editedFormName);
  });
});
