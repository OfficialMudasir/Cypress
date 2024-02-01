/// <reference types="cypress" />

describe("Form's Build page: Drag form components into build container.", () => {
  const formName = "Cypress_Components_" + new Date().getTime();
  //const formName = "CyTest";

  before(() => {
    cy.login();
    cy.visit("/Falcon/Forms");
    cy.get("div#FormsTable_wrapper").should("be.visible");
    cy.wait(3000);
    cy.createForm(formName, "Form");
    cy.clearCookies();
    cy.visit("/Account/Logout");
    cy.get(".m-login__welcome").should(
      "contain",
      "Build and automate legal agreements faster"
    );
    cy.clearCookies();
  });

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

  const CommonFields = [
    "builder-sfatextfield",
    "builder-sfanumber",
    "builder-sfaradioyn",
    "builder-sfaselect",
    "builder-sfacheckbox",
    "builder-checkboxesgroup",
    "builder-radiogroup",
    "builder-sfadatetime",
    "builder-person",
    "builder-addressgroup",
  ];

  it("12.2 Should be able to drag all 'Common Fields' components to the Builder", () => {
    cy.buildForm(formName);
    cy.wait(1000);
    cy.get("#group-common").then(($groupCommon) => {
      if ($groupCommon.is(":hidden")) {
        cy.get("#group-panel-common").click();
      }
    });
    CommonFields.forEach((comp) => {
      cy.get(`#${comp}`).dragTo("div.drag-container");
      cy.wait(1000);
      cy.get('[style="margin-top: 10px;"] > .btn-success').click();
      cy.wait(1000);
    });
  });

  const LayoutComp = [
    "builder-heading",
    "builder-label",
    "builder-divider",
    "builder-helpnotes",
    "builder-summarytable",
    "builder-sfapanel",
    "builder-section",
  ];

  it("12.3 Should be able to drag all'Layout' components to the Builder", () => {
    cy.buildForm(formName);
    cy.wait(1000);
    cy.get("#group-sfalayout").then(($groupCommon) => {
      if ($groupCommon.is(":hidden")) {
        cy.get("#group-panel-sfalayout").click();
      }
    });
    LayoutComp.forEach((comp) => {
      cy.get(`#${comp}`).dragTo("div.drag-container");
      cy.wait(1000);
      cy.get('[style="margin-top: 10px;"] > .btn-success').click();
      cy.wait(1000);
    });
  });

  const OtherComp = [
    "builder-sfaemail",
    "builder-sfatextarea",
    "builder-slider",
    "builder-image",
    "builder-country",
    "builder-link",
    "builder-sfahtmlelement",
  ];

  it("12.4 Should be able to drag all 'Other Fields' components to the Builder", () => {
    cy.buildForm(formName);
    cy.wait(1000);
    cy.get("#group-other").then(($groupCommon) => {
      if ($groupCommon.is(":hidden")) {
        cy.get("#group-panel-other").click();
      }
    });
    OtherComp.forEach((comp) => {
      cy.get(`#${comp}`).dragTo("div.drag-container");
      cy.wait(1000);
      cy.get('[style="margin-top: 10px;"] > .btn-success').click();
      cy.wait(1000);
    });
  });

  const AdvanceComp = [
    "builder-sfafile",
    "builder-imageupload",
    "builder-youtube",

    "builder-sfasignature",
    "builder-sfabutton",
  ];

  it("12.5 Should be able to drag all 'Advance Fields' components to the Builder", () => {
    cy.buildForm(formName);
    cy.wait(1000);
    cy.get("#group-sfadvanced").then(($groupCommon) => {
      if ($groupCommon.is(":hidden")) {
        cy.get("#group-panel-sfadvanced").click();
      }
    });

    // Add popup
    cy.get("#builder-popupform").dragTo("div.drag-container");
    cy.wait(1000);
    cy.get("div.formio-component-formId > div.choices").click();
    cy.wait(1000);
    cy.get("div.choices__list.choices__list--dropdown.is-active > input").type(
      formName
    );
    cy.wait(2000);
    cy.get("div.choices__list.choices__list--dropdown.is-active > input").type(
      "{downarrow}{enter}"
    );
    cy.wait(3000);
    cy.get('[style="margin-top: 10px;"] > .btn-success').click();
    cy.wait(1000);

    //Add Nested Form
    cy.get("#builder-nestedform").dragTo("div.drag-container");
    cy.wait(1000);
    cy.get("div.form-control").click();
    cy.wait(1000);
    cy.get("div.choices__list.choices__list--dropdown.is-active > input")
      .type(formName)
      .type("{downarrow}{enter}");
    cy.wait(1000);
    cy.get('[style="margin-top: 10px;"] > .btn-success').click();
    cy.wait(1000);

    AdvanceComp.forEach((comp) => {
      cy.get(`#${comp}`).dragTo("div.drag-container");
      cy.wait(1000);
      cy.get('[style="margin-top: 10px;"] > .btn-success').click();
      cy.wait(1000);
    });
  });
});
