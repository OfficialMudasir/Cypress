/// <reference types="cypress" />

context("Create a project share and edit project template.", () => {
    beforeEach(() => {
      cy.login();
      cy.visit("/Falcon/ProjectTemplates");
      cy.wait(3000);
      cy.get("div#ProjectTemplatesTable_wrapper").should("be.visible");
      cy.wait(3000);
      cy.clickCookiesCheck();
    });
  
    afterEach(() => {
      cy.clearCookies();
    });
  
    //const ptName = "Cypress_pt_" + new Date().getTime();
    const TableId = "ProjectTemplatesTable";
    const TableSelector = `table#${TableId}`;
    const userName = "CypressUser";
    const roleName = {
      V: "Can View",
      E: "Can Edit",
      O: "Make Owner",
      R: "Revoke Access",
    };

  // it("14.5 Should be able to share project template with 'Can Edit'. ", () => {
  //  const ptName = "Share_CanEidt_" + new Date().getTime();
  //   cy.createPT(ptName);
  //   cy.wait(3000);
    
  //   cy.get(TableSelector).should('contain',ptName);
    
  //   cy.shareProTem(ptName);
    
  //   cy.shareModuleAddUserAsRole(userName, roleName.E);
  //   cy.shareProTem(ptName);
  //   cy.checkShareModuleUserhasRole(userName, roleName.E);
  //   cy.shareModuleChangeUserAsRole(userName, roleName.R);
  //   cy.shareProTem(ptName);
  //   cy.get("div.modal-body").contains("span", userName).should("not.exist");
  //   cy.get(".modal-footer > .btn").click();
  //  // cy.wait(3000);
  //  cy.ptDelete(ptName);
  // // });

  // it("14.5 Should be able to share project template with 'Set Owner'. ", () => {
  //   const ptName = "Share_MakeOwner_" + new Date().getTime();
  //   cy.createPT(ptName);
  //   //cy.wait(1000);
  //   cy.shareProTem(ptName);
  //   //cy.wait(1000);
  //   cy.shareModuleAddUserAsRole(userName, "Set Owner");
  //   cy.shareProTem(ptName);
  //   cy.checkShareModuleUserhasRole(userName, "Is Owner");
  //   cy.shareModuleChangeUserAsRole(userName, roleName.R);
  //   cy.shareProTem(ptName);
  //   cy.get("div.modal-body").contains("span", userName).should("not.exist");
  //   cy.get(".modal-footer > .btn").click();
  //   cy.wait(1000);
  //   cy.ptDelete(ptName);
  // });

  // it("Should be able to change share roles", () => {
  //   const  ptName = "Share_ChangeR_" + new Date().getTime();
  //   cy.createPT(ptName);
  //   cy.wait(1000);
  //   cy.shareProTem(ptName);
  //   cy.wait(1000);
  //   cy.shareModuleAddUserAsRole(userName, roleName.V);
  //   cy.shareProTem(ptName);
  //   cy.shareModuleChangeUserAsRole(userName, roleName.E);
  //   cy.shareProTem(ptName);
  //   cy.shareModuleChangeUserAsRole(userName, roleName.O);
  //   cy.shareProTem(ptName);
  //   cy.shareModuleChangeUserAsRole(userName, roleName.V);
  //   cy.shareProTem(ptName);
  //   cy.shareModuleChangeUserAsRole(userName, roleName.R);
  //   cy.shareProTem(ptName);
  //   cy.get("div.modal-body").contains("span", userName).should("not.exist");
  //   cy.get(".modal-footer > .btn").click();
  //   cy.wait(1000);
  //   cy.ptDelete(ptName);
  // });

  it("14.6  Should be able to edit project template", () => {
    const ptName = "CypressTest" + new Date().getTime();
    const newPtName = 'edited'+ptName;
    cy.createPT(ptName);
    cy.editPt(ptName,newPtName);

    cy.get(TableSelector)
      .contains("td", newPtName)
      .should("be.visible");
    cy.ptDelete(newPtName);  
  });
    
}); 