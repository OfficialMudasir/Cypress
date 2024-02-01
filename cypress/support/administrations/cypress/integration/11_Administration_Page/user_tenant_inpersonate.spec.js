// /// <reference types="cypress" />

// describe("Administration Page: Users add, remove", () => {
//     beforeEach(() => {
//       cy.LoginAsTenant();
//       cy.get("a.kt-menu__toggle").contains("span","Administration").click();
//       cy.get('a[href="/Falcon/Users"]').click();
//       cy.get("div#UsersTable_wrapper").should("be.visible");
//       cy.wait(3000);
//       cy.clickCookiesCheck();
//     });
  
//     //after clear cookies, do I need to alt+ t again?
//     afterEach(() => {
//       cy.clearCookies();
//     });


//     const newUserName = "Cytest";
//     const TableId = 'UsersTable';
//     const NameInTableSelector = `table#${TableId}>tbody>tr td:nth-child(3)`;
//     const TableSelector = `table#${TableId}`;

//     const Actions = {
//       LoginUser: "Login as this user",
//       Edit: "Edit",
//       LoginTenant: "Login as this user",
//     };

//       it("11.5.5 Should able to login other user account within a tenant(Tenant Level)", () => {
       
//         cy.get(TableSelector).contains("td", newUserName).should("be.visible");

//         cy.get(NameInTableSelector).each(($e, index) => {
//           const userN = $e.text();
//           if (userN.includes(newUserName)) {
//             cy.clickTableOnRowOfActionUser(TableId, index, Actions.LoginUser);
//             cy.wait(5000);
//             cy.get('.kt-header__topbar-username #HeaderCurrentUserName').should('contain',newUserName);
            
//           }
//         });

//       });

//       it.only("11.5.6 Should able to back to my account while inpersonate(Tenant Level)", () => {
        
//         cy.get(TableSelector).contains("td", newUserName).should("be.visible");

//         cy.get(NameInTableSelector).each(($e, index) => {
//           const userN = $e.text();
//           if (userN.includes(newUserName)) {
//             cy.clickTableOnRowOfActionUser(TableId, index, Actions.LoginUser);
//             cy.wait(10000);
//             console.log('here1');
//             cy.get('.kt-header__topbar-username #HeaderCurrentUserName').should('contain',newUserName);
//             cy.backToAccount();
//           }
//         });
//         console.log('here2');

//       });




// });