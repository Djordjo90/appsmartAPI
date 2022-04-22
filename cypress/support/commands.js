// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

Cypress.Commands.add("get_all_employees", function(failOnStatusCode){ 
    cy.request({
        method: 'GET',
        url: `/employees`,
        failOnStatusCode: (typeof failOnStatusCode === 'undefined') ? true : failOnStatusCode,
      })
    .then((resp) => {
        return resp
    })
})

Cypress.Commands.add("get_employee_by_id", function(id, failOnStatusCode){ 
    cy.request({
        method: 'GET',
        url: `/employee/${id}`,
        failOnStatusCode: (typeof failOnStatusCode === 'undefined') ? true : failOnStatusCode,
      })
    .then((resp) => {
        return resp
    })
})

Cypress.Commands.add("create_employee", function(name, salary, age, failOnStatusCode){ 
    cy.request({
        method: 'POST',
        url: `/create`,
        failOnStatusCode: (typeof failOnStatusCode === 'undefined') ? true : failOnStatusCode,
        body: {
            "employee_name": name,
            "employee_salary": salary,
            "employee_age": age
        }
      })
    .then((resp) => {
        return resp
    })
})

Cypress.Commands.add("delete_employee", function(id, failOnStatusCode) {
    cy.request({
      method: "DELETE", 
      url: `/delete/${id}`,
      failOnStatusCode: (typeof failOnStatusCode === 'undefined') ? true : failOnStatusCode,
    })
    .then((resp) => {
    return resp
    })
  })
