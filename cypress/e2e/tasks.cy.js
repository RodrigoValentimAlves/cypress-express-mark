/// <reference types="cypress" />

import {faker} from '@faker-js/faker'

describe('tasks', () => {

    it('deve cadastrar uma nova tarefa', () => {
        cy.visit('localhost:3000')

        cy.title().should('eq', 'Gerencie suas tarefas com Mark L')

        cy.get('input[placeholder="Add a new Task"]').type(faker.music.songName())

        cy.contains('button', 'Create').click()

        cy.get('body').click()
    }) 
})