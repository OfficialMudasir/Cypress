const TableId = "VouchersTable";
const TableSelector = `table#${TableId}`;
const CreatVoucherSelector = "#CreateNewVoucherButton";
const NameInTableSelector = `table#${TableId}>tbody>tr td:nth-child(2)`;
const VouchersTableFilter = "#VouchersTableFilter";
const SearchButton = "#GetVouchersButton";
const Actions = {
  ViewUsage: "View Usage",
  Edit: "Edit",
  Delete: "Delete",
};

Cypress.Commands.add("createVoucher", (voucher) => {
  cy.wait(1000);
  cy.get(CreatVoucherSelector,{timeout:10000}).click();
  cy.wait(1000);
  cy.get(".modal-title > span").should("contain.text", "Create new voucher");
  // fill up data
  cy.get("#Voucher_Value").clear().type(voucher.value);
  cy.get("#Voucher_NoOfUses").clear().type(voucher.uses);
  cy.get("#Voucher_Description").type(voucher.description);
  //Get the voucher's key
  cy.get("#Voucher_Key").then((key) => {
    const keyValue = key[0].value;
    console.log(key);
    cy.get(".modal-footer > .btn-primary").click();
    // cy.intercept('Get','/api/services/app/Vouchers/').as('refresh')
    // cy.wait('@refresh').its('response.statusCode').should('eq',200)
    cy.wait(1000);
    cy.get('body').should('not.have.class','.modal-title');
    //cy.pause()
    //cy.get(".modal-footer > .btn-primary").should("not.be.exist");
    cy.wait(3000);
    //cy.get(TableSelector,{timeout: 10000}).should("be.visible");
    //cy.get(`${TableSelector}>tbody>tr td:nth-child(2)`).contains("td", keyValue,{timeout: 10000}).should("be.visible");
    cy.get(VouchersTableFilter,).should("be.visible");
    cy.get(VouchersTableFilter,).clear();
    cy.get(VouchersTableFilter,).type(keyValue);
    cy.get(SearchButton).click();
    cy.wait(1000);
    cy.get('#VouchersTable tr')         // command
      .should('have.length', 2); 
    cy.get(TableSelector).contains("td", keyValue).should("be.visible");
    //cy.get(`${TableSelector}>tbody>tr>td:nth-child(2)`).should("be.visible");

    //cy.get(TableSelector).contains("td", keyValue).should("be.visible");
  });
});

Cypress.Commands.add("deleteVoucher", (voucher) => {
  cy.wait(1000);
  //checked exising voucher by description
  var l = cy.get('#VouchersTable tr').length;
  cy.get(VouchersTableFilter).clear().type(voucher.description);
  cy.get(SearchButton).click();
  cy.wait(3000);
  cy.get(TableSelector)
    .contains("td", voucher.description)
    .should("be.visible")
    .each(($row, index) => {
      cy.clickTableOnRowOfAction(TableId, index, Actions.Delete);
    });
  cy.get(".swal-overlay--show-modal").should("be.exist");
  cy.get("button.swal-button--confirm",{timeout: 10000}).click();
 // cy.get("button.swal-button--confirm").should("not.be.visible");

  
  cy.wait(3000);
  cy.contains("td", voucher.description).should("not.exist");
  cy.get(TableSelector).contains("td", voucher.description).should("not.exist");
});

Cypress.Commands.add("editVoucher", (description, editedD) => {
  cy.wait(1000);
  //checked exising voucher by description
  cy.get(VouchersTableFilter).clear().type(description);
  cy.get(SearchButton).click();
  cy.wait(3000);
  cy.get(TableSelector)
    .contains("td", description)
    .should("be.visible")
    .each(($row, index) => {
      cy.clickTableOnRowOfAction(TableId, index, Actions.Edit);
    });
  cy.wait(3000);
  cy.get("#Voucher_Description").clear().type(editedD,{timeout: 10000});
  cy.get(".modal-footer > .btn-primary").click();
  cy.wait(3000);

  cy.get(VouchersTableFilter).should("be.visible");
  cy.get(VouchersTableFilter).clear().type(editedD);
  cy.get(SearchButton).click();
  cy.wait(3000);
  cy.contains("td", editedD).should("be.visible");
  cy.get(TableSelector).contains("td", editedD).should("be.visible");
});
