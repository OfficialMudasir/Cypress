// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add("login", (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add("drag", { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add("dismiss", { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite("visit", (originalFn, url, options) => { ... })

Cypress.Commands.add("login", () => {
  const userName = Cypress.env("username");
  const passWord = Cypress.env("password");
  cy.visit("/");
  cy.get(".m-login__welcome", { timeout: 12000 }).should("be.visible");
  cy.get('[name="usernameOrEmailAddress"]').type(userName);
  cy.get('[name="password"]').type(passWord);
  cy.get("#kt_login_signin_submit").click();
  cy.get("body").then((body) => {
    if (body.find(".swal-title") > 0) {
      // If login error, stop all Tests
      Cypress.runner.stop();
    }
  });
  cy.get(".kt-header__topbar-username > #HeaderCurrentUserName").should(
    "have.text",
    Cypress.env("username")
  );
});

Cypress.Commands.add("LoginAsTenant", () => {
  const tenant = "CypressTest";
  const userName = "admin";
  const passWord = "123qwe";
  cy.visit("/");
  cy.get("body").type("{alt}t");
  cy.wait(1000);
  cy.get(".modal-content").should("contain", "Switch tenant");
  cy.get(".kt-switch > label > span").click();
  cy.get("#TenancyName").type(tenant);
  cy.get(".modal-footer .save-button").click();

  cy.wait(1000);
  cy.get('[name="usernameOrEmailAddress"]').type(userName);
  cy.get('[name="password"]').type(passWord);
  cy.get("#kt_login_signin_submit").click();
  cy.get("body").then((body) => {
    if (body.find(".swal-title") > 0) {
      // If login error, stop all Tests
      Cypress.runner.stop();
    }
  });
  cy.get(".kt-header__topbar-username > #HeaderCurrentUserName").should(
    "have.text",
    userName
  );
});

Cypress.Commands.add("clickCookiesCheck", () => {
  cy.get("body").then(($body) => {
    if ($body.find(".cc-window").length > 0) {
      cy.get(".cc-btn").click();
    }
  });
});

//cy.get(".source").dragTo(".target");
Cypress.Commands.add(
  "dragTo",
  { prevSubject: "element" },
  (subject, targetEl) => {
    cy.wrap(subject).trigger("mousedown", {
      which: 1,
      button: 0,
    });
    cy.get(targetEl)
      .first()
      .trigger("mousemove")
      .trigger("mouseup", { force: true });
  }
);

//in a table, drag nameA to nameB
Cypress.Commands.add("DragAtoBinT", (nameA, nameB, selectorT) => {
  cy.get(selectorT)
    .contains("td", nameA)
    .should("be.visible")
    .trigger("mousedown", {
      which: 1,
      button: 0,
    });
  cy.get(selectorT)
    .contains("td", nameB)
    .should("be.visible")
    .trigger("mousemove")
    .trigger("mouseup", { force: true });
  cy.wait(1000);
});

Cypress.Commands.add("shareModuleAddUserAsRole", (userName, roleName) => {
  cy.wait(2000);
  cy.get(".tt-input").should("be.exist");
  cy.wait(2000);

  cy.get(".tt-input").should("be.visible");
  cy.get(".tt-input").type(userName).type("{downarrow}{enter}");
  cy.get("#Role").select(roleName);
  cy.get("#GrantACL").click();
  cy.wait(3000);
  cy.get(".tt-input").should("not.exist");
});

// roleName = {Can View, Can Edit, Make Owner, Revoke Access}
Cypress.Commands.add("shareModuleChangeUserAsRole", (userName, roleName) => {
  cy.wait(2000);
  cy.get(".form-group > .col-md-8").should("be.exist");
  cy.wait(2000);

  cy.get(".form-group > .col-md-8")
    .contains("span", userName)
    .should("be.visible")
    .parent()
    .find("#dropdownMenuButton")
    .click();

  cy.get(".form-group > .col-md-8")
    .contains("span", userName)
    .parent()
    .contains("a", roleName)
    .should("be.visible")
    .click({ force: true });
  cy.get("body").should("not.have.class", "modal fade show");
  cy.wait(2000);
  //    cy.get(".form-group > .col-md-8").should("not.be.exist");
});
Cypress.Commands.add("checkShareModuleUserhasRole", (userName, roleName) => {
  cy.wait(2000);
  cy.get(".form-group > .col-md-8").should("be.exist");
  cy.wait(2000);
  
  cy.get(".form-group > .col-md-8")
    .contains("span", userName)
    .should("be.visible")
    .parent()
    .find("#dropdownMenuButton")
    .should("include.text", roleName);

  cy.wait(2000);
});

// Thourth TableId, and row index,
//click "Actions" to trigger a action by action name("Share, Delete, Edit")
// TableId, Indext of Row(start from 0), Action name
Cypress.Commands.add(
  "clickTableOnRowOfAction",
  (tableId, rowIndex, actionName) => {
    cy.get(`table#${tableId}>tbody>tr td:nth-child(1)`)
      .eq(rowIndex)
      .find("button.btn")
      .click()
      .parent()
      .find("li>a")
      .contains(actionName)
      .click();
  }
);

// Cypress doesn't support in when popup a new window or tab.
// We use this method to replace the open url into the same current tab and then continue the test
// * Call this method before "Click a button to triger window.open()"
// * Then "cy.get("@popup").should("be.called");" to make sure that it triggered window.open function call
Cypress.Commands.add("preventNewWindowOpen", () => {
  cy.window().then((win) => {
    // Replace window.open(url, target)-function with our own arrow function
    cy.stub(win, "open")
      .callsFake((url) => {
        // change window location to be same as the popup url
        win.location.href = Cypress.config().baseUrl + url;
      })
      .as("popup"); // alias it with popup, so we can wait refer it with @popup
  });
});
