const TableId = "FormsTable";
const TableSelector = `table#${TableId}`;
const CreatFormSelector = "#CreateNewFormButton";
const CreatFolderSeletor = "#CreateNewFolderButton";
const NameInTableSelector = `table#${TableId}>tbody>tr td:nth-child(2)`;
const Actions = {
  Share: "Share",
  Edit: "Edit",
  Delete: "Delete",
  OpenForm: "Open Form",
  BuildForm: "Build Form",
  Embed: "Embed",
};

//cy.createForm("formName", "Form");
Cypress.Commands.add("createForm", (formName, type) => {
  cy.get(CreatFormSelector).should('be.visible');
  cy.get(CreatFormSelector).click();
  cy.get(".modal-title > span").should("have.text", "Edit form");
  cy.get("#Form_Name").type(formName);
  cy.get("#Form-select").select(type);
  cy.get("#Form_Description").type("Description of " + formName);
  cy.get(".modal-footer > .btn-primary").click();
  //cy.wait(1000);
  cy.get(".modal-title > span").should("not.be.visible");
  cy.wait(3000);
  cy.get("#FormsTableFilter").should("be.visible")
  cy.get("#FormsTableFilter").type(formName).type('{enter}');
  cy.wait(1000);
  cy.get('#FormsTable tr')         // command
      .should('have.length.lte', 5);
  cy.get(TableSelector).contains("td", formName).should("be.visible");
});

//cy.deleteForm("formName");
Cypress.Commands.add("deleteForm", (formName) => {
  //cy.get("#FormsTable_wrapper").should("contain",formName);
  cy.wait(2000);
  cy.get(TableSelector).contains("td", formName).should("be.visible");
  cy.get(NameInTableSelector).each(($e, index) => {
    const formN = $e.text();
    if (formN.includes(formName)) {
      cy.clickTableOnRowOfAction(TableId, index, Actions.Delete);
      cy.get(".swal-overlay--show-modal").should("be.exist");
     // cy.pause();
      cy.get("button.swal-button--confirm",{ timeout: 10000 }).click({force: true});
     // cy.get("swal-button swal-button--confirm").should("not.be.exist");
      cy.wait(3000);
      cy.get(TableSelector).contains("td", formName).should("not.exist");
    }
  });
});

//cy.loadForm("formName");
Cypress.Commands.add("loadForm", (formName) => {
  cy.get(TableSelector).contains("td", formName).should("be.visible");

  cy.get(NameInTableSelector).each(($e, index) => {
    const formN = $e.text();
    if (formN.includes(formName)) {
      const formId = $e.attr("data-id");
      //cy.clickTableOnRowOfAction(TableId, index, Actions.OpenForm);
      cy.visit(`/Falcon/forms/load?OriginalId=${formId}&version=live`);
      cy.wait(2000);
      cy.url().should("include", formId);
      cy.wait(1000);
    }
  });
});

//cy.buildForm("formName");
Cypress.Commands.add("buildForm", (formName) => {
  cy.get("#FormsTableFilter").type(formName).type('{enter}');

  cy.get(TableSelector).contains("td", formName).should("be.visible");

  cy.get(NameInTableSelector).each(($e, index) => {
    const formN = $e.text();
    if (formN.includes(formName)) {
      const formId = $e.attr("data-id");
      //cy.clickTableOnRowOfAction(TableId, index, Actions.BuildForm);
      cy.visit(`/Falcon/forms/build?OriginalId=${formId}&version=live`);
      cy.wait(1000);
      cy.url().should("include", formId);
      cy.wait(1000);
    }
  });
});

//cy.versionsForm("formName");
//No Version *********
// Cypress.Commands.add("versionsForm", (formName) => {
//   cy.get(TableSelector).contains("td", formName).should("be.visible");

//   cy.get(NameInTableSelector).each(($e, index) => {
//     const formN = $e.text();
//     if (formN.includes(formName)) {
//       cy.get("table#FormsTable>tbody>tr td:nth-child(1)")
//         .eq(index)
//         .find('a[name="EditFormLink"]')
//         .click();
//       cy.wait(1000);
//       cy.get(".modal-title > span").should("have.text", "Edit form");
//     }
//   });
// });

