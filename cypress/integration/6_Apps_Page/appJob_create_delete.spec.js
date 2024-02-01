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

  afterEach(() => {
    cy.clearCookies();
  });

  //"username": "tong",
  //"password": "tongy"
  //"baseUrl": "https://syntaq-falcon-test.azurewebsites.net",
  const appName = "Cypress_App_" + new Date().getTime();
  const appJobName = "Cypress_AppJob_" + new Date().getTime();

  const AppsTableId = "AppsTable";
  const AppsTableSelector = `table#${AppsTableId}`;
  const AppJobsTableId = "JobsTable";
  const AppJobsTableSelector = `table#${AppJobsTableId}`;

  it("6.2 Should be able to create a new AppJob **(Name input only)", () => {
    cy.createApp(appName);
    cy.createAppJob(appName, appJobName);
  });

  it("6.8 Should able to delete the Appjob in app. ", () => {
    cy.searchApp(appName);
    cy.get(AppsTableSelector).contains("td", appName).click();
    cy.deleteAppJob(appJobName);
    cy.deleteApp(appName);
  });
});
