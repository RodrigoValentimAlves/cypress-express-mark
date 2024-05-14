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
Cypress.Commands.add('createTask', (taskName = '') => {
    cy.visit('/')

    cy.get('input[placeholder="Add a new Task"]').as('inputTask')

    if (taskName !== '') {
        cy.get('@inputTask')
            .type(taskName)
    }
    cy.title().should('eq', 'Gerencie suas tarefas com Mark L')

    cy.contains('button', 'Create').click()

    cy.get('body').click()
})
Cypress.Commands.add('isRequired', (targetMessage) => {

    cy.get('@inputTask')
            .invoke('prop', 'validationMessage')
            .should((text) => {
                expect(
                    targetMessage
                ).to.eq(text)
            })
})

Cypress.Commands.add('removeTasksByName', (taskName) => {
    cy.request({
        url: Cypress.env('apiUrl') + '/helper/tasks',
        method: 'DELETE',
        body: { name: taskName }
    }).then(response => {
        expect(response.status).to.equal(204)
    })

})

Cypress.Commands.add('postTask', (task) => {
    cy.request({
        url: Cypress.env('apiUrl') + '/tasks',
        method: 'POST',
        body: task
    }).then(response => {
        expect(response.status).to.equal(201)
    })

})