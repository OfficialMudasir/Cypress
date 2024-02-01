/// <reference types="cypress" />

describe("Administration Page: Users add, remove", () => {
    beforeEach(() => {
      cy.login();
      cy.get("a.kt-menu__toggle").contains("span","Administration").click();
      cy.get('a[href="/Falcon/Users"]').click();
      cy.get("div#UsersTable_wrapper").should("be.visible");
      cy.wait(3000);
      cy.clickCookiesCheck();
    });
  
    afterEach(() => {
      cy.clearCookies();
    });


    const newUserName = "Cytest";
    const TableId = 'UsersTable';
    const NameInTableSelector = `table#${TableId}>tbody>tr td:nth-child(3)`;
    const TableSelector = `table#${TableId}`;

    const Actions = {
      LoginUser: "Login as this user",
      Edit: "Edit",
      LoginTenant: "Login as this user",
    };

    it("11.5  Should be able to create a new user. ", () => {
      cy.createUser(newUserName);
    });

  
      // it("11.5.3 Should able to login other user account within the host (Host Level)", () => {
      //   cy.get(TableSelector).contains("td", newUserName).should("be.visible");

      //   cy.get(NameInTableSelector).each(($e, index) => {
      //     const userN = $e.text();
      //     if (userN.includes(newUserName)) {
      //       cy.clickTableOnRowOfActionUser(TableId, index, Actions.LoginUser);
      //       cy.wait(10000);
      //       cy.get('.kt-header__topbar-username #HeaderCurrentUserName').should('contain',newUserName);
            
      //     }
      //   });

      // });

      // it.only("11.5.4 Should able to back to my account while inpersonate (Host Level)", () => {
      //   cy.get(TableSelector).contains("td", newUserName).should("be.visible");

      //   cy.get(NameInTableSelector).each(($e, index) => {
      //     const userN = $e.text();
      //     if (userN.includes(newUserName)) {
      //       cy.clickTableOnRowOfActionUser(TableId, index, Actions.LoginUser);
      //       cy.wait(5000);
      //       console.log("here");
      //     }
      //   });
      //   console.log("here2");
      //   cy.get('.kt-header__topbar-username #HeaderCurrentUserName').should('contain',newUserName);
      //   cy.backToAccount();   

      // });



      it("Should be able to delete a user. ", () => {
        cy.get('#UsersTableFilter').type(newUserName);
        cy.get('#GetUsersButton').click();
        cy.wait(1000);
        cy.deleteUser(newUserName);
        cy.get('.dataTables_empty').should("be.visible");
      });


});