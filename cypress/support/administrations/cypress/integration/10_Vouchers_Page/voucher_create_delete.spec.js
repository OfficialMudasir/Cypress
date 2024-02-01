describe("Vouchers page: Vouchers Create and Delete", () => {
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
  it("10.1  Should be able to create a new voucher.", () => {
    cy.createVoucher(newVoucher);
  });

  it("10.5  Should able to delete voucher. ", () => {
    cy.deleteVoucher(newVoucher);
  });
  // TODO : create voucher with entity or empty entity
});
