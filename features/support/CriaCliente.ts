import { Request, Response } from "express"
import { createResponse } from 'node-mocks-http';
const { ClienteTestRepository } = require( '../../src/Infrastructure/drivers/Repositories/TestsRepositories/ClienteTestRepository')
const { ClienteController } = require('../../src/Interfaces/controllers/ClienteController')
const assert = require('assert')
const { Given, When, Then } = require('@cucumber/cucumber')
const clienteRepositoryTest = new ClienteTestRepository()
const clienteController = new ClienteController(clienteRepositoryTest)
const mockRequest: Partial<Request> = {
    body: {
        nome: "John",
        sobrenome: "Doe",
        cpf: "12345678901",
    },
};
const mockResponse = createResponse();

Given('um novo cliente quer se cadastrar', () => {
})


When("uma nova solicitação de criação de cliente é recebida", async () => {
    await clienteController.criar(
        mockRequest as Request,
        mockResponse as Response,
        function mock() {}
    );
})


Then("eu devo criar um novo cliente com sucesso e receber status 201 como retorno", () => {
    assert(mockResponse._getStatusCode() === 201)
})
