import { ClienteTestRepository } from "@/Infrastructure/drivers/Repositories/TestsRepositories/ClienteTestRepository";
import { RegistroNaoEncontradoError } from "@/Application/errors/RegistroNaoEncontradoError";
import { BuscaClienteUseCase } from "@/Application/use-cases/clientes/BuscaClienteUseCase";
import { beforeEach, describe, expect, it } from "vitest";
import ClienteGateway from "@/Interfaces/Gataways/ClienteGateway";

let useCase: BuscaClienteUseCase;
let clienteGateway: ClienteGateway;

describe("BuscaCliente use case", () => {
  beforeEach(() => {
    const clienteRepository = new ClienteTestRepository();
    clienteGateway = new ClienteGateway(clienteRepository);
    useCase = new BuscaClienteUseCase(clienteGateway);
  });

  it("Deve encontrar cliente cadastrado", async () => {
    const cliente = {
      nome: "John",
      sobrenome: "Doe",
      cpf: "12345678901",
    };

    await clienteGateway.saveAsync(cliente);

    const { cliente: clienteResponse } = await useCase.executarAsync({
      cpf: cliente.cpf,
    });

    expect(clienteResponse.nome).toBe(cliente.nome);
    expect(clienteResponse.sobrenome).toBe(cliente.sobrenome);
    expect(clienteResponse.cpf).toBe(cliente.cpf);
  });

  it("Não deve encontrar cliente cadastrado", async () => {
    const cpfInexistente = "123";
    await expect(() =>
      useCase.executarAsync({ cpf: cpfInexistente })
    ).rejects.toBeInstanceOf(RegistroNaoEncontradoError);
  });
});
