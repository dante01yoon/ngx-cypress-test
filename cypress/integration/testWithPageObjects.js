import { onFormLayoutsPage } from "../support/page_objects/formLayoutsPage";
import { navigateTo } from "../support/page_objects/navigationPage";

describe("Test with Page Objects", () => {
  beforeEach('open application', () => {
    cy.visit('/');
  })

  it('verify navitaions across the pages', () => {
    navigateTo.formLayoutsPage();
    navigateTo.datepickerPage();
  })

  it('should submit Inline and Basic form and select tomorrow date in the calendar', () => {
    navigateTo.formLayoutsPage();
    onFormLayoutsPage.submitInlineFormWithNameAndEmail('Artem', "test@test.com")
    navigateTo.datepickerPage();
  })
})