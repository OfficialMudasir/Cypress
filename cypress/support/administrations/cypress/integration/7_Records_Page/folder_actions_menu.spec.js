/// <reference types="cypress" />

describe("Records page: Folder actions", () => {
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

  const userName = "CypressUser";
  const roleName = {
    V: "Can View",
    E: "Can Edit",
    O: "Make Owner",
    R: "Revoke Access",
  };

  const TableId = "RecordsTable";
  const TableSelector = `table#${TableId}`;

  it("7.13 Should be able to search folder with 'Can View'. ", () => {
    const folderName = "Share_CanView_" + new Date().getTime();
    cy.recordCreateFolder(folderName);
    cy.wait(1000);
    cy.recordShareFolder(folderName);
    cy.wait(1000);
    cy.shareModuleAddUserAsRole(userName, roleName.V);
    cy.recordShareFolder(folderName);
    cy.checkShareModuleUserhasRole(userName, roleName.V);
    cy.shareModuleChangeUserAsRole(userName, roleName.R);
    cy.recordShareFolder(folderName);
    cy.get("div.modal-body").contains("span", userName).should("not.exist");
    cy.get(".modal-footer > .btn").click();
    cy.wait(1000);
    cy.recordDeleteFolder(folderName);
  });

  it("7.13 Should be able to search folder with 'Can Edit'. ", () => {
    const folderName = "Share_CanEidt_" + new Date().getTime();
    cy.recordCreateFolder(folderName);
    cy.wait(1000);
    cy.recordShareFolder(folderName);
    cy.wait(1000);
    cy.shareModuleAddUserAsRole(userName, roleName.E);
    cy.recordShareFolder(folderName);
    cy.checkShareModuleUserhasRole(userName, roleName.E);
    cy.shareModuleChangeUserAsRole(userName, roleName.R);
    cy.recordShareFolder(folderName);
    cy.get("div.modal-body").contains("span", userName).should("not.exist");
    cy.get(".modal-footer > .btn").click();
    cy.wait(1000);
    cy.recordDeleteFolder(folderName);
  });

  it("7.13 Should be able to search folder with 'Set Owner'. ", () => {
    const folderName = "Share_MakeOwner_" + new Date().getTime();
    cy.recordCreateFolder(folderName);
    cy.wait(1000);
    cy.recordShareFolder(folderName);
    cy.wait(1000);
    cy.shareModuleAddUserAsRole(userName, "Set Owner");
    cy.recordShareFolder(folderName);
    cy.checkShareModuleUserhasRole(userName, "Is Owner");
    cy.shareModuleChangeUserAsRole(userName, roleName.R);
    cy.recordShareFolder(folderName);
   
    cy.get("div.modal-body").contains("span", userName).should("not.exist");
    cy.get(".modal-footer > .btn").click();
    cy.recordDeleteFolder(folderName);
  });

  it("Should be able to change share roles", () => {
    const folderName = "Share_ChangeR_" + new Date().getTime();
    cy.recordCreateFolder(folderName);
    cy.wait(1000);
    cy.recordShareFolder(folderName);
    cy.wait(1000);
    cy.shareModuleAddUserAsRole(userName, roleName.V);
    cy.recordShareFolder(folderName);
    cy.shareModuleChangeUserAsRole(userName, roleName.E);
    cy.recordShareFolder(folderName);
    cy.shareModuleChangeUserAsRole(userName, roleName.O);
    cy.recordShareFolder(folderName);
    cy.shareModuleChangeUserAsRole(userName, roleName.V);
    cy.recordShareFolder(folderName);
    cy.shareModuleChangeUserAsRole(userName, roleName.R);
    cy.recordShareFolder(folderName);
    cy.get("div.modal-body").contains("span", userName).should("not.exist");
    cy.get(".modal-footer > .btn").click();
    cy.wait(1000);
    cy.recordDeleteFolder(folderName);
  });

  it("7.9 Should be able to edit a folder name", () => {
    const folderName = "Cypress_Folder_" + new Date().getTime();
    const newFolderName = "Edited_Cypress_Folder";
    cy.recordCreateFolder(folderName);
    cy.wait(1000);
    cy.recordEditFolder(folderName, newFolderName);
    cy.wait(1000);
    cy.get(TableSelector).contains("td", newFolderName).should("be.visible");
    cy.recordDeleteFolder(newFolderName);
  });
});
