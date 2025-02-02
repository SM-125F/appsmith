const widgetsPage = require("../../../../locators/Widgets.json");
const commonlocators = require("../../../../locators/commonlocators.json");
const dsl = require("../../../../fixtures/newFormDsl.json");
const homePage = require("../../../../locators/HomePage.json");
const pages = require("../../../../locators/Pages.json");
const publishPage = require("../../../../locators/publishWidgetspage.json");
const modalWidgetPage = require("../../../../locators/ModalWidget.json");
const datasource = require("../../../../locators/DatasourcesEditor.json");
const queryLocators = require("../../../../locators/QueryEditor.json");

describe("Button Widget Functionality", function() {
  before(() => {
    cy.addDsl(dsl);
  });

  beforeEach(() => {
    cy.openPropertyPane("buttonwidget");
  });

  it("Button-AlertModal Validation", function() {
    //creating the Alert Modal and verify Modal name
    cy.createModal("Alert Modal", this.data.AlertModalName);
    cy.PublishtheApp();
    cy.get(publishPage.buttonWidget).click();
    cy.get(modalWidgetPage.modelTextField).should(
      "have.text",
      this.data.AlertModalName,
    );
  });

  it("Button-FormModal Validation", function() {
    //creating the Form Modal and verify Modal name
    cy.updateModal("Form Modal", this.data.FormModalName);
    cy.PublishtheApp();
    cy.get(publishPage.buttonWidget).click();
    cy.get(modalWidgetPage.modelTextField).should(
      "have.text",
      this.data.FormModalName,
    );
  });

  it("Button-CallAnApi Validation", function() {
    //creating an api and calling it from the onClickAction of the button widget.
    // Creating the api
    cy.NavigateToAPI_Panel();
    cy.CreateAPI("buttonApi");
    cy.log("Creation of buttonApi Action successful");
    cy.enterDatasourceAndPath(this.data.paginationUrl, "users?page=4&size=3");
    cy.SaveAndRunAPI();

    // Going to HomePage where the button widget is located and opeing it's property pane.
    cy.get(widgetsPage.NavHomePage).click({ force: true });
    cy.reload();
    cy.openPropertyPane("buttonwidget");

    // Adding the api in the onClickAction of the button widget.
    cy.addAPIFromLightningMenu("buttonApi");
    // Filling the messages for success/failure in the onClickAction of the button widget.
    cy.onClickActions("Success", "Error");

    cy.PublishtheApp();

    // Clicking the button to verify the success message
    cy.get(publishPage.buttonWidget).click();
    cy.get(widgetsPage.apiCallToast).should("have.text", "Success");
  });

  it("Button-Call-Query Validation", function() {
    //creating a query and calling it from the onClickAction of the button widget.
    // Creating a mock query
    // cy.CreateMockQuery("Query1");
    let postgresDatasourceName;

    cy.startRoutesForDatasource();
    cy.NavigateToDatasourceEditor();
    cy.get(datasource.PostgreSQL).click();
    cy.generateUUID().then((uid) => {
      postgresDatasourceName = uid;

      cy.get(".t--edit-datasource-name").click();
      cy.get(".t--edit-datasource-name input")
        .clear()
        .type(postgresDatasourceName, { force: true })
        .should("have.value", postgresDatasourceName)
        .blur();
    });
    cy.wait("@saveDatasource").should(
      "have.nested.property",
      "response.body.responseMeta.status",
      200,
    );
    cy.fillPostgresDatasourceForm();
    cy.saveDatasource();

    cy.CreateMockQuery("Query1");

    // Going to HomePage where the button widget is located and opeing it's property pane.
    cy.get(widgetsPage.NavHomePage).click({ force: true });
    cy.reload();
    cy.openPropertyPane("buttonwidget");

    // Adding the query in the onClickAction of the button widget.
    cy.addQueryFromLightningMenu("Query1");
    // Filling the messages for success/failure in the onClickAction of the button widget.
    cy.onClickActions("Success", "Error");

    cy.PublishtheApp();

    // Clicking the button to verify the success message
    cy.get(publishPage.buttonWidget).click();
    cy.get(widgetsPage.apiCallToast).should("have.text", "Success");
  });

  it("Toggle JS - Button-CallAnApi Validation", function() {
    //creating an api and calling it from the onClickAction of the button widget.
    // calling the existing api
    cy.get(widgetsPage.toggleOnClick).click({ force: true });
    cy.testJsontext(
      "onclick",
      "{{buttonApi.run(() => showAlert('Success','success'), () => showAlert('Error','error'))}}",
    );

    cy.PublishtheApp();

    // Clicking the button to verify the success message
    cy.get(publishPage.buttonWidget).click();
    cy.get(widgetsPage.apiCallToast).should("have.text", "Success");
  });

  it("Toggle JS - Button-Call-Query Validation", function() {
    //creating a query and calling it from the onClickAction of the button widget.
    // Creating a mock query
    cy.testJsontext(
      "onclick",
      "{{Query1.run(() => showAlert('Success','success'), () => showAlert('Error','error'))}}",
    );

    cy.PublishtheApp();

    // Clicking the button to verify the success message
    cy.get(publishPage.buttonWidget).click();
    cy.get(widgetsPage.apiCallToast).should("have.text", "Success");
  });

  afterEach(() => {
    cy.goToEditFromPublish();
  });
});
