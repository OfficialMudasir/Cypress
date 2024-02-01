/// <reference types="cypress" />

describe("Administration Page: Teams add, remove, add roles, remove roles", () => {
  beforeEach(() => {
    cy.login();
    cy.get("a.kt-menu__toggle").contains("span","Administration").click();
    cy.wait(1000);
    cy.get('a[href="/Falcon/Roles"]').click();
    // cy.intercept({method: 'POST',url:'/api/services/app/Role/GetRoles'}).as('apiCheck');
    // cy.wait('@apiCheck');
    cy.get("div#RolesTable_wrapper",{ timeout: 10000 }).should("be.visible");
    cy.wait(1000);
    cy.clickCookiesCheck();
    cy.wait(1000);
  });

  afterEach(() => {
    cy.clearCookies();
  });

  //   const newRoleName = "Cy" + new Date().getTime();
  const newRoleName = "Cytest";
  it("11.4  Should be able to add roles. ", () => {
    cy.createRole(newRoleName);
  });

  it("11.4.1  Should able to perform actions on particular role.(Delete)", () => {
    cy.deleteRole(newRoleName);
  });


  it("11.4.1  Should able to perform actions on particular role.(Edit)", () => {
    const roleName = "CytestForEdit"
    const editRoleName = "CytestEdited";
    cy.createRole(roleName);
    cy.editRole(roleName, editRoleName);
    cy.deleteRole(editRoleName);
  });

});
