const TableId = "ProjectsTable";
const TableSelector = `table#${TableId}`;
const CreatProjselector = "#StartNewProjectButton";
const NameInTableSelector = `table#${TableId}>tbody>tr td:nth-child(2)`;
const Actions = {
  View: "Open",
  Edit: "Edit",
  Delete: "Delete",
};


Cypress.Commands.add("createproj", (prjName) => {
  cy.get(CreatProjselector).should('be.visible');
  cy.get(CreatProjselector).click();
  cy.wait(1000);
  cy.get(".modal-title > span").should('contain','Start new project');
  cy.get(':nth-child(1) > td > .btn').should('be.visible');
  cy.get(':nth-child(1) > td > .btn').click()

  // cy.get('#btn-next').click();
  // cy.wait(1000);

  // cy.get('#ProjectNameInput').clear();
  // cy.wait(1000);
  // cy.get('#ProjectNameInput').type(prjName);
  // cy.get('[name="TemplateDescription"]').type("description of " + prjName);
  
  cy.get('.kt-form__actions > .btn-success').click()

  cy.wait(3000);
  cy.get(".modal-title > span").should("not.exist");
  //cy.get(TableSelector).should('contain',prjName);
  cy.wait(5000);
  cy.searchProj(prjName);
  cy.get(TableSelector).contains("td", prjName).should("be.visible");
});


Cypress.Commands.add("searchProj", (prjName) => {
  cy.get('#ProjectsTableFilter').should('be.visible');
  cy.get('#ProjectsTableFilter').clear();
  cy.get('ProjectsTableFilter').type(prjName);
  cy.get('#GetProjectsButton').click();
  cy.wait(5000);
  cy.get(TableSelector).contains("td", prjName).should("be.visible");

  
});
