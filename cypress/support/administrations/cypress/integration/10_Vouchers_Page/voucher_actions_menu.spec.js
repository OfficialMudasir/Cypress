describe("Voucher actions: edit and check usage", () => {
  beforeEach(() => {
    cy.login();
    cy.visit("/Falcon/Vouchers");
    cy.get("div#VouchersTable_wrapper").should("be.visible");
    cy.wait(3000);
    cy.clickCookiesCheck();
  });

  afterEach(() => {
    cy.clearCookies();
  });

  const newVoucher = {
    value: 10,
    uses: 5,
    description: "Cy" + new Date().getTime(),
  };

  const TableId = "VouchersTable";
  const TableSelector = `table#${TableId}`;
  const VoucherUsageTable = "#VoucherUsageTable";

  it("10.3  Should be able to edit voucher. ", () => {
    cy.createVoucher(newVoucher);
    cy.reload();
    const editedD = "Edited" + newVoucher.description;
    cy.editVoucher(newVoucher.description, editedD);
    cy.deleteVoucher(newVoucher);
  });

  it("10.4  should able to see the voucher usage. ", () => {
    cy.createVoucher(newVoucher);

    cy.get(TableSelector)
      .contains("td", newVoucher.description,{timeout:10000})
      .should("be.visible")
      .each(($row, index) => {
        cy.clickTableOnRowOfAction(TableId, index, "View Usage");
      });
    cy.get(".modal-title > span").should("have.text", "Voucher usage");
    cy.get(VoucherUsageTable).should("be.visible");
    cy.wait(1000);
    cy.get(".modal-footer > .btn").click();
    cy.wait(1000);
    cy.deleteVoucher(newVoucher);
  });
});
