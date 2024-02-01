/// <reference types="cypress" />
// Cases:
import 'cypress-file-upload';

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
  
    const TemplateName = "Cypress_Templates_" + new Date().getTime();
    
  
    const TableId = "TemplatesTable";
    const TableSelector = `table#${TableId}`;
  
    // it("8.3 Should be able to create a new DocTemplate", () => {
    //   cy.docTemplateCreate(TemplateName);
    // });
  
    // it("8.2 Should be able to create a new folder in a folder (create a sub folder)", () => {
    //   cy.get(TableSelector)
    //     .contains("td", folderName)
    //     .should("be.visible")
    //     .click();
    //   cy.get(".breadcrumb").should("include.text", folderName);
    //   cy.docTemplateCreateFolder(subFolderName);
    // });
    
  });
  