//cy.shareForm("formName");
Cypress.Commands.add("shareForm", (formName) => {
  cy.get(TableSelector).contains("td", formName).should("be.visible");

  cy.get(NameInTableSelector).each(($e, index) => {
    const formN = $e.text();
    if (formN.includes(formName)) {
      cy.clickTableOnRowOfAction(TableId, index, Actions.Share);
      cy.wait(2000);
      cy.get("#GrantNewACL").should("exist");
    }
  });
});

//cy.embedForm("formName");
Cypress.Commands.add("embedForm", (formName) => {
  cy.get(TableSelector).contains("td", formName).should("be.visible");

  cy.get(NameInTableSelector).each(($e, index) => {
    const formN = $e.text();
    if (formN.includes(formName)) {
      cy.clickTableOnRowOfAction(TableId, index, Actions.Embed);
      cy.wait(2000);
      cy.get(".modal-title > span").should(
        "have.text",
        "Generate Form Embed Code"
      );
    }
  });
});

Cypress.Commands.add("formCreateFolder", (folderName) => {
  cy.get(CreatFolderSeletor).should('be.visible');
  cy.get(CreatFolderSeletor).click();
  cy.get(".modal-title > span").should("have.text", "New Folder");
  cy.get("#Folder_Name").type(folderName);
  cy.get(".modal-footer > .btn-primary").click();
  cy.wait(3000);
  cy.get(TableSelector,{timeout:20000}).contains("td", folderName).should("be.visible");
});

Cypress.Commands.add("formDeleteFolder", (folderName) => {
 // cy.get("#FormsTable_wrapper").should("contain",folderName);
  cy.wait(3000);
  cy.get(TableSelector).contains("td", folderName).should("be.visible");

  // Name on column 2
  cy.get(NameInTableSelector).each(($e, index) => {
    const folderN = $e.text();
    if (folderN.includes(folderName)) {
      cy.clickTableOnRowOfAction(TableId, index, Actions.Delete);
      cy.get(".swal-overlay--show-modal").should("be.exist");
      cy.get("button.swal-button--confirm").click();
      // cy.intercept('DELETE','/api/services/app/Folders/**').as('refresh')
      // cy.wait('@refresh').its('response.statusCode').should('eq',200)
      //cy.wait(1000);
     // cy.get("button.swal-button--confirm").should("not.be.exist");
      cy.wait(4000);
      cy.get(TableSelector).contains("td", folderName).should("not.exist");
    }
  });
});

Cypress.Commands.add("formEditFolder", (folderName, newFolderName) => {
  cy.get(TableSelector).contains("td", folderName).should("be.visible");

  cy.get(NameInTableSelector).each(($e, index) => {
    const folderN = $e.text();
    if (folderN.includes(folderName)) {
      cy.clickTableOnRowOfAction(TableId, index, Actions.Edit);
      cy.wait(1000);
      cy.get(".modal-title > span",{timeout:10000}).should("have.text", "Edit folder");
      cy.get("#Folder_Name").clear().type(newFolderName);
      cy.get(".modal-footer > .btn-primary").click();
      //cy.get(".modal-footer > .btn-primary").should("not.be.visible");
      cy.wait(5000);
      cy.get(TableSelector).contains("td", newFolderName).should("be.visible");
    }
  });
});

Cypress.Commands.add("formShareFolder", (folderName) => {
  cy.wait(3000);
  cy.get(TableSelector).contains("td", folderName).should("be.visible");

  cy.get(NameInTableSelector).each(($e, index) => {
    const folderN = $e.text();
    if (folderN.includes(folderName)) {
      cy.clickTableOnRowOfAction(TableId, index, Actions.Share);
      cy.wait(3000);
    }
    
  });


});

//const NameInTableSelector = `table#${TableId}>tbody>tr td:nth-child(2)`;

Cypress.Commands.add("shareForm", (formName) => {
  cy.get(TableSelector).contains("td", formName).should("be.visible");

  cy.get(NameInTableSelector).each(($e, index) => {
    const formN = $e.text();
    if (formN.includes(formName)) {
      cy.clickTableOnRowOfAction(TableId, index, Actions.Share);
      cy.wait(2000);
    }
  });
});
