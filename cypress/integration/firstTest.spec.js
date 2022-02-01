/// <reference types="cypress" />

const { _ } = require("core-js")
const { chmodSync } = require("fs")
const { CtrCompleter } = require("ng2-completer")

describe("Our First suite", () => {
  
  it.skip("first test", () => {
    cy.visit('/')
    cy.contains("Forms").click()
    cy.contains("Form Layouts").click()

    // by Tag Name
    cy.get("input")

    // by ID
    cy.get("#inputEmail");

    // by class name
    cy.get(".input-full-width");

    // by attribute name
    cy.get("[placeholder]");

    // by attribute name and value
    cy.get("[placeholder='Email']")

    // by class value
    cy.get('[class="input-full-width size-medium shape-rectangle"]')
    
    // by tag name and attribute with value
    cy.get('input[placeholder="Email"]')

    // by two different attributes
    cy.get('[placeholder="Email"][fullWidth][type="email"]')

    // by tag name, attriute with value, ID and Class name
    cy.get('input[placeholder="Email"]#inputEmail1')

    // the most recommended way in cypress
    cy.get('[data-cy="imputEmail"]')
  })

  it.skip("second test", () => {
    cy.visit('/')
    cy.contains("Forms").click()
    cy.contains("Form Layouts").click()

    cy.get('[data-cy="signInButton"]');

    cy.contains('Sign in');

    cy.contains("[status='warning']","Sign in")

    cy.get('#inputEmail3')
      .parents('form')
      .find('button')
      .should('contain', 'Sign in')
      .parents('form')
      .find('nb-checkbox')
      .click()

    cy.contains('nb-card','Horizontal form').find('[type="email"]')

  })

  it.skip("then and wrap methods", () => {
    cy.visit('/')
    cy.contains("Forms").click()
    cy.contains("Form Layouts").click()

    cy.contains('nb-card', "Using the Grid")
      .find('[for="inputEmail1"]')
      .should('contain', 'Email')

    cy.contains('nb-card', 'Using the Grid')
      .find('[for="inputPassword2"]')
      .should('contain', "Password")

    cy.contains('nb-card', 'Basic form')
    .find('[for="exampleInputEmail1"]')
    .should('contain', "Email address")
    
    cy.contains('nb-card', 'Basic form')
    .find('[for="exampleInputPassword1"]')
    .should('contain', "Password")

    // selenium style - not works like this
    // const firstForm = cy.contains('nb-card', "Using the Grid");
    // const secondForm = cy.contains('nb-card', "Basic form");

    // firstForm.find('[for="inputEmail1"]').should('contain', 'Email');
    // firstForm.find('[for="inputPassword2"]').should('contain', 'Password');
    // secondForm.find('[for="exampleInputEmail1"]').should('contain', 'Email address');

    // cypress style
    cy.contains('nb-card', 'Using the Grid')
      .then((firstForm) => { // firstForm is jQuery Object
        const emailLabelFirst = firstForm.find('[for="inputEmail1"]').text();
        const passwordLabelFirst = firstForm.find('[for="inputPassword2"]').text();
        expect(emailLabelFirst).to.equal('Email');
        expect(passwordLabelFirst).to.equal("Password");

        cy.contains('nb-card', 'Basic form')
          .then(secondForm => {
            const passwordSecondText = secondForm.find('[for="exampleInputPassword1"]').text();
            expect(passwordLabelFirst).to.equal(passwordSecondText)

            cy.wrap(secondForm).find('[for="exampleInputPassword1"]').should('contain', "Password")
          })
      })

    // end of it
  })

  it.skip("invoke command", () => {
    cy.visit("/");
    cy.contains("Forms").click();
    cy.contains("Form Layouts").click();

    // 1
    cy.get('[for="exampleInputEmail1"]')
      .should("contain", "Email address")
      .should('have.class', 'label')
      .and('have.text', 'Email address');

    // 2
    cy.get('[for="exampleInputEmail1"]')
      .then( label => {
        expect(label.text()).to.equal("Email address")
        expect(label).to.have.class('label')
        expect(label).to.have.text('Email address')
      });
    
    // 3
    cy.get('[for="exampleInputEmail1"]')
      .invoke('text')
      .then(text => {
        expect(text).to.equal("Email address")
      })

    cy.contains('nb-card', "Basic form")
      .find("nb-checkbox")
      .click()
      .find('.custom-checkbox')
      .invoke('attr', 'class')
      // .should('contain', 'checked')
      .then(classValue => {
        expect(classValue).to.contain("checked")
      })

      // end of it
  });

  it.skip('assert property', () => {
    cy.visit("/");
    cy.contains("Forms").click();
    cy.contains("Datepicker").click();

    

  });

  it.skip('radio button', () => {
    cy.visit("/");
    cy.contains('Forms').click();
    cy.contains('Form Layout').click();

    cy.contains('nb-card', 'Using the Grid')
      .find('[type="radio"]')
      .then(radioButtons => {
        cy.wrap(radioButtons)
          .first()
          .check({force: true})
          .should('be.checked')

        cy.wrap(radioButtons)
          .eq(1)
          .check({ force: true})
        
        cy.wrap(radioButtons)
          .first()
          .should('not.be.checked')
        
        cy.wrap(radioButtons)
          .eq(2)
          .should('be.disabled')
      })
    // end of it
  })

  it.skip('check boxes', () => {
    cy.visit('/');
    cy.contains('Modal & Overlays').click();
    cy.contains('Toastr').click();

    // cy.get('[type="checkbox"]').check({force: true});
    cy.get('[type="checkbox"]').eq(0).click({force: true})
    cy.get('[type="checkbox"]').eq(1).check({force: true})
  })

  it.skip('lists and dropdowns', () => {
    cy.visit('/');
    // 1
    // cy.get('nav nb-select').click();
    // cy.get('.options-list').contains('Dark').click()
    // cy.get('nav nb-select').should('contain', 'Dark')
    // cy.get('nb-layout-header nav').should('have.css', 'background-color', 'rgb(34, 43, 69')

    // 2
    cy.get('nav nb-select')
      .then(dropdown => {
        cy.wrap(dropdown).click();
        cy.get('.options-list nb-option')
          .each((listItem,index) => {
            const itemText = listItem.text().trim();
            
            const colors = {
              "Light": "rgb(255, 255, 255)",
              "Dark": "rgb(34, 43, 69)",
              "Cosmic": "rgb(50, 50, 89)",
              "Corporate": "rgb(255, 255, 255)",
            }

            cy.wrap(listItem).click();
            cy.wrap(dropdown).should('contain', itemText)
            cy.get('nb-layout-header nav').should('have.css', 'background-color', colors[itemText])
            
            if( index < 3 ) {
              cy.wrap(dropdown).click();
            }
          })
      })
    // end of it
  })

  it.skip("Web tables", () => {
    cy.visit('/');
    cy.contains('Tables & Data').click();
    cy.contains('Smart Table').click();
  
    // 1
    // cy.get('tbody')
    //   .contains('tr', 'Larry')
    //   .then(tableRow => {
    //     cy.wrap(tableRow).find('.nb-edit').click()
    //     cy.wrap(tableRow).find('[placeholder="Age"]').type('25');
    //     cy.wrap(tableRow).find('.nb-checkmark').click()
    //     cy.wrap(tableRow).find('td').eq(6).should('contain', '25')
    //   });
    
    // 2
    // cy.get('thead').find('.nb-plus').click();
    // cy.get('thead').find('tr').eq(2).then(tableRow => {
    //   cy.wrap(tableRow).find('[placeholder="First Name"]').type('Artem')
    //   cy.wrap(tableRow).find('[placeholder="Last Name"]').type('Bondar')
    //   cy.wrap(tableRow).find('.nb-checkmark').click();
    // })
    // cy.get('tbody tr').first().find('td').then(tableColumns => {
    //   cy.wrap(tableColumns).eq(2).should('contain', 'Artem');
    //   cy.wrap(tableColumns).eq(3).should('contain', 'Bondar');
    // })

    // 3
    const age = [20, 30, 40, 200];

    cy.wrap(age).each( age => {
      cy.get('thead [placeholder="Age"]').clear().type(age);
      cy.wait(500)
      cy.get('tbody tr')
        .each((tableRow) => {
          if(age === 200) {
            cy.wrap(tableRow).should('contain', 'No data found')
          } else {
            cy.wrap(tableRow).find('td').eq(6).should('contain', age);
          }
        })
    })

    
    // end of it
  });

  it.skip("assert property", () => {
    cy.visit("/");
    cy.contains("Forms").click();
    cy.contains("Datepicker").click();

    let date = new Date();
    date.setDate(date.getDate() + 2);
    let futureDay = date.getDate();
    let futureMonth = date.toLocaleString('default', {month: 'short'});
    let dateAssert = futureMonth+' '+futureDay+', '+date.getFullYear();
    
    cy.contains('nb-card', 'Common Datepicker')
      .find('input')
      .then(input => {
        cy.wrap(input).click();
        selectDayFromCurrent();

        function selectDayFromCurrent() {
          cy.get('nb-calendar-navigation')
          .invoke('attr', 'ng-reflect-date')
          .then(dateAttribute => {
            if(!dateAttribute.includes(futureMonth)) {
              cy.get('[data-name="chevron-right"]').click()
              cy.get('nb-calendar-day-picker [class="day-cell ng-star-inserted"]').contains(futureDay).click();
            }
            else {
              cy.get('nb-calendar-day-picker [class="day-cell ng-star-inserted"]').contains(futureDay).click();
            }
          })
        }
      })

    cy.wrap(input).invoke('prop', 'value').should('contain', dateAssert);
    // cy.wrap(input).should('have.value', dateAssert);
    // end of it
  })

  it.skip("popup and tooltip", () => {
    cy.visit('/');
    cy.contains("Modal & Overlays").click();
    cy.contains("Tooltip").click();

    cy.contains('nb-card', 'Colored Tooltips')
      .contains('Default').click();
    cy.get('nb-tooltip').should('contain', 'This is a tooltip');

  });

  it.skip('dialog box', () => {
    cy.visit('/');
    cy.contains('Tables & Data').click();
    cy.contains('Smart Table').click();
    // 1
    // cy.get('tbody tr').first().find('.nb-trash').click()
    // cy.on('window:confirm', (confirm) => {
    //   expect(confirm).to.equal('Are you sure you wan to delete?');
    // })

    // 2
    // if this window event is not triggered, it will cause error, gives right asssertion 
    // const stub = cy.stub()
    // cy.on('window:confirm', stub);
    // cy.get('tbody tr')
    //   .first()
    //   .find('.nb-trash')
    //   .click()
    //   .then(() => {
    //     expect(stub.getCall(0)).to.be.calledWith('Are you sure you wan to delete?')
    //   })

    // 3 select cancel
    cy.get('tbody tr').first().find('.nb-trash').click();
    cy.on('window:confirm', () => false);

    // end of it
   })

   it.skip("assertions", () => {

   })

  // end of describe
})