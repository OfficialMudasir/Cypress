//Apps
const AppsTableId = "AppsTable";
const AppsTableSelector = `table#${AppsTableId}`;
const CreatAppSelector = "#CreateNewAppButton";
const AppNameInTableSelector = `table#${AppsTableId}>tbody>tr td:nth-child(2)`;

//AppJobs
const AppJobsTableId = "JobsTable";
const AppJobsTableSelector = `table#${AppJobsTableId}`;
const AppJobNameInTableSelector = `table#${AppJobsTableId}>tbody>tr td:nth-child(1)`;

const CreatAppJobSeletor = "#AddJobToAppButton";

//Actions
const Actions = {
  Share: "Share",
  //Edit: "Edit",
  Delete: "Delete",
  RunApp: "Run App",
  CopyAppID: "Copy App ID",
  ImportRulesSchema: "Import Rules Schema",
};

Cypress.Commands.add("createApp", (appName) => {
  cy.get(CreatAppSelector).click();
  cy.get(".modal-dialog").should("be.visible");
  cy.get(".modal-title > span").should("contain.text", "New App");
  cy.get("#App_Name").type(appName);
  cy.get("#App_Description").type("Description of " + appName);
  cy.get("#App_Data").type("{}");
  cy.get(".modal-footer > .btn-primary").click();
  cy.wait(2000);
  cy.searchApp(appName);
  cy.get(AppsTableSelector).contains("td", appName).should("be.visible");
});

Cypress.Commands.add("deleteApp", (appName) => {
  cy.searchApp(appName);
  cy.get(AppsTableSelector).contains("td", appName).should("be.visible");

  cy.get(AppNameInTableSelector).each(($e, index) => {
    const rowText = $e.text();
    if (rowText.includes(appName)) {
      cy.clickTableOnRowOfAction(AppsTableId, index, Actions.Delete);
      cy.wait(1000);
      cy.get(".swal-overlay--show-modal").should("be.exist");
      cy.get("button.swal-button--confirm").click();
      // cy.get("button.swal-button--confirm").should("not.be.visible");
      cy.wait(2000);
      cy.get(AppsTableSelector).contains("td", appName).should("not.exist");
    }
  });
});

Cypress.Commands.add("searchApp", (appName) => {
  cy.get("#AppsTableFilter").should("be.visible");
  cy.get("#AppsTableFilter").clear();
  cy.wait(2000);
  cy.get("#AppsTableFilter").type(appName).type("{enter}");
  cy.wait(3000);
  cy.get("#AppsTable_wrapper tr") // command
    .should("have.length.lte", 5);
  // cy.get(TableSelector).contains("td", formName).should("be.visible");
  cy.get(AppsTableSelector).contains("td", appName).should("be.visible");
});

Cypress.Commands.add("shareApp", (appName) => {
  cy.searchApp(appName);
  cy.get(AppsTableSelector).contains("td", appName).should("be.visible");

  cy.get(AppNameInTableSelector).each(($e, index) => {
    const rowText = $e.text();
    if (rowText.includes(appName)) {
      cy.clickTableOnRowOfAction(AppsTableId, index, Actions.Share);
      cy.wait(2000);
    }
  });
});

Cypress.Commands.add("runApp", (appName) => {
  cy.searchApp(appName);
  cy.get(AppsTableSelector).contains("td", appName).should("be.visible");

  cy.get(AppNameInTableSelector).each(($e, index) => {
    const rowText = $e.text();
    cy.intercept("POST", "api/services/app/Apps/Run").as("refresh");
    if (rowText.includes(appName)) {
      cy.clickTableOnRowOfAction(AppsTableId, index, Actions.RunApp);
      cy.wait("@refresh").its("response.statusCode").should("eq", 200);
      cy.get(".toast-message").should("contain", "App Run.");
    }
  });
});

Cypress.Commands.add("createAppJob", (appName, appJobName) => {
  cy.get(AppsTableSelector).contains("td", appName).click();
  cy.get("span#SelectedAppJobRightTitle").should("contain.text", appName);
  cy.get(CreatAppJobSeletor).should("be.visible").click();
  cy.wait(3000);
  cy.get("input[name='JobName']").type(appJobName);
  cy.get('[data-ktwizard-type="action-next"]').click();
  cy.get('[data-ktwizard-type="action-next"]').click();
  cy.get('[data-ktwizard-type="action-next"]').click();
  cy.get('[data-ktwizard-type="action-next"]').click();
  cy.get('[data-ktwizard-type="action-next"]').click();
  cy.get(".kt-form__actions > .btn-success").click();
  cy.wait(3000);
  cy.get(AppJobsTableSelector).contains("td", appJobName).should("be.visible");
});

