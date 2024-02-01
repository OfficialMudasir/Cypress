/// <reference types="cypress" />

describe("Document Templates' page: Folder actions", () => {
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

  const userName = "CypressUser";
  const roleName = {
    V: "Can View",
    E: "Can Edit",
    O: "Make Owner",
    R: "Revoke Access",
  };

  const TableId = "TemplatesTable";
  const TableSelector = `table#${TableId}`;

  it("8.13  Should be able to share a folder with 'Can View'. ", () => {
    const folderName = "Share_CanView_" + new Date().getTime();
    cy.docTemplateCreateFolder(folderName);
    cy.wait(1000);
    cy.docTemplateShareFolder(folderName);
    cy.wait(1000);
    cy.shareModuleAddUserAsRole(userName, roleName.V);
    cy.docTemplateShareFolder(folderName);
    cy.checkShareModuleUserhasRole(userName, roleName.V);
    cy.shareModuleChangeUserAsRole(userName, roleName.R);
    cy.docTemplateShareFolder(folderName);
    cy.get("div.modal-body").contains("span", userName).should("not.exist");
    cy.get(".modal-footer > .btn").click();
    cy.wait(1000);
    cy.get(".modal-footer > .btn").should('not.exist');
    cy.docTemplateDeleteFolder(folderName);
  });

  it("8.13  Should be able to share a folder with 'Can Edit'. ", () => {
    const folderName = "Share_CanEidt_" + new Date().getTime();
    cy.docTemplateCreateFolder(folderName);
    cy.wait(1000);
    cy.docTemplateShareFolder(folderName);
    cy.wait(1000);
    cy.shareModuleAddUserAsRole(userName, roleName.E);
    cy.docTemplateShareFolder(folderName);
    cy.checkShareModuleUserhasRole(userName, roleName.E);
    cy.shareModuleChangeUserAsRole(userName, roleName.R);
    cy.docTemplateShareFolder(folderName);
    cy.get("div.modal-body").contains("span", userName).should("not.exist");
    cy.get(".modal-footer > .btn").click();
    cy.wait(1000);
    cy.get(".modal-footer > .btn").should('not.exist');
    cy.docTemplateDeleteFolder(folderName);
  });

  it("8.13  Should be able to share a folder with 'Set Owner'. ", () => {
    const folderName = "Share_MakeOwner_" + new Date().getTime();
    cy.docTemplateCreateFolder(folderName);
    cy.wait(1000);
    cy.docTemplateShareFolder(folderName);
    cy.wait(1000);
    cy.shareModuleAddUserAsRole(userName, "Set Owner");
    cy.docTemplateShareFolder(folderName);
    cy.checkShareModuleUserhasRole(userName, "Is Owner");
    cy.shareModuleChangeUserAsRole(userName, roleName.R);
    cy.docTemplateShareFolder(folderName);
    cy.get("div.modal-body").contains("span", userName).should("not.exist");
    cy.get(".modal-footer > .btn").click();
    cy.wait(1000);
    cy.get(".modal-footer > .btn").should('not.exist');
    cy.docTemplateDeleteFolder(folderName);
  });

  it("Should be able to change share roles", () => {
    const folderName = "Share_ChangeR_" + new Date().getTime();
    cy.docTemplateCreateFolder(folderName);
    cy.wait(1000);
    cy.docTemplateShareFolder(folderName);
    cy.wait(1000);
    cy.shareModuleAddUserAsRole(userName, roleName.V);
    cy.docTemplateShareFolder(folderName);
    cy.shareModuleChangeUserAsRole(userName, roleName.E);
    cy.docTemplateShareFolder(folderName);
    cy.shareModuleChangeUserAsRole(userName, roleName.O);
    cy.docTemplateShareFolder(folderName);
    cy.shareModuleChangeUserAsRole(userName, roleName.V);
    cy.docTemplateShareFolder(folderName);
    cy.shareModuleChangeUserAsRole(userName, roleName.R);
    cy.docTemplateShareFolder(folderName);
    cy.get("div.modal-body").contains("span", userName).should("not.exist");
    cy.get(".modal-footer > .btn").click();
    cy.wait(1000);
    cy.get(".modal-footer > .btn").should('not.exist');
    cy.docTemplateDeleteFolder(folderName);
  });

  it("8.11 Should be able to edit a folder without template.", () => {
    const folderName = "Cypress_Folder_" + new Date().getTime();
    const newFolderName = "Edited_Cypress_Folder";
    cy.docTemplateCreateFolder(folderName);
    cy.wait(1000);
    cy.docTemplateEditFolder(folderName, newFolderName);
    cy.wait(1000);
    cy.get(TableSelector).contains("td", newFolderName).should("be.visible");
    cy.docTemplateDeleteFolder(newFolderName);
  });
});
