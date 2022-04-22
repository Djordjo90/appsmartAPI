/// <reference types="Cypress" />
import "cypress-localstorage-commands";
import faker from 'faker';

let employee_id;
let isEmployeeCreated;

describe('Create employee API tests', () => {

    beforeEach(() => {
        cy.restoreLocalStorage()
        isEmployeeCreated = false;
    })

    afterEach(() => {
        if(isEmployeeCreated){
          cy.delete_employee(employee_id);
        }
    })

    it("Validate that employee can be created", function(){
        const name = faker.name;
        const salary = faker.datatype.number({'min': 20000,'max': 100000});
        const age = faker.datatype.number({'min': 10,'max': 50});

        cy.create_employee(name, salary, age)
        .should((resp) => {
          expect(resp.status).to.eq(200);
          expect(resp.body.status).to.eq("success");

          employee_id = resp.body.data.id;
          isEmployeeCreated = true;
        })
        .then(() => {
            cy.get_employee_by_id(employee_id)
            .should((response) => {
                expect(response.status).to.eq(200);
                expect(response.body.status).to.eq("success");
            })
        })
    })

    it("Validate that employee can be created without body", function(){

        cy.create_employee(null, null, null, true)
        .should((resp) => {
          expect(resp.status).to.eq(200);
          expect(resp.body.status).to.eq("success");

          employee_id = resp.body.data.id;
          isEmployeeCreated = true;
        })
        .then(() => {
            cy.get_employee_by_id(employee_id)
            .should((response) => {
                expect(response.status).to.eq(200);
                expect(response.body.status).to.eq("success");
            })
        })
    })

    //BUG, API RESPONSE IS 200 WHEN WE GET EMPLOYEE WITHOUT ID
    it("Validate that we cannot get employee without id", function(){

        cy.create_employee(null, null, null, true)
        .should((resp) => {
          expect(resp.status).to.eq(200);
          expect(resp.body.status).to.eq("success");

          employee_id = resp.body.data.id;
          isEmployeeCreated = true;
        })
        .then(() => {
            cy.get_employee_by_id()
            .should((response) => {
                expect(response.status).to.not.eq(200);
                expect(response.body.status).to.not.eq("success");
            })
        })
    })

    //IN JAVASCRIPT NULL AND UNDIFINED ARE NOT THE SAME, BECAUSE THAT WE HAVE THIS 2 TEST CASSES
    //ALSO BUG
    it("Validate that we cannot get employee by null id", function(){

        cy.create_employee(null, null, null, true)
        .should((resp) => {
          expect(resp.status).to.eq(200);
          expect(resp.body.status).to.eq("success");

          employee_id = resp.body.data.id;
          isEmployeeCreated = true;
        })
        .then(() => {
            cy.get_employee_by_id(null)
            .should((response) => {
                expect(response.status).to.not.eq(200);
                expect(response.body.status).to.not.eq("success");
            })
        })
    })

})