Cypress.Commands.add("deleteAppJob", (appJobName) => {
  cy.wait(1000);
  cy.get(AppJobsTableSelector).contains("td", appJobName).should("be.visible");

  cy.get(AppJobNameInTableSelector).each(($e, index) => {
    const rowText = $e.text();
    if (rowText.includes(appJobName)) {
      cy.get(AppJobNameInTableSelector)
        .eq(index)
        .find('a[name="DeleteAppJobLink"]')
        .click();
      cy.wait(1000);
      cy.get(".swal-overlay--show-modal").should("be.exist");
      cy.get("button.swal-button--confirm").click();
      // cy.get("button.swal-button--confirm").should("not.be.exist");
      cy.wait(3000);

      cy.get(AppJobsTableSelector)
        .contains("td", appJobName)
        .should("not.exist");
    }
  });
});

Cypress.Commands.add("editAppJob", (appJobName, editJobName) => {
  cy.wait(1000);
  cy.get(AppJobsTableSelector).contains("td", appJobName).should("be.visible");

  cy.get(AppJobNameInTableSelector).each(($e, index) => {
    const rowText = $e.text();
    if (rowText.includes(appJobName)) {
      cy.get(AppJobNameInTableSelector)
        .eq(index)
        .find('a[name="EditAppJobLink"]')
        .click();
      cy.wait(1000);
      cy.get("input[name='JobName']").should("be.visible");
      cy.get("input[name='JobName']").clear().type(editJobName);
      cy.get('[data-ktwizard-type="action-next"]').click();

      //doc temp
      cy.get("#btn-add-DocumentTemplate").click();
      //bootstrap tag, must in db
      cy.get(
        "#kt_wizard_form_step_1_form > .formblock > .kt-form__section > :nth-child(1) > :nth-child(2) > .form-control"
      ).type("documentName");
      cy.get(
        "#kt_wizard_form_step_1_form > .formblock > .kt-form__section > :nth-child(1) > :nth-child(3) > .form-control"
      ).type("documentURL");

      cy.get(
        "#kt_wizard_form_step_1_form > .formblock > .kt-form__section > :nth-child(1) > :nth-child(4) > .input-group > .form-control"
      ).type("Data[Transform_yn='true']");
      //allow word
      cy.get(
        "#kt_wizard_form_step_1_form > .formblock > .kt-form__section > :nth-child(1) > .mt-1 > .form-group > :nth-child(1) > span"
      ).click();
      cy.get(":nth-child(2) > .twitter-typeahead > .tt-input").type("admin");
      cy.get(".tt-suggestion").click();
      //allow pdf
      cy.get(".form-group > :nth-child(4) > span").click();
      cy.get(":nth-child(5) > .twitter-typeahead > .tt-input").type("admin");
      cy.get(".tt-suggestion").click();
      //allow html
      cy.get(":nth-child(7) > span").click();
      cy.get(":nth-child(8) > .twitter-typeahead > .tt-input").type("admin");
      cy.get(".tt-suggestion").click();

      //save records
      cy.get('[data-ktwizard-type="action-next"]').click();
      cy.get(
        "#kt_wizard_form_step_2_form > .form-group > .kt-checkbox > span"
      ).click();
      cy.get("#btn-add-RecordMatter").click();
      ////bootstrap tag, must in db
      cy.get(
        ":nth-child(3) > .bootstrap-tagsinput > .twitter-typeahead > .tt-input"
      ).type("test");
      cy.get(".tt-suggestion:nth-of-type(1)").click();
      cy.get(
        "#kt_wizard_form_step_2_form > .formblock > .kt-form__section > :nth-child(4) > .input-group > .form-control"
      ).type("testrecord");
      cy.get(
        "#kt_wizard_form_step_2_form > .formblock > .kt-form__section > :nth-child(5) > .input-group > .form-control"
      ).type("testmatter");
      cy.get(
        "#kt_wizard_form_step_2_form > .formblock > .kt-form__section > :nth-child(6) > .input-group > .form-control"
      ).type("testfolder");

      cy.get('[data-ktwizard-type="action-next"]').click();
      //before
      cy.get('[data-ktwizard-type="action-next"]').click();
      //after
      cy.get('[data-ktwizard-type="action-next"]').click();
      //email
      cy.get("#btn-add-Email").click();
      // cy.get('#kt_wizard_form_step_3_Email > .formblock > .active > :nth-child(8) > .kt-checkbox > span').click();
      cy.get(
        "#kt_wizard_form_step_3_Email > .formblock > .active > :nth-child(2) > .form-control"
      ).type("tong@gmail.com");
      cy.get(
        "#kt_wizard_form_step_3_Email > .formblock > .active > :nth-child(3) > .form-control"
      ).type("tong@gmail.com");
      cy.get(
        "#kt_wizard_form_step_3_Email > .formblock > .active > :nth-child(4) > .form-control"
      ).type("tong@gmail.com");
      cy.get(
        "#kt_wizard_form_step_3_Email > .formblock > .active > :nth-child(5) > .form-control"
      ).type("tong@gmail.com");
      cy.get(
        "#kt_wizard_form_step_3_Email > .formblock > .active > :nth-child(6) > .form-control"
      ).type("subject");

      //bootstrap tag, select the document templetes saved in the doc temple step2.
      cy.get(
        "#kt_wizard_form_step_3_Email > .formblock > .active > :nth-child(7) > .large"
      ).click();
      cy.wait(3000);
      cy.get("#TemplateTable_wrapper").should("be.visible");
      cy.get("#selectpdfbtn").click();
      cy.wait(3000);
      cy.get(
        "#kt_wizard_form_step_3_Email > .formblock > .active > :nth-child(8) > .kt-checkbox > span"
      ).click();
      //cy.get('#kt_wizard_form_step_3_Email > .formblock > .active > :nth-child(7) > .large').click();
      //add document templelates
      //cy.get(':nth-child(7) > .input-group > .bootstrap-tagsinput > input').type('documenttemp');
      cy.get(
        "#kt_wizard_form_step_3_Email > .formblock > .active > #PlainEmail > .form-control"
      ).type("emailbody");
      cy.get(
        "#kt_wizard_form_step_3_Email > .formblock > .active > #PlainEmail > .form-control"
      ).type("Data[val='true']");

      cy.get(".kt-form__actions > .btn-success").click();

      cy.wait(3000);

      cy.contains("td", editJobName).should("be.visible");
    }
  });
});

