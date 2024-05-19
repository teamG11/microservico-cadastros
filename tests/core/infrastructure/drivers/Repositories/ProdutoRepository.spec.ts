import { describe, it, expect, beforeEach, vi } from "vitest";
import ProdutoRepository from "@/Infrastructure/drivers/Repositories/ProdutoRepository";
import { prisma } from "@/Infrastructure/lib/prisma";
import { CategoriaProduto } from "@/Domain/Enums/CategoriaProduto";

vi.mock("@/Infrastructure/lib/prisma", () => ({
  prisma: {
    produto: {
      findFirst: vi.fn(),
      create: vi.fn(),
      update: vi.fn(),
      findMany: vi.fn(),
      delete: vi.fn(),
    },
  },
}));

describe("ProdutoRepository", () => {
  let repository: ProdutoRepository;

  beforeEach(() => {
    vi.clearAllMocks();
    repository = new ProdutoRepository();
  });

  it("deve encontrar um produto por ID corretamente", async () => {
    const produtoData = {
      id: 1,
      nome: "Ketchup",
      descricao: "Ketchup Heinz Tradicional 1,033KG",
      categoria: CategoriaProduto.acompanhamento,
      valor: 19.79,
      disponivel: true,
      created_at: new Date(),
      updated_at: new Date(),
    };

    vi.mocked(prisma.produto.findFirst).mockResolvedValue(produtoData);

    const result = await repository.findByIdAsync(produtoData.id);
    expect(prisma.produto.findFirst).toHaveBeenCalledWith({
      where: { id: produtoData.id },
    });
    expect(result).toEqual(produtoData);
  });

  it("deve criar um produto corretamente", async () => {
    const produtoData = {
      id: 1,
      nome: "Ketchup",
      descricao: "Ketchup Heinz Tradicional 1,033KG",
      categoria: CategoriaProduto.acompanhamento,
      valor: 19.79,
      disponivel: true,
      created_at: new Date(),
      updated_at: new Date(),
    };

    vi.mocked(prisma.produto.create).mockResolvedValue(produtoData);

    const result = await repository.saveAsync(produtoData);
    expect(prisma.produto.create).toHaveBeenCalledWith({ data: produtoData });
    expect(result).toEqual(produtoData);
  });

  it("deve encontrar um produto pelo nome corretamente", async () => {
    const produtoData = {
      id: 1,
      nome: "Ketchup",
      descricao: "Ketchup Heinz Tradicional 1,033KG",
      categoria: CategoriaProduto.acompanhamento,
      valor: 19.79,
      disponivel: true,
      created_at: new Date(),
      updated_at: new Date(),
    };
    vi.mocked(prisma.produto.findFirst).mockResolvedValue(produtoData);

    const result = await repository.findByNomeAsync(produtoData.nome);
    expect(prisma.produto.findFirst).toHaveBeenCalledWith({
      where: { nome: produtoData.nome },
    });
    expect(result).toEqual(produtoData);
  });

  it("deve atualizar um produto corretamente", async () => {
    const produtoData = {
      id: 1,
      nome: "Ketchup",
      descricao: "Ketchup Heinz Tradicional 1,033KG",
      categoria: CategoriaProduto.acompanhamento,
      valor: 23.99,
      disponivel: true,
      created_at: new Date(),
      updated_at: new Date(),
    };

    const produtoAtualizado = {
      nome: produtoData.nome,
      descricao: produtoData.descricao,
      categoria: produtoData.categoria,
      valor: produtoData.valor,
      disponivel: produtoData.disponivel,
    };

    vi.mocked(prisma.produto.update).mockResolvedValue(produtoData);

    const result = await repository.updateAsync(produtoData);
    expect(prisma.produto.update).toHaveBeenCalledWith({
      where: { id: produtoData.id },
      data: produtoAtualizado,
    });
    expect(result).toEqual(produtoData);
  });

  it("deve encontrar todos os produtos corretamente", async () => {
    const produtoData1 = {
      id: 1,
      nome: "Ketchup",
      descricao: "Ketchup Heinz Tradicional 1,033KG",
      categoria: CategoriaProduto.acompanhamento,
      valor: 19.79,
      disponivel: true,
      created_at: new Date(),
      updated_at: new Date(),
    };
    const produtoData2 = {
      id: 1,
      nome: "Mostarda",
      descricao: "Mostarda Hikari 200 G",
      categoria: CategoriaProduto.acompanhamento,
      valor: 7.36,
      disponivel: true,
      created_at: new Date(),
      updated_at: new Date(),
    };
    const produtosData = [produtoData1, produtoData2];

    vi.mocked(prisma.produto.findMany).mockResolvedValue(produtosData);

    const result = await repository.findAllAsync();
    expect(result).toEqual(produtosData);
  });

  it("deve remover um produto corretamente", async () => {
    const produtoData = {
      id: 1,
      nome: "Ketchup",
      descricao: "Ketchup Heinz Tradicional 1,033KG",
      categoria: CategoriaProduto.acompanhamento,
      valor: 23.99,
      disponivel: true,
      created_at: new Date(),
      updated_at: new Date(),
    };

    vi.mocked(prisma.produto.delete).mockResolvedValue(produtoData);

    await repository.removeAsync(produtoData.id);

    expect(prisma.produto.delete).toHaveBeenCalledWith({
      where: { id: produtoData.id },
    });
  });

  it("deve encontrar produtos pela sua categoria corretamente", async () => {
    const produtoData1 = {
      id: 1,
      nome: "Ketchup",
      descricao: "Ketchup Heinz Tradicional 1,033KG",
      categoria: CategoriaProduto.acompanhamento,
      valor: 19.79,
      disponivel: true,
      created_at: new Date(),
      updated_at: new Date(),
    };
    const produtoData2 = {
      id: 1,
      nome: "Mostarda",
      descricao: "Mostarda Hikari 200 G",
      categoria: CategoriaProduto.acompanhamento,
      valor: 7.36,
      disponivel: true,
      created_at: new Date(),
      updated_at: new Date(),
    };
    const produtoData3 = {
      id: 1,
      nome: "Refrigerante",
      descricao: "Refrigerante Jesus 1L",
      categoria: CategoriaProduto.bebida,
      valor: 13.98,
      disponivel: true,
      created_at: new Date(),
      updated_at: new Date(),
    };
    const produtosData = [produtoData1, produtoData2, produtoData3];
    vi.mocked(prisma.produto.findMany).mockResolvedValue(produtosData);

    await repository.findByCategoriaAsync(CategoriaProduto.acompanhamento);

    expect(prisma.produto.findMany).toHaveBeenCalledWith({
      where: { categoria: CategoriaProduto.acompanhamento },
    });
  });
});
