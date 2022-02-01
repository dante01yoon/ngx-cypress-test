class DatePickerPage {
  selectCommonDatepickerDateFormToday(){
    cy.contains('nb-card', 'Common Datepicker')
      .find('input')
      .then(input => {
        cy.wrap(input).click();
        cy.get('nb-calendar-day-picker').contains('17').click();
        cy.wrap(input).invoke('prop', 'value').should('contain', 'Jan 17, 2022')
      })
  }
}

export const onDatePickerPage = new DatePickerPage();