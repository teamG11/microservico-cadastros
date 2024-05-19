import { describe, it, expect, beforeEach, vi } from "vitest";
import ClienteRepository from "@/Infrastructure/drivers/Repositories/ClienteRepository";
import { prisma } from "@/Infrastructure/lib/prisma";

vi.mock("@/Infrastructure/lib/prisma", () => ({
  prisma: {
    cliente: {
      create: vi.fn(),
      findUnique: vi.fn(),
    },
  },
}));

describe("ClienteRepository", () => {
  let repository: ClienteRepository;

  beforeEach(() => {
    vi.clearAllMocks();
    repository = new ClienteRepository();
  });

  it("Deve cadastrar cliente corretamente", async () => {
    const clienteData = {
      id: 1,
      nome: "João",
      sobrenome: "Ninguém",
      cpf: "85571161019",
      created_at: new Date(),
      updated_at: new Date(),
    };

    vi.mocked(prisma.cliente.create).mockResolvedValue(clienteData);

    const result = await repository.saveAsync(clienteData);
    expect(prisma.cliente.create).toHaveBeenCalledWith({ data: clienteData });
    expect(result).toEqual(clienteData);
  });

  it("Deve encontrar cliente pelo CPF corretamente", async () => {
    const clienteData = {
      id: 1,
      nome: "João",
      sobrenome: "Ninguém",
      cpf: "85571161019",
      created_at: new Date(),
      updated_at: new Date(),
    };

    vi.mocked(prisma.cliente.findUnique).mockResolvedValue(clienteData);

    const result = await repository.findByCPFAsync(clienteData.cpf);
    expect(prisma.cliente.findUnique).toHaveBeenCalledWith({
      where: { cpf: clienteData.cpf },
    });
    expect(result).toEqual(clienteData);
  });
});
