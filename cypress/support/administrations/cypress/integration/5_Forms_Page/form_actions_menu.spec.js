/// <reference types="cypress" />
// Cases:
// Share, Load, Build,Embed

describe("Form's action menu: load, build, version, share, embed", () => {
  beforeEach(() => {
    cy.login();
    cy.visit("/Falcon/Forms");
    cy.get("div#FormsTable_wrapper").should("be.visible");
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

  const TableId = "FormsTable";
  const TableSelector = `table#${TableId}`;

  it("5.8 Should be able to open the page of Load a form", () => {
    const formName = "Cypress_Load_Form_" + new Date().getTime();
    cy.createForm(formName, "Form");
    cy.wait(1000);
    cy.get(TableSelector).contains("td", formName).should("be.visible");
    cy.loadForm(formName);
    cy.go("back");
    cy.wait(1000);
    cy.deleteForm(formName);
  });

  it("5.8 Should be able to open the page of Build a form", () => {
    const formName = "Cypress_Build_Form_" + new Date().getTime();
    cy.createForm(formName, "Form");
    cy.wait(1000);
    cy.get(TableSelector).contains("td", formName).should("be.visible");
    cy.buildForm(formName);
    cy.get(".kt-subheader__title").should("include.text", formName);
    cy.go("back");
    cy.wait(1000);
    cy.deleteForm(formName);
  });

  it("5.9 Should be able to open module ( Share |  Embed)", () => {
    const formName = "Cypress_Open_Module_" + new Date().getTime();
    cy.createForm(formName, "Form");
    cy.wait(1000);
    cy.get(TableSelector).contains("td", formName).should("be.visible");
    // cy.versionsForm(formName);
    // cy.reload();
    // cy.wait(1000);
    cy.shareForm(formName);
    cy.reload();
    cy.wait(1000);
    cy.embedForm(formName);
    cy.reload();
    cy.wait(1000);
    cy.deleteForm(formName);
  });

  it("5.13 Should be able to share a form with 'Can view'", () => {
    const formName = "Share_CanView_" + new Date().getTime();
    cy.createForm(formName, "Form");
    cy.wait(1000);
    cy.get(TableSelector).contains("td", formName).should("be.visible");
    cy.shareForm(formName);
    cy.shareModuleAddUserAsRole(userName, roleName.V);
    cy.shareForm(formName);
    cy.checkShareModuleUserhasRole(userName, roleName.V);
    cy.shareModuleChangeUserAsRole(userName, roleName.R);
    cy.shareForm(formName);
    cy.get("div.modal-body").contains("span", userName).should("not.exist");
    cy.get(".modal-footer > .btn").click();
    cy.wait(1000);
    cy.deleteForm(formName);
  });

  it("5.13 Should be able to share a form with 'Can Edit'", () => {
    const formName = "Share_CanEdit_" + new Date().getTime();
    cy.createForm(formName, "Form");
    cy.wait(1000);
    cy.get(TableSelector).contains("td", formName).should("be.visible");
    cy.shareForm(formName);
    cy.shareModuleAddUserAsRole(userName, roleName.E);
    cy.shareForm(formName);
    cy.checkShareModuleUserhasRole(userName, roleName.E);
    cy.shareModuleChangeUserAsRole(userName, roleName.R);
    cy.shareForm(formName);
    cy.get("div.modal-body").contains("span", userName).should("not.exist");
    cy.get(".modal-footer > .btn").click();
    cy.wait(1000);
    cy.deleteForm(formName);
  });

  it("5.13 Should be able to share a form with 'Set Owner'", () => {
    const formName = "Share_SetOwner_" + new Date().getTime();
    cy.createForm(formName, "Form");
    cy.wait(1000);
    cy.get(TableSelector).contains("td", formName).should("be.visible");
    cy.shareForm(formName);
    cy.shareModuleAddUserAsRole(userName, "Set Owner");
    cy.shareForm(formName);
    cy.checkShareModuleUserhasRole(userName, "Is Owner");
    cy.shareModuleChangeUserAsRole(userName, roleName.R);
    cy.shareForm(formName);
    cy.get("div.modal-body").contains("span", userName).should("not.exist");
    cy.get(".modal-footer > .btn").click();
    cy.wait(1000);
    cy.deleteForm(formName);
  });

  it("Should be able to change form's share roles'", () => {
    const formName = "Share_ChangeR_" + new Date().getTime();
    cy.createForm(formName, "Form");
    cy.wait(1000);
    cy.shareForm(formName);
    cy.wait(1000);
    cy.shareModuleAddUserAsRole(userName, roleName.V);
    cy.shareForm(formName);
    cy.shareModuleChangeUserAsRole(userName, roleName.E);
    cy.shareForm(formName);
    cy.shareModuleChangeUserAsRole(userName, roleName.O);
    cy.shareForm(formName);
    cy.shareModuleChangeUserAsRole(userName, roleName.V);
    cy.shareForm(formName);
    cy.shareModuleChangeUserAsRole(userName, roleName.R);
    cy.shareForm(formName);
    cy.get("div.modal-body").contains("span", userName).should("not.exist");
    cy.get(".modal-footer > .btn").click();
    cy.wait(1000);
    cy.deleteForm(formName);
  });
});
