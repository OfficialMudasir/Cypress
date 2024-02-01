/// <reference types="cypress" />
// Cases:

describe("App page: AppJob Create and Delete", () => {
  beforeEach(() => {
    cy.login();
    cy.visit("/Falcon/Apps");
    cy.get("div#AppsTable_wrapper").should("be.visible");
    cy.wait(3000);
    cy.clickCookiesCheck();
  });

  //   afterEach(() => {
  //     cy.clearCookies();
  //   });

  const appName = "Cypress_App_" + new Date().getTime();
  const appJobName = "Cypress_AppJob_" + new Date().getTime();
  const editedJobName = "Edited_AppJob_" + new Date().getTime();

  const AppsTableId = "AppsTable";
  const AppsTableSelector = `table#${AppsTableId}`;

  it("6.7 should able to edit the Appjob in app. ", () => {
    cy.createApp(appName);
    cy.createAppJob(appName, appJobName);
    cy.reload();
    cy.wait(1000);
   //const appName = "Cypress_AppJob_1612957444583";
    cy.searchApp(appName);
    cy.get(AppsTableSelector).contains("td", appName).click();
    //cy.editAppJobName(appJobName, editedJobName);

    cy.editAppJob(appJobName, editedJobName);
    cy.checkEditAppJob(editedJobName);
    cy.deleteAppJob(editedJobName);
    cy.reload(true);
    cy.wait(1000);
    cy.deleteApp(appName);
  });


  // it.only("check", () => {
  //   const editedJobName = "Edited_AppJob_1612991740206";
  //   cy.searchApp("Cypress_App_1612991740206");
  //   cy.get(AppsTableSelector).contains("td", "Cypress_App_1612991740206").click();
  //   cy.checkEditAppJob(editedJobName);
  //   //cy.editAppJob(editedJobName);
  // });

});





