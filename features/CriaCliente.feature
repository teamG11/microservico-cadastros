Feature: Criar cliente

    Scenario: Um novo cliente é criado
        Given um novo cliente quer se cadastrar
        When uma nova solicitação de criação de cliente é recebida
        Then eu devo criar um novo cliente com sucesso e receber status 201 como retorno