Cypress.Commands.add("checkEditAppJob", (editJobName) => {
  cy.wait(1000);

  cy.get(AppJobsTableSelector).contains("td", editJobName).should("be.visible");

  cy.get(AppJobNameInTableSelector).each(($e, index) => {
    const rowText = $e.text();
    if (rowText.includes(editJobName)) {
      cy.get(AppJobNameInTableSelector)
        .eq(index)
        .find('a[name="EditAppJobLink"]')
        .click();
      //cy.get(".kt-wizard-v2__form > :nth-child(1) > .form-control").should("contain",editJobName);
      cy.get('[data-ktwizard-type="action-next"]').click();

      //doc temp

      cy.get(
        ".kt-form__section.formblock > :nth-child(1) > :nth-child(2) > .form-control"
      ).should("have.value", "documentName");
      cy.wait(1000);
      cy.get(
        ".kt-form__section.formblock > :nth-child(1) > :nth-child(3) > .form-control"
      ).should("have.value", "documentURL");
      cy.wait(1000);
      cy.get(
        ".kt-form__section.formblock > :nth-child(1) > .input-group > .form-control"
      ).should("have.value", "Data[Transform_yn='true']");
      cy.wait(1000);
      cy.get("[name='Document[][AllowWord]']:first-child").should("be.checked"); //checkbox
      //cy.get('.kt-form__section.formblock > :nth-child(1) > .mt-1 > .form-group > :nth-child(1) > span').should('contain','::after');
      cy.wait(1000);
      cy.get(":nth-child(2) > .tag").should("contain", "admin");
      cy.wait(1000);
      cy.get(
        '.form-group > :nth-child(4) >[name="Document[][AllowPdf]"]'
      ).should("be.not.checked");
      //cy.get('.kt-form__section.formblock > :nth-child(1) > .mt-1 > .form-group > :nth-child(4) > span').should('have.css','::before');

      cy.wait(1000);
      cy.get('[name="Document[][AllowHTML]"]:first-child').should("be.checked");
      cy.wait(1000);
      cy.get(":nth-child(5) > .tag").should("contain", "admin");
      cy.wait(1000);

      //cy.get('.kt-form__section.formblock > :nth-child(1) > .mt-1 > .form-group > :nth-child(7) > span').should('have.css','::after');
      cy.wait(1000);
      cy.get(":nth-child(8) > .tag").should("contain", "admin");
      cy.wait(1000);

      //save records
      cy.get('[data-ktwizard-type="action-next"]').click();
      cy.wait(1000);
      //cy.get('#kt_wizard_form_step_2_form > .form-group > .kt-checkbox > span').should('have.css','after');
      //cy.get('#btn-add-RecordMatter').click();
      cy.wait(1000);
      cy.get(":nth-child(3) > .bootstrap-tagsinput > .tag").should(
        "contain",
        "Test"
      );
      cy.wait(1000);
      cy.get(
        "#kt_wizard_form_step_2_form > .formblock > .kt-form__section > :nth-child(4) > .input-group > .form-control"
      ).should("have.value", "testrecord");
      cy.wait(1000);
      cy.get(
        "#kt_wizard_form_step_2_form > .formblock > .kt-form__section > :nth-child(5) > .input-group > .form-control"
      ).should("have.value", "testmatter");
      cy.wait(1000);
      cy.get(
        "#kt_wizard_form_step_2_form > .formblock > .kt-form__section > :nth-child(6) > .input-group > .form-control"
      ).should("have.value", "testfolder");

      cy.get('[data-ktwizard-type="action-next"]').click();
      //before
      cy.get('[data-ktwizard-type="action-next"]').click();
      //after
      cy.get('[data-ktwizard-type="action-next"]').click();

      //email

      cy.wait(1000);
      cy.get(
        "#kt_wizard_form_step_3_Email > .formblock > .active > :nth-child(2) > .form-control"
      ).should("have.value", "tong@gmail.com");
      cy.wait(1000);
      cy.get(
        "#kt_wizard_form_step_3_Email > .formblock > .active > :nth-child(3) > .form-control"
      ).should("have.value", "tong@gmail.com");
      cy.wait(1000);
      cy.get(
        "#kt_wizard_form_step_3_Email > .formblock > .active > :nth-child(4) > .form-control"
      ).should("have.value", "tong@gmail.com");
      cy.wait(1000);
      cy.get(
        "#kt_wizard_form_step_3_Email > .formblock > .active > :nth-child(5) > .form-control"
      ).should("have.value", "tong@gmail.com");
      cy.wait(1000);
      cy.get(
        "#kt_wizard_form_step_3_Email > .formblock > .active > :nth-child(6) > .form-control"
      ).should("have.value", "subject");
      cy.wait(1000);
      //document attachment
      cy.get(".input-group > .bootstrap-tagsinput > .tag").should(
        "contain",
        "documentName.pdf"
      );
      cy.wait(1000);
      cy.get("[name='WorkFlow[]Email[][AttachFileUploads]']").should(
        "be.checked"
      );

      //cy.get('#kt_wizard_form_step_3_Email > .formblock > .active > :nth-child(8) > .kt-checkbox > span').should('have.css','::after');
      cy.wait(1000);
      cy.get(
        "#kt_wizard_form_step_3_Email > .formblock > .active > #PlainEmail > .form-control"
      ).should("contain", "emailbody");
      cy.wait(1000);
      cy.get(
        "#kt_wizard_form_step_3_Email > .formblock > .active > #PlainEmail > .form-control"
      ).should("have.value", "emailbodyData[val='true']");
      cy.wait(3000);
      cy.get(".close-button").click();
    }
  });
});
//   Cypress.Commands.add("editAppJob", (appJobName, editJobName) => {
//     cy.wait(1000);
//     cy.get(AppJobsTableSelector)
//       .contains("td", appJobName, { timeout: 10000 })
//       .should("be.visible");

