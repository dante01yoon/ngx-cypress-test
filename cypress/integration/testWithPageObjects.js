import { navigateTo } from "../support/page_objects/navigationPage";

describe("Test with Page Objects", () => {
  beforeEach('open application', () => {
    cy.visit('/');
  })

  it('verify navitaions across the pages', () => {
    navigateTo.formLayoutsPage();
    navigateTo.datepickerPage();
  })
})