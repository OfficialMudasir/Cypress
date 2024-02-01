describe("Administration Page: Teams add, remove, add roles, remove roles", () => {
  beforeEach(() => {
    cy.login();
    cy.get("a.kt-menu__toggle").contains("span","Administration").click();
    cy.get('a[href="/Falcon/OrganizationUnits"]').click();
    cy.get("div#OrganizationUnitEditTree").should("be.visible");
    cy.wait(3000);
    cy.clickCookiesCheck();
  });

  afterEach(() => {
    cy.clearCookies();
  });

  const testTeamName = "Test Team";
  const testUserName = "CypressUser";
  it("11.3.1 Should able to add members in a team. ", () => {
    cy.addTeamMember(testTeamName, testUserName);
  });
  it("11.3.5  Should able to delete member from a team. ", () => {
    cy.deleteTeamMember(testTeamName, testUserName);
  });

  it("11.3.2  Should be able to add role to team members. ", () => {
    cy.addRoleForTeam(testTeamName, "Tester");
  });

  it("11.3.6 Should able to delete a role from a team. ", () => {
    cy.deleteRoleForTeam(testTeamName, "Tester");
  });
});
