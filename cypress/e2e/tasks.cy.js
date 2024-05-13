/// <reference types="cypress" />

describe('tasks', () => {
    context('cadastro', () => {
        it('deve cadastrar uma nova tarefa', () => {

            const taskName = 'Ler livro de Node.js'
    
            cy.removeTasksByName(taskName)
            cy.createTask(taskName)
    
            cy.contains('main div p', taskName)
                .should('be.visible')
        })
    
        it('não deve permitir tarefa duplicada', () => {
    
    
            const task = {
                name: 'Ler livro de Js',
                is_done: false
            }
    
            cy.removeTasksByName(task.name)
            cy.postTask(task)
            cy.createTask(task.name)
    
            cy.get('.swal2-html-container')
                .should('be.visible')
                .should('have.text', 'Task already exists!')
    
        })
    
        it('campo obrigatorio', () => {
            cy.createTask()
    
            cy.isRequired('This is a required field')
        })
    })
    context('atualização', () => {
        it('deve concluir uma tarefa', () => {
            const task = {
                name : 'Ler livro de Node.js',
                is_done: false
            }
            

            cy.removeTasksByName(task.name)
            cy.postTask(task)

            cy.visit('http://localhost:3000')

            cy.contains('p', task.name)
                .parent()
                .find('button[class*=ItemToggle]')
                .click()

                cy.contains('p', task.name)
                .should('have.css', 'text-decoration-line', 'line-through')
        })
    })
    context('exclusão', () => {
        it('deve remover uma tarefa', () => {
            const task = {
                name : 'Ler livro de Node.js',
                is_done: false
            }
            

            cy.removeTasksByName(task.name)
            cy.postTask(task)

            cy.visit('http://localhost:3000')

            cy.contains('p', task.name)
                .parent()
                .find('button[class*=ItemDelete]')
                .click()

                cy.contains('p', task.name)
                .should('not.exist')
        })
    })
})