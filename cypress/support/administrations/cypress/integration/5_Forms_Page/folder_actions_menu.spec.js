/// <reference types="cypress" />

describe("Forms page: Folder actions", () => {
  beforeEach(() => {
    cy.login();
    cy.visit("/Falcon/Forms");
    cy.get("div#FormsTable_wrapper",{timeout:10000}).should("be.visible");
    cy.wait(1000);
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

  
  it("5.12 Should be able to share a folder with 'Can View'. ", () => {
    const folderName = "Share_CanView_" + new Date().getTime();
    cy.formCreateFolder(folderName);
    //cy.wait(2000);
    cy.formShareFolder(folderName);
    //cy.wait(2000);
    cy.shareModuleAddUserAsRole(userName, roleName.V);
    cy.formShareFolder(folderName);
    cy.checkShareModuleUserhasRole(userName, roleName.V);

    cy.shareModuleChangeUserAsRole(userName, roleName.R);
    cy.formShareFolder(folderName);

    cy.get("div.modal-body").contains("span", userName).should("not.exist");
    cy.get(".modal-footer > .btn").click();
    //cy.wait(3000);
    cy.formDeleteFolder(folderName);
  });

  it("5.12 Should be able to share a folder with 'Can Edit'. ", () => {
    const folderName = "Share_CanEidt_" + new Date().getTime();
    cy.formCreateFolder(folderName);
    
    cy.formShareFolder(folderName);
    
    cy.shareModuleAddUserAsRole(userName, roleName.E);
    cy.formShareFolder(folderName);
    cy.checkShareModuleUserhasRole(userName, roleName.E);
    cy.shareModuleChangeUserAsRole(userName, roleName.R);
    cy.formShareFolder(folderName);
    cy.get("div.modal-body").contains("span", userName).should("not.exist");
    cy.get(".modal-footer > .btn").click();
   // cy.wait(3000);
    cy.formDeleteFolder(folderName);
  });

  it("5.12 Should be able to share a folder with 'Set Owner'. ", () => {
    const folderName = "Share_MakeOwner_" + new Date().getTime();
    cy.formCreateFolder(folderName);
    //cy.wait(1000);
    cy.formShareFolder(folderName);
    //cy.wait(1000);
    cy.shareModuleAddUserAsRole(userName, "Set Owner");
    cy.formShareFolder(folderName);
    cy.checkShareModuleUserhasRole(userName, "Is Owner");
    cy.shareModuleChangeUserAsRole(userName, roleName.R);
    cy.formShareFolder(folderName);
    cy.get("div.modal-body").contains("span", userName).should("not.exist");
    cy.get(".modal-footer > .btn").click();
    cy.wait(1000);
    cy.formDeleteFolder(folderName);
  });

  it("Should be able to change share roles", () => {
    const folderName = "Share_ChangeR_" + new Date().getTime();
    cy.formCreateFolder(folderName);
    cy.wait(1000);
    cy.formShareFolder(folderName);
    cy.wait(1000);
    cy.shareModuleAddUserAsRole(userName, roleName.V);
    cy.formShareFolder(folderName);
    cy.shareModuleChangeUserAsRole(userName, roleName.E);
    cy.formShareFolder(folderName);
    cy.shareModuleChangeUserAsRole(userName, roleName.O);
    cy.formShareFolder(folderName);
    cy.shareModuleChangeUserAsRole(userName, roleName.V);
    cy.formShareFolder(folderName);
    cy.shareModuleChangeUserAsRole(userName, roleName.R);
    cy.formShareFolder(folderName);
    cy.get("div.modal-body").contains("span", userName).should("not.exist");
    cy.get(".modal-footer > .btn").click();
    cy.wait(1000);
    cy.formDeleteFolder(folderName);
  });

  it("Edit a folder name", () => {
    const folderName = "Cypress_Folder_" + new Date().getTime();
    const newFolderName = "Edited_Cypress_Folder";
    cy.formCreateFolder(folderName);
    cy.wait(1000);
    cy.formEditFolder(folderName, newFolderName);
    cy.wait(1000);
    cy.get("table#FormsTable")
      .contains("td", newFolderName)
      .should("be.visible");
    cy.formDeleteFolder(newFolderName);
  });
});
