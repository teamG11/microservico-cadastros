import ClienteGateway from "@/Interfaces/Gataways/ClienteGateway";
import { ClienteTestRepository } from "@/Infrastructure/drivers/Repositories/TestsRepositories/ClienteTestRepository";
import { Cliente } from "@/Domain/Entities/Cliente";
import { beforeEach, describe, expect, it, vi } from "vitest";

describe("ClienteGateway", () => {
  let clienteRepository: ClienteTestRepository;
  let clienteGateway: ClienteGateway;

  beforeEach(() => {
    clienteRepository = new ClienteTestRepository();
    clienteGateway = new ClienteGateway(clienteRepository);
  });

  describe("saveAsync", () => {
    it("Deve salvar um cliente com sucesso", async () => {
      const cliente = new Cliente({
        nome: "Jane",
        sobrenome: "Doe",
        cpf: "98765432100",
      });

      const result = await clienteGateway.saveAsync(cliente);

      expect(result).toEqual(cliente);
      expect(clienteRepository.clientes).toContainEqual(cliente);
    });

    it("Deve falhar ao tentar salvar um cliente no repositório", async () => {
      const cliente = new Cliente({
        nome: "Jane",
        sobrenome: "Doe",
        cpf: "98765432100",
      });

      const saveAsyncSpy = vi
        .spyOn(clienteRepository, "saveAsync")
        .mockRejectedValue(new Error("Erro ao salvar cliente"));

      await expect(clienteGateway.saveAsync(cliente)).rejects.toThrow(
        "Erro ao salvar cliente"
      );

      saveAsyncSpy.mockRestore();
    });
  });

  describe("findByCPFAsync", () => {
    it("Deve encontrar um cliente por CPF com sucesso", async () => {
      const cliente = new Cliente({
        nome: "John",
        sobrenome: "Doe",
        cpf: "12345678901",
      });

      await clienteGateway.saveAsync(cliente);

      const result = await clienteGateway.findByCPFAsync("12345678901");

      expect(result).toEqual(cliente);
    });

    it("Deve retornar null se o cliente não for encontrado", async () => {
      const result = await clienteGateway.findByCPFAsync("nonexistentcpf");

      expect(result).toBeNull();
    });
  });
});