//     cy.get(AppJobNameInTableSelector).each(($e, index) => {
//       const rowText = $e.text();
//       if (rowText.includes(appJobName)) {
//         cy.get(AppJobNameInTableSelector)
//           .eq(index)
//           .find('a[name="EditAppJobLink"]')
//           .click();
//         cy.wait(1000);
//         cy.get('.modal-dialog').should('be.visible');
//         cy.get('[data-ktwizard-type="action-next"]').click();
//         //doc temp
//         cy.get('[name="Document[][DocumentName]"]').type('documentName');
//         cy.get('[name="Document[][DocumentTemplateURL]"]').type('documentURL');
//         cy.get('[name="Document[][FilterRule]"]').type("Data[Transform_yn='true']");

//         cy.get('[name="Document[][AllowWord]"]').check().pause();
//         // cy.get('');
//         // cy.get('[name="Document[][AllowPdf]"]').check();
//         // cy.get('[name="Document[][AllowWord]"]').type('admin');

//         // cy.pause();
//         // cy.get('[data-ktwizard-type="action-next"]').click();
//         // cy.get('[data-ktwizard-type="action-next"]').click();
//         // cy.get('[data-ktwizard-type="action-next"]').click();
//         // cy.get('[data-ktwizard-type="action-next"]').click();
//         // cy.get(".kt-form__actions > .btn-success").click();
//         // cy.wait(3000);

//         // cy.contains("td", editJobName).should("be.visible");
//       }
//     });
// });
