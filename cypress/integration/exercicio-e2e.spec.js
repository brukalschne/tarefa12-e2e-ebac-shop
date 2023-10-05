/// <reference types="cypress" />
import Checkout from '../support/page_objects/faturamento.page'
const dadosFaturamento = require('../fixtures/faturamento.json')
var faker = require('faker');

context('Exercicio - Testes End-to-end - Fluxo de pedido', () => {
    /*  Como cliente 
        Quero acessar a Loja EBAC 
        Para fazer um pedido de 4 produtos 
        Fazendo a escolha dos produtos
        Adicionando ao carrinho
        Preenchendo todas opções no checkout
        E validando minha compra ao final */

    beforeEach(() => {
        cy.visit('produtos/')
    });

    it('Deve fazer um pedido na loja Ebac Shop usando Comandos customizados', () => {
        //Adicionando produtos ao carrinho
        cy.addProdutos('Atlas Fitness Tank', 'M', 'Blue', 1)
        cy.addProdutos('Atomic Endurance Running Tee (Crew-Neck)', 'S', 'Red', 1)
        cy.addProdutos('Atomic Endurance Running Tee (V-neck)', 'L', 'Green', 1)
        cy.addProdutos('Augusta Pullover Jacket', 'XL', 'Blue', 1)
        cy.get('.woocommerce-message > .button').click()
        cy.get('.checkout-button').click()

        //Preenchimento das informações de faturamento
        Checkout.detalhesFaturamento('Bruna', 'Daniela', 'EBAC', 'Brasil', 'Avenida Brasil', 'Santa Rosa', 'Rio Grande do Sul', '98920000', '55999654512', 'bruna@gmail.com')
        cy.get('.woocommerce-notice').should('contain', 'Obrigado. Seu pedido foi recebido.')
    });

    it('Deve fazer um pedido na loja Ebac Shop usando Arquivo de dados', () => {
        //Adicionando produtos ao carrinho
        cy.addProdutos('Atlas Fitness Tank', 'M', 'Blue', 1)
        cy.addProdutos('Atomic Endurance Running Tee (Crew-Neck)', 'S', 'Red', 1)
        cy.addProdutos('Atomic Endurance Running Tee (V-neck)', 'L', 'Green', 1)
        cy.addProdutos('Augusta Pullover Jacket', 'XL', 'Blue', 1)
        cy.get('.woocommerce-message > .button').click()
        cy.get('.checkout-button').click()

        //Preenchimento das informações de faturamento
        Checkout.detalhesFaturamento(
            dadosFaturamento[0].nome,
            dadosFaturamento[0].sobrenome,
            dadosFaturamento[0].empresa,
            dadosFaturamento[0].pais,
            dadosFaturamento[0].endereco,
            dadosFaturamento[0].cidade,
            dadosFaturamento[0].estado,
            dadosFaturamento[0].cep,
            dadosFaturamento[0].telefone,
            dadosFaturamento[0].email)
        cy.get('.woocommerce-notice').should('contain', 'Obrigado. Seu pedido foi recebido.')
    });

    it('Deve fazer um pedido na loja Ebac Shop usando dados faker', () => {
        //Adicionando produtos ao carrinho
        cy.addProdutos('Atlas Fitness Tank', 'M', 'Blue', 1)
        cy.addProdutos('Atomic Endurance Running Tee (Crew-Neck)', 'S', 'Red', 1)
        cy.addProdutos('Atomic Endurance Running Tee (V-neck)', 'L', 'Green', 1)
        cy.addProdutos('Augusta Pullover Jacket', 'XL', 'Blue', 1)
        cy.get('.woocommerce-message > .button').click()
        cy.get('.checkout-button').click()

        //Preenchimento das informações de faturamento
        let nomeFaker = faker.name.firstName()
        let sobrenomeFaker = faker.name.lastName()
        let empresaFaker = faker.company.companyName()
        let enderecoFaker = faker.address.streetAddress()
        let emailFaker = faker.internet.email()

        cy.dadosCheckout(nomeFaker, sobrenomeFaker, empresaFaker, 'Brasil', enderecoFaker, 'São Paulo', 'São Paulo', '25100333', '5535351212', emailFaker)
        cy.get('.woocommerce-notice').should('contain', 'Obrigado. Seu pedido foi recebido.')
    });


})
