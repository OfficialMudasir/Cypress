describe("Administration Page: change setting and save", () => {
  beforeEach(() => {
    cy.login();
    cy.get("a.kt-menu__toggle").contains("span","Administration").click();
    cy.get('a[href="/Falcon/HostSettings"]').click({ force: true });
    cy.get("div#SettingsTabPanel").should("be.visible");
    cy.wait(3000);
    cy.clickCookiesCheck();
  });

  afterEach(() => {
    cy.clearCookies();
  });

  it("11.2  Should able to change settings. ", () => {
    cy.get(":nth-child(2) > .nav-link").click();
    cy.get("#SettingsTenantManagementTab").should("be.visible");
    cy.get(":nth-child(3) > .nav-link").click();
    cy.get("#SettingsUserManagementTab").should("be.visible");
    cy.get(":nth-child(4) > .nav-link").click();
    cy.get("#SecurityManagementTab").should("be.visible");
    cy.get(":nth-child(5) > .nav-link").click();
    cy.get("#SettingsEmailSmtpTab").should("be.visible");
    cy.get(":nth-child(6) > .nav-link").click();
    cy.get("#BillingTab").should("be.visible");
    cy.get(":nth-child(7) > .nav-link").click();
    cy.get("#OtherSettingsTab").should("be.visible");
    cy.get(":nth-child(8) > .nav-link").click();
    cy.get("#PaymentFormTab").should("be.visible");
    cy.get(":nth-child(1) > .nav-link").click();
    cy.get("#SettingsGeneralTab").should("be.visible");
    cy.get("#SaveAllSettingsButton").click();
    cy.wait(1000);
    cy.get(".toast-message")
      .should("contain.text", "Saved successfully")
      .should("be.visible");
  });
});
