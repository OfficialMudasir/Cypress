const TableId = "ProjectTemplatesTable";
const TableSelector = `table#${TableId}`;
const CreatPTselector = "#CreateNewProjectTemplateButton";
const NameInTableSelector = `table#${TableId}>tbody>tr td:nth-child(2)`;
const Actions = {
  View: "View",
  Edit: "Edit",
  Share: "Share",
  Delete: "Delete",
};

const stepname1 = 'step1';
const stepname2 = 'step2';
const stepdescp1 = 'description of step1';
const stepdescp2 = 'description of step2';
//cy.createForm("formName", "Form");
Cypress.Commands.add("createPT", (ptName) => {
  cy.get(CreatPTselector).should('be.visible');
  cy.get(CreatPTselector).click();
  cy.wait(2000);
  cy.get(".modal-title > span").should("have.text", "Create new project template");

  //step1
  cy.get('[name="ProjectTemplateName"]').type(ptName);
  cy.get(".modal-title > span").click();
  cy.get("[name='TemplateDescription']").type("Description of " + ptName);
  cy.get("[data-ktwizard-type='action-next']").click();
  cy.wait(1000);

  //step2
  cy.get('#kt_wizard_form_step_2_form > .kt-form__section > :nth-child(2) > div > .form-control').type(stepname1);
  cy.get(".modal-title > span").click();
  cy.get('#kt_wizard_form_step_2_form > .kt-form__section > :nth-child(3) > .form-control').click().type("{downarrow}{enter}");//select feedback, hard code, f7e5342f-55c7-4c21-bae9-78f0e4665e41
  cy.get('#kt_wizard_form_step_2_form > .kt-form__section > :nth-child(4) > .form-control').type(stepdescp1);
  cy.get('#btn-add-ProjectStep').click();

    cy.get(':nth-child(2) > :nth-child(2) > div > .form-control').type( stepname2);
    cy.get(".modal-title > span").click();
    cy.get(':nth-child(2) > :nth-child(3) > .form-control').click().type("{downarrow}{enter}");//select feedback, hard code
    cy.get(':nth-child(2) > :nth-child(4) > .form-control').type(stepdescp2);
    

  
    //cy.get('#btn-add-ProjectStep').click();

    cy.get("[data-ktwizard-type='action-next']").click();

    //ACL
    cy.get('.tt-input').type('admin');
    cy.get('.tt-suggestion').click();

  cy.get(".kt-form__actions > .btn-success").click();
  cy.get(".modal-title > span").should("not.be.visible");
  cy.wait(3000);
//   cy.get("#ProjectTemplatesTableFilter").should("be.visible")
//   cy.get("#FormsTableFilter").type(formName).type('{enter}');
//   cy.wait(1000);
  // cy.get('#ProjectTemplatesTable tr')         // command
  //     .should('have.length.lte', 5);
  cy.get(TableSelector).contains("td", ptName).should("be.visible");
});


Cypress.Commands.add("ptView", (ptName) => {

  cy.get(NameInTableSelector).each(($e, index) => {
    const formN = $e.text();
    if (formN.includes(ptName)) {
      cy.clickTableOnRowOfAction(TableId, index, Actions.View);
     
      cy.wait(3000);
      cy.get('.modal-title').should('contain','View Poject Template');
      cy.get('.modal-body >.form-group').should('contain', ptName);
      cy.get('.modal-body >.form-group').should('contain', "Description of " + ptName);

      //check step
      cy.get('.timeline > :nth-child(1)>h5').should('contain',stepname1);
      cy.get('.timeline > :nth-child(1)> p').should('contain',stepdescp1);
      cy.get('.timeline > :nth-child(2)> h5').should('contain',stepname2);
      cy.get('.timeline > :nth-child(2)> p').should('contain',stepdescp2);
    }
  });
});

  Cypress.Commands.add("shareProTem", (ptName) => {
   // cy.searchApp(ptName);
    cy.get(TableSelector).contains("td", ptName).should("be.visible");
    cy.get(NameInTableSelector).each(($e, index) => {
      const rowText = $e.text();
      if (rowText.includes(ptName)) {
        cy.clickTableOnRowOfAction(TableId, index, Actions.Share);
        cy.wait(2000);
      }
    });
  });

  Cypress.Commands.add("editPt", (ptName) => {
    // cy.searchApp(ptName);
     cy.get(TableSelector).contains("td", ptName).should("be.visible");
     cy.get(NameInTableSelector).each(($e, index) => {
       const rowText = $e.text();
       if (rowText.includes(ptName)) {
         cy.clickTableOnRowOfAction(TableId, index, Actions.Edit);
         cy.wait(2000);

         cy.get('[name="ProjectTemplateName"]').clear();
         cy.get('[name="ProjectTemplateName"]').type('edited'+ptName);
         cy.get("[data-ktwizard-type='action-next']").click();
         cy.get("[data-ktwizard-type='action-next']").click();

         cy.get(".kt-form__actions > .btn-success").click();
         cy.wait(3000);

       }
     });
   });

Cypress.Commands.add("ptDelete", (ptName) => {
  cy.get(NameInTableSelector).each(($e, index) => {
    const formN = $e.text();
    if (formN.includes(ptName)) {
      cy.clickTableOnRowOfAction(TableId, index, Actions.Delete);
      cy.get(".swal-overlay--show-modal").should("be.exist");
      cy.get("button.swal-button--confirm",{ timeout: 10000 }).click({force: true});
      cy.wait(3000);
      cy.get(TableSelector).contains("td", ptName).should("not.exist");
    }
  });
});
