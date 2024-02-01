/// <reference types="cypress" />
// Cases:

describe("App page: App Create and Delete", () => {
  beforeEach(() => {
    cy.login();
    cy.visit("/Falcon/Apps");
    cy.get("div#AppsTable_wrapper").should("be.visible");
    cy.wait(3000);
    cy.clickCookiesCheck();
  });

  afterEach(() => {
    cy.clearCookies();
  });
  
  //const appName = "Cypress_App_" + new Date().getTime();
  const AppsTableId = "AppsTable";
  const AppsTableSelector = `table#${AppsTableId}`;

  const userName = "CypressUser";
  const roleName = {
    V: "Can View",
    E: "Can Edit",
    O: "Make Owner",
    R: "Revoke Access",
  };

  it("6.1 Should be able to create a new App", () => {
    const appName = "Cypress_App_" + new Date().getTime();
    cy.createApp(appName);
    cy.deleteApp(appName);
  });

  it("6.3 Should able to run app", () => {
  const appName = "Cypress_App_" + new Date().getTime();
      cy.createApp(appName);
      cy.wait(1000);
      cy.runApp(appName);
  });

//only search in the second page in shape
 it("6.4 Should able to share the app with 'Can view'", () => {
  const appName = "Share_CanView_" + new Date().getTime();
  cy.createApp(appName);
  cy.wait(1000);
 // cy.get(AppsTableSelector).contains("td", appName).should("be.visible");
  cy.shareApp(appName);
  cy.shareModuleAddUserAsRole(userName, roleName.V);
  cy.shareApp(appName);
  cy.checkShareModuleUserhasRole(userName, roleName.V);
  cy.shareModuleChangeUserAsRole(userName, roleName.R);
  cy.shareApp(appName);
  cy.get("div.modal-body").contains("span", userName).should("not.exist");
  cy.get(".modal-footer > .btn").click();
  cy.wait(1000);
  cy.get(".modal-footer > .btn").should("not.exist");
  cy.deleteApp(appName);
});

it("6.4 Should able to share the app with 'Can Edit'", () => {
  const appName = "Share_CanEdit_" + new Date().getTime();
  cy.createApp(appName);
  cy.wait(1000);
  //cy.get(AppsTableSelector).contains("td", appName).should("be.visible");
  cy.shareApp(appName);
  cy.shareModuleAddUserAsRole(userName, roleName.E);
  cy.shareApp(appName);
  cy.checkShareModuleUserhasRole(userName, roleName.E);
  cy.shareModuleChangeUserAsRole(userName, roleName.R);
  cy.shareApp(appName);
  cy.get("div.modal-body").contains("span", userName).should("not.exist");
  cy.get(".modal-footer > .btn").click();
  cy.wait(1000);
  cy.get(".modal-footer > .btn").should("not.exist");
  cy.deleteApp(appName);
});

it("6.4 Should able to share the app with 'Set Owner'", () => {
  const appName = "Share_SetOwner_" + new Date().getTime();
  cy.createApp(appName);
  cy.wait(1000);
  //cy.get(AppsTableSelector).contains("td", appName).should("be.visible");
  cy.shareApp(appName);
  cy.shareModuleAddUserAsRole(userName, "Set Owner");
  cy.shareApp(appName);
  cy.checkShareModuleUserhasRole(userName, "Is Owner");
  cy.shareModuleChangeUserAsRole(userName, roleName.R);
  cy.shareApp(appName);
  cy.get("div.modal-body").contains("span", userName).should("not.exist");
  cy.get(".modal-footer > .btn").click();
  cy.wait(1000);

  cy.get(".modal-footer > .btn").should("not.exist");
  cy.deleteApp(appName);
});



  it("6.6  should able to  search for the app. ", () => {
    const appName = "Share_SetOwner_" + new Date().getTime();
    cy.createApp(appName);
    cy.wait(1000);
    cy.get("#AppsTableFilter").clear();
    cy.get("#AppsTableFilter").type(appName).type('{enter}');
  cy.wait(3000);
  cy.get('#AppsTable_wrapper tr')         // command
      .should('have.length.lte', 5);
 // cy.get(TableSelector).contains("td", formName).should("be.visible");
  cy.get(AppsTableSelector).contains("td", appName).should("be.visible");
  cy.deleteApp(appName);
  });


  it("6.5  should able to delete the app. ", () => {
    const appName = "Cypress_App_" + new Date().getTime();
    cy.createApp(appName);
    cy.deleteApp(appName);

    
  });

 

});
