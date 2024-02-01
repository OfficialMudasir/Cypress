const TableId = "RecordsTable";
const TableSelector = `table#${TableId}`;
//const NameInTableSelector = `table#${TableId}>tbody>tr td:nth-child(2)`;
const NameInTableSelector = `table#${TableId}>tbody>tr td:nth-child(2)`;

const CreatFolderSeletor = "#CreateNewFolderButton";
const CreatEmbedSeletor = "#CreateEmbedCodeButton";
const Actions = {
  Share: "Share",
  Edit: "Edit",
  Delete: "Delete",
  NewForm: "New Form",
  JSON: "JSON",
};

Cypress.Commands.add("recordCreateFolder", (folderName) => {
  cy.wait(1000);
  cy.get(CreatFolderSeletor).click();
  cy.get(".modal-title > span").should("have.text", "New Folder");
  cy.get("#Folder_Name").type(folderName);
  cy.get(".modal-footer > .btn-primary").click();
  cy.wait(5000);
  cy.get(".modal-footer > .btn-primary").should("not.exist");
  //search
  cy.get("#RecordsTableFilter").should("be.visible");
  cy.get("#RecordsTableFilter").type(folderName);
  cy.get("#GetRecordsButton").click();

  cy.wait(5000);
  cy.get("#RecordsTable tr") // command
    .should("have.length.lte", 5);

  cy.contains("td", folderName).should("be.visible");
  cy.get(TableSelector).contains("td", folderName).should("be.visible");
});

Cypress.Commands.add("recordDeleteFolder", (folderName) => {
  cy.wait(1000);
  cy.get(TableSelector).contains("td", folderName).should("be.visible");

  cy.get(NameInTableSelector).each(($e, index) => {
    const folderN = $e.text();
    if (folderN.includes(folderName)) {
      cy.clickTableOnRowOfAction(TableId, index, Actions.Delete);
      cy.wait(1000);
      cy.get(".swal-overlay--show-modal").should("be.exist");
      cy.get("button.swal-button--confirm").click();
      cy.get(".swal-overlay--show-modal").should("not.exist");

      cy.get("#RecordsTableFilter").should("be.visible");
      cy.get("#RecordsTableFilter").clear();
      cy.get("#RecordsTableFilter").type(folderName);
      cy.get("#GetRecordsButton").click();

      cy.get("#RecordsTable tr") // command
        .should("have.length.lte", 5);

      cy.contains("td", folderName).should("not.exist");
      cy.get(TableSelector).contains("td", folderName).should("not.exist");
    }
  });
});

Cypress.Commands.add("recordEditFolder", (folderName, newFolderName) => {
  cy.wait(1000);
  cy.get(TableSelector).contains("td", folderName).should("be.visible");

  cy.get(NameInTableSelector).each(($e, index) => {
    const folderN = $e.text();
    if (folderN.includes(folderName)) {
      // action on column 2
      cy.clickTableOnRowOfAction(TableId, index, Actions.Edit);
      cy.wait(1000);
      cy.get(".modal-title > span").should("have.text", "Edit folder");
      cy.get("#Folder_Name").clear().type(newFolderName);
      cy.get(".modal-footer > .btn-primary").click();
      cy.get(".modal-footer > .btn-primary").should("not.exist");
      cy.wait(3000);

      cy.get("#RecordsTableFilter").should("be.visible");
      cy.get("#RecordsTableFilter").clear();
      cy.get("#RecordsTableFilter").type(newFolderName);
      cy.get("#GetRecordsButton").click();

      cy.wait(5000);
      cy.get("#RecordsTable tr") // command
        .should("have.length.lte", 5);

      cy.contains("td", newFolderName).should("be.visible");
      cy.get(TableSelector).contains("td", newFolderName).should("be.visible");
    }
  });
});

Cypress.Commands.add("recordShareFolder", (folderName) => {
  cy.wait(1000);
  cy.get(TableSelector).contains("td", folderName).should("be.visible");

  cy.get(NameInTableSelector).each(($e, index) => {
    const folderN = $e.text();
    if (folderN.includes(folderName)) {
      cy.clickTableOnRowOfAction(TableId, index, Actions.Share);
      cy.wait(2000);
    }
  });
});
