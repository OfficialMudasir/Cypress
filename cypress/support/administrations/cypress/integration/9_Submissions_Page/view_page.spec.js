// /// <reference types="cypress" />

// describe("Forms page: Folder actions", () => {
//   beforeEach(() => {
//     cy.login();
//     cy.visit("/Falcon/Submissions");
//     cy.get("div#SubmissionsTable_wrapper").should("be.visible");
//     cy.wait(3000);
//     cy.clickCookiesCheck();
//   });

//   afterEach(() => {
//     cy.clearCookies();
//   });

//   const TableId = "SubmissionsTable";

//   it("9.1 Should be able to view submissions", () => {
//     //If the table contains at lease one row
//     cy.get(`table#${TableId}>tbody>tr`).its("length").should("be.gte", 1);
//     // Get the user email to check "View Details"
//     cy.get(`table#${TableId}>tbody>tr:nth-child(1) td:nth-child(4)`).then(
//       ($row) => {
//         cy.get(
//           `table#${TableId}>tbody>tr:nth-child(1) > :nth-child(9) > .pull-right > .OnClickLink`
//         ).click();
//         cy.get("div:nth-child(2) > label:nth-child(2) > span").should(
//           "contain.text",
//           $row.text()
//         );
//       }
//     );
//   });
//  });
