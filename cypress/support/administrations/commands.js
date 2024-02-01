const Actions = {
  Edit: "Edit",
  Delete: "Delete"
};

Cypress.Commands.add("addTeamMember", (teamName, userName) => {
  cy.get("div#OrganizationUnitEditTree").contains("li", teamName).click();
  cy.get("span#SelectedOuRightTitle")
    .should("be.visible")
    .should("contain.text", teamName);
  cy.wait(2000);
  cy.get("table.organization-members-table").should(
    "not.contain.text",
    userName
  );

  cy.get("#AddUserToOuButton").click();
  cy.wait(1000);
  cy.get(".modal-title > span").should("contain.text", "Select a user");
  cy.get(".input-group > .form-control").clear().type(userName);
  cy.get(".input-group-btn > .btn").click();
  cy.wait(1000);
  cy.get("table#addMemberModalTable ")
    .contains("td", userName)
    .should("be.visible");
  cy.get(".kt-checkbox > span").click();
  cy.get("#btnAddUsersToOrganization").click();
  cy.wait(1000);
  cy.get("table.organization-members-table")
    .contains("td", userName)
    .should("be.visible");
});

Cypress.Commands.add("deleteTeamMember", (teamName, userName) => {
  cy.get("div#OrganizationUnitEditTree").contains("li", teamName).click();
  cy.get("span#SelectedOuRightTitle")
    .should("be.visible")
    .should("contain.text", teamName);
  cy.wait(2000);

  cy.get("table.organization-members-table")
    .contains("td", userName)
    .should("be.visible")
    .each(($row, index) => {
      // Click the X
      cy.get("table#DataTables_Table_0>tbody>tr")
        .eq(index)
        .find('button[title="Delete"]')
        .click();
    });
  cy.get("button.swal-button--confirm").click();
  cy.wait(1000);
  cy.get("table.organization-members-table").should(
    "not.contain.text",
    userName
  );
});

Cypress.Commands.add("addRoleForTeam", (teamName, roleName) => {
  cy.get("div#OrganizationUnitEditTree").contains("li", teamName).click();
  cy.get("span#SelectedOuRightTitle")
    .should("be.visible")
    .should("contain.text", teamName);
  cy.wait(2000);

  cy.get("#SettingsTabPanel > ul > li:nth-child(2) > a").click();
  cy.wait(1000);
  cy.get("table#DataTables_Table_1").should("not.contain.text", roleName);
  cy.get("button#AddRoleToOuButton").should("be.visible").click();
  cy.wait(1000);
  cy.get("#addRoleModalTable").should("be.visible");

  cy.get('input[placeholder="Search..."]').clear().type(roleName);
  cy.get("button.add-role-filter-button").click();
  cy.wait(1000);
  cy.get(".kt-checkbox > span").click();
  cy.get("#btnAddRolesToOrganization").click();
  cy.wait(1000);
  cy.get("table#DataTables_Table_1")
    .contains("td", roleName)
    .should("be.visible");
});

Cypress.Commands.add("deleteRoleForTeam", (teamName, roleName) => {
  cy.get("div#OrganizationUnitEditTree").contains("li", teamName).click();
  cy.get("span#SelectedOuRightTitle")
    .should("be.visible")
    .should("contain.text", teamName);
  cy.wait(2000);

  cy.get("#SettingsTabPanel > ul > li:nth-child(2) > a").click();
  cy.get("table#DataTables_Table_1")
    .contains("td", roleName)
    .should("be.visible");

  cy.wait(1000);
  cy.get("button#AddRoleToOuButton").should("be.visible");

  cy.get("table#DataTables_Table_1>tbody>tr td:nth-child(2)")
    .contains("td", roleName)
    .should("be.visible")
    .each(($row, index) => {
      // Click the X
      cy.get("table#DataTables_Table_1>tbody>tr td:nth-child(1)")
        .eq(index)
        .find('button[title="Delete"]')
        .click();
    });
  cy.get("button.swal-button--confirm").click();
  cy.wait(1000);
  cy.get("table#DataTables_Table_1").should("not.contain.text", roleName);
});

const RolesTableId = "RolesTable";
const RolesTableSelector = `table#${RolesTableId}`;
const CreateRoleButtonSelector = "#CreateNewRoleButton";
const RoleNameInTableSelector = `table#${RolesTableId}>tbody>tr td:nth-child(3)`; // the name in the column 3


Cypress.Commands.add("createRole", (roleName) => {
  cy.wait(1000);
  cy.get(RolesTableSelector).contains("td", roleName).should("not.exist");
  cy.wait(1000);
  cy.get(CreateRoleButtonSelector).click();
  cy.get("#RoleName").type(roleName);
  cy.get(".kt-checkbox > span").click();
  cy.get('a[href="#PermissionsTab"]').click();
  cy.get("#Pages_anchor").click();
  cy.get('a[href="#RoleInformationsTab"]').click();
  cy.get(".modal-footer > .btn-primary").click();
  cy.wait(5000);
  cy.get(RolesTableSelector).contains("td", roleName).should("be.visible");
});

