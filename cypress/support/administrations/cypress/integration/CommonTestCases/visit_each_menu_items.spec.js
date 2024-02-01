/// <reference types="cypress" />

describe("Click on navigation bar to navigate to pages", () => {
  beforeEach(() => {
    cy.login();
  });

  afterEach(() => {
    cy.clearCookies();
    cy.wait(1000);
  });

  //Host
  it("on Dashbord", () => {
    cy.get('a[href="/Falcon/HostDashboard"]').click();
    cy.get("div#HostDashboard").should("be.visible");
    cy.get(".kt-header__topbar-username > #HeaderCurrentUserName").click();
    cy.get("div.dropdown-menu").should("be.visible");
  });

  it("on Projects", () => {
    cy.get("a.kt-menu__toggle").contains("span","Projects").click()
    cy.wait(1000);
    cy.get('a[href="/Falcon/Projects"]').click();
    cy.get("div#ProjectsTable_wrapper").should("be.visible");
  });

  it("on Projects", () => {
    cy.get("a.kt-menu__toggle").contains("span","Projects").click()
    cy.wait(1000);
    cy.get('a[href="/Falcon/ProjectTemplates"]').click();
    cy.get("div#ProjectTemplatesTable_wrapper").should("be.visible");
  });

  it("on Tenants", () => {
    cy.get('a[href="/Falcon/Tenants"]').click();
    cy.get("div#TenantsTable_wrapper").should("be.visible");
  });

  it("on Editions", () => {
    cy.get('a[href="/Falcon/Editions"]').click();
    cy.get("div#EditionsTable_wrapper").should("be.visible");
  });

  it("on Forms", () => {
    cy.get('a[href="/Falcon/Forms"]').click({force: true});
    cy.get("div#FormsTable_wrapper").should("be.visible");
  });

  it("on Apps", () => {
    cy.get('a[href="/Falcon/Apps"]').click();
    cy.get("div#AppsTable_wrapper").should("be.visible");
  });

  it("on Records", () => {
    cy.get('a[href="/Falcon/Records"]').click();
    cy.get("div#RecordsTable_wrapper").should("be.visible");
  });

  it("on Templates", () => {
    cy.get('a[href="/Falcon/Templates"]').click();
    cy.get("div#TemplatesTable_wrapper").should("be.visible");
  });

  it("on Submissions", () => {
    cy.get('a[href="/Falcon/Submissions"]').click();
    cy.get("div#SubmissionsTable_wrapper").should("be.visible");
  });

  it("on Vouchers", () => {
    cy.get('a[href="/Falcon/Vouchers"]').click();
    cy.get("div#VouchersTable_wrapper").should("be.visible");
  });

  it("on Administration->Teams", () => {
    cy.get("a.kt-menu__toggle").contains("span","Administration").click();
    cy.wait(1000);
    cy.get('a[href="/Falcon/OrganizationUnits"]').click();
    cy.get("div#OrganizationUnitEditTree").should("be.visible");
  });

  it("on Administration->Roles", () => {
    cy.get("a.kt-menu__toggle").contains("span","Administration").click();
    cy.wait(1000);
    cy.get('a[href="/Falcon/Roles"]').click();
    cy.get("div#RolesTable_wrapper").should("be.visible");
  });

  it("on Administration->Users", () => {
    cy.get("a.kt-menu__toggle").contains("span","Administration").click();
    cy.wait(1000);
    cy.get('a[href="/Falcon/Users"]').click();
    cy.get("div#UsersTable_wrapper").should("be.visible");
  });

  it("on Administration->Languages", () => {
    cy.get("a.kt-menu__toggle").contains("span","Administration").click();
    cy.wait(1000);
    cy.get('a[href="/Falcon/Languages"]').click();
    cy.get("div#LanguagesTable_wrapper").should("be.visible");
  });

  it("on Administration->AuditLogs", () => {
    cy.get("a.kt-menu__toggle").contains("span","Administration").click();
    cy.wait(1000);
    cy.get('a[href="/Falcon/AuditLogs"]').click();
    cy.get("div#AuditLogsTable_wrapper").should("be.visible");
  });

  it("on Administration->Maintenance", () => {
    cy.get("a.kt-menu__toggle").contains("span","Administration").click();
    cy.wait(1000);
    cy.get('a[href="/Falcon/Maintenance"]').click();
    cy.get("div#SettingsTabPanel").should("be.visible");
  });

  it("on Administration->Visual Settings", () => {
    cy.get("a.kt-menu__toggle").contains("span","Administration").click();
    cy.wait(1000);
    cy.get('a[href="/Falcon/UiCustomization"]').click();
    cy.get("div#metronicThemes").should("be.visible");
  });

  //Host Settings
  it("on Administration->Settings", () => {
    cy.get("a.kt-menu__toggle").contains("span","Administration").click();
    cy.wait(1000);
    cy.get('a[href="/Falcon/HostSettings"]').click({force: true});
    cy.get("div#SettingsTabPanel").should("be.visible");
    cy.wait(1000);
    cy.get('li.nav-item a[href="#SettingsUserManagementTab"]').click();
    cy.get("div#SettingsUserManagementTab").should("be.visible");
    cy.wait(1000);
    cy.get('li.nav-item a[href="#SecurityManagementTab"]').click();
    cy.get("div#SecurityManagementTab").should("be.visible");
    cy.wait(1000);
    cy.get('li.nav-item a[href="#SettingsEmailSmtpTab"]').click();
    cy.get("div#SettingsEmailSmtpTab").should("be.visible");
    cy.wait(1000);
    cy.get('li.nav-item a[href="#BillingTab"]').click();
    cy.get("div#BillingTab").should("be.visible");
    cy.wait(1000);
    cy.get('li.nav-item a[href="#OtherSettingsTab"]').click();
    cy.get("div#OtherSettingsTab").should("be.visible");
    cy.wait(1000);
    cy.get('li.nav-item a[href="#PaymentFormTab"]').click();
    cy.get("div#PaymentFormTab").should("be.visible");
    cy.wait(1000);
    cy.get('li.nav-item a[href="#SettingsTenantManagementTab"]').click();
    cy.get("div#SettingsTenantManagementTab").should("be.visible");
  });
});
