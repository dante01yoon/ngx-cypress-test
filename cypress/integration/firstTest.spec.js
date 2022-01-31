/// <reference types="cypress" />

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

  it("invoke command", () => {
    cy.visit("/");
    cy.contains("Forms").click();
    cy.contains("Form Layouts").click();

    // 1
    cy.get('[for="exampleInputEmail1"]')
      .should("contain", "Email address")

    // 2
    cy.get('[for="exampleInputEmail1"]')
      .then( label => {
        expect(label.text()).to.equal("Email address")
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

  it.only('assert property', () => {
    cy.visit("/");
    cy.contains("Forms").click();
    cy.contains("Datepicker").click();

    cy.contains('nb-card', 'Common Datepicker')
      .find('input')
      .then(input => {
        cy.wrap(input).click();
        cy.get('nb-calendar-day-picker').contains('17').click();
        cy.wrap(input).invoke('prop', 'value').should('contain', 'Jan 17, 2022')
      })

  });

  // end of describe
})