Cypress.Commands.add("editRole", (roleName,editName) => {
  cy.get(RolesTableSelector).contains("td", roleName).should("be.visible");

  cy.get(RoleNameInTableSelector).each(($e, index) => {
    const roleN = $e.text();
    if (roleN.includes(roleName)) {
      // the Actions button in the column 2
      cy.get(`table#${RolesTableId}>tbody>tr td:nth-child(2)`)
      .eq(index)
      .find("button.btn")
      .click()
      .parent()
      .find("li>a")
      .contains(Actions.Edit)
      .click();   

      cy.get("#RoleName").clear().type(editName);
      cy.get(".modal-footer > .btn-primary").click();
      cy.wait(5000);
      cy.get(RolesTableSelector).contains("td", editName).should("be.visible");
    }
  });
});


Cypress.Commands.add("deleteRole", (roleName) => {
  cy.get(RolesTableSelector,{ timeout: 10000}).contains("td", roleName).should("be.visible");

  cy.get(RoleNameInTableSelector).each(($e, index) => {
    const roleN = $e.text();
    if (roleN.includes(roleName)) {
      // the Actions button in the column 2
      cy.get(`table#${RolesTableId}>tbody>tr td:nth-child(2)`)
      .eq(index)
      .find("button.btn")
      .click()
      .parent()
      .find("li>a")
      .contains(Actions.Delete)
      .click();      
      cy.get("div.swal-text").should("contain.text",roleName);
      cy.wait(1000);
      cy.get("button.swal-button--confirm").click();
      cy.wait(3000);
      cy.get(RolesTableSelector).contains("td", roleName).should("not.exist");
    }
  });
});


const UserTableId = "UsersTable";
const UserTableSelector = `table#${UserTableId}`;
const CreateUserButtonSelector = "#CreateNewUserButton";
const UserNameInTableSelector = `table#${UserTableId}>tbody>tr td:nth-child(4)`; // the name in the column 4, UserName in 3

Cypress.Commands.add("createUser", (userName) => {
  cy.get(UserTableSelector).contains("td", userName).should("not.exist");

  cy.get(CreateUserButtonSelector).click();
  cy.wait(1000);

  cy.get(".modal-title > span").should("have.text", "Create new user");

  cy.get('#Name').type(userName);
  cy.get('#Surname').type(`${userName}Surname`);
  cy.get('#EmailAddress').type(`${userName}@syntaq.com`);
  cy.get('#UserName').type(`${userName}UserName`);
  cy.get('[for="EditUser_SendActivationEmail"]').click();
  cy.get(".modal-footer > .btn-primary").click();
  cy.wait(3000);
  cy.get(UserNameInTableSelector).contains("td", userName).should("be.visible");
});

Cypress.Commands.add("deleteUser", (userName) => {
  cy.get(UserTableSelector).contains("td", userName).should("be.visible");

  cy.get(UserNameInTableSelector).each(($e, index) => {
    const roleN = $e.text();
    if (roleN.includes(userName)) {
      // the Actions button in the column 2
      cy.get(`table#${UserTableId}>tbody>tr td:nth-child(2)`)
      .eq(index)
      .find("button.btn")
      .click()
      .parent()
      .find("li>a")
      .contains(Actions.Delete)
      .click();      
      cy.get("div.swal-text").should("contain.text",userName);
      cy.wait(1000);
      cy.get("button.swal-button--confirm").click();
      cy.wait(3000);
      //cy.get(UserNameInTableSelector).contains("td", userName).should("not.exist");
    }
  });
});

Cypress.Commands.add("backToAccount", (userName) => {
  cy.get('.kt-header__topbar-username #HeaderCurrentUserName').should('contain',newUserName);
  cy.get('.kt-header__topbar-user .fa fa-reply kt--font-danger').click();
  cy.get('.kt-user-card').should('be.visiable');
  cy.get('.kt-notification__item-details').click();
  cy.wait(5000);
  cy.get('.kt-header__topbar-username #HeaderCurrentUserName').should('contain','tong');
    
});

Cypress.Commands.add(
  "clickTableOnRowOfActionUser",
  (tableId, rowIndex, actionName) => {
    cy.get(`table#${tableId}>tbody>tr td:nth-child(2)`)
      .eq(rowIndex)
      .find("button.btn")
      .click()
      .parent()
      .find("li>a")
      .contains(actionName).pause()
      .click(); 
      
  }
);