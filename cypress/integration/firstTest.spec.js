/// <reference types="cypress" />

const { chmodSync } = require("fs")
const { CtrCompleter } = require("ng2-completer")

describe("Our First suite", () => {
  
  it("first test", () => {
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

  it("second test", () => {
    
  })

  it("third test", () => {
    
  })
})