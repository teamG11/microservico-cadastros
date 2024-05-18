import ProdutoGateway from "@/Interfaces/Gataways/ProdutoGateway";
import { ProdutoTestRepository } from "@/Infrastructure/drivers/Repositories/TestsRepositories/ProdutoTestRepository";
import { Produto } from "@/Domain/Entities/Produto";
import { beforeEach, describe, expect, it, vi } from "vitest";

describe("ProdutoGateway", () => {
  let produtoRepository: ProdutoTestRepository;
  let produtoGateway: ProdutoGateway;

  beforeEach(() => {
    produtoRepository = new ProdutoTestRepository();
    produtoGateway = new ProdutoGateway(produtoRepository);
  });

  describe("saveAsync", () => {
    it("Deve salvar um produto com sucesso", async () => {
      const produto = new Produto({
        nome: "Produto A",
        descricao: "Descrição do Produto A",
        categoria: "Categoria 1",
        valor: 100,
        disponivel: true,
      });

      const result = await produtoGateway.saveAsync(produto);

      expect(result).toEqual(produto);
      expect(produtoRepository.produtos).toContainEqual(produto);
    });

    it("Deve falhar ao tentar salvar um produto no repositório", async () => {
      const produto = new Produto({
        nome: "Produto A",
        descricao: "Descrição do Produto A",
        categoria: "Categoria 1",
        valor: 100,
        disponivel: true,
      });

      const saveAsyncSpy = vi
        .spyOn(produtoRepository, "saveAsync")
        .mockRejectedValue(new Error("Erro ao salvar produto"));

      await expect(produtoGateway.saveAsync(produto)).rejects.toThrow(
        "Erro ao salvar produto"
      );

      saveAsyncSpy.mockRestore();
    });
  });

  describe("updateAsync", () => {
    it("Deve atualizar um produto com sucesso", async () => {
      const produto = new Produto({
        nome: "Produto A",
        descricao: "Descrição do Produto A",
        categoria: "Categoria 1",
        valor: 100,
        disponivel: true,
      });

      const savedProduto = await produtoGateway.saveAsync(produto);
      savedProduto.nome = "Produto A Updated";
      savedProduto.valor = 150;

      const result = await produtoGateway.updateAsync(savedProduto);

      expect(result).toEqual(savedProduto);
      expect(produtoRepository.produtos).toContainEqual(savedProduto);
    });

    it("Deve falhar ao tentar atualizar um produto no repositório", async () => {
      const produto = new Produto({
        id: 1,
        nome: "Produto A",
        descricao: "Descrição do Produto A",
        categoria: "Categoria 1",
        valor: 100,
        disponivel: true,
      });

      const updateAsyncSpy = vi
        .spyOn(produtoRepository, "updateAsync")
        .mockRejectedValue(new Error("Erro ao atualizar produto"));

      await expect(produtoGateway.updateAsync(produto)).rejects.toThrow(
        "Erro ao atualizar produto"
      );

      updateAsyncSpy.mockRestore();
    });
  });

  describe("removeAsync", () => {
    it("Deve remover um produto com sucesso", async () => {
      const produto = new Produto({
        nome: "Produto A",
        descricao: "Descrição do Produto A",
        categoria: "Categoria 1",
        valor: 100,
        disponivel: true,
      });

      const savedProduto = await produtoGateway.saveAsync(produto);

      await produtoGateway.removeAsync(savedProduto.id as number);

      expect(produtoRepository.produtos).not.toContainEqual(savedProduto);
    });

    it("Deve falhar ao tentar remover um produto no repositório", async () => {
      const removeAsyncSpy = vi
        .spyOn(produtoRepository, "removeAsync")
        .mockRejectedValue(new Error("Erro ao remover produto"));

      await expect(produtoGateway.removeAsync(1)).rejects.toThrow(
        "Erro ao remover produto"
      );

      removeAsyncSpy.mockRestore();
    });
  });

  describe("findByIdAsync", () => {
    it("Deve encontrar um produto por ID com sucesso", async () => {
      const produto = new Produto({
        nome: "Produto A",
        descricao: "Descrição do Produto A",
        categoria: "Categoria 1",
        valor: 100,
        disponivel: true,
      });

      const savedProduto = await produtoGateway.saveAsync(produto);

      const result = await produtoGateway.findByIdAsync(
        savedProduto.id as number
      );

      expect(result).toEqual(savedProduto);
    });

    it("Deve retornar null se o produto não for encontrado", async () => {
      const result = await produtoGateway.findByIdAsync(999);

      expect(result).toBeNull();
    });
  });

  describe("findAllAsync", () => {
    it("Deve retornar todos os produtos com sucesso", async () => {
      const produto1 = new Produto({
        nome: "Produto A",
        descricao: "Descrição do Produto A",
        categoria: "Categoria 1",
        valor: 100,
        disponivel: true,
      });

      const produto2 = new Produto({
        nome: "Produto B",
        descricao: "Descrição do Produto B",
        categoria: "Categoria 2",
        valor: 200,
        disponivel: true,
      });

      await produtoGateway.saveAsync(produto1);
      await produtoGateway.saveAsync(produto2);

      const result = await produtoGateway.findAllAsync();

      expect(result).toEqual([produto1, produto2]);
    });
  });

  describe("findByNomeAsync", () => {
    it("Deve encontrar um produto por nome com sucesso", async () => {
      const produto = new Produto({
        nome: "Produto A",
        descricao: "Descrição do Produto A",
        categoria: "Categoria 1",
        valor: 100,
        disponivel: true,
      });

      await produtoGateway.saveAsync(produto);

      const result = await produtoGateway.findByNomeAsync("Produto A");

      expect(result).toEqual(produto);
    });

    it("Deve retornar null se o produto não for encontrado por nome", async () => {
      const result = await produtoGateway.findByNomeAsync("Produto X");

      expect(result).toBeNull();
    });
  });

  describe("findByCategoriaAsync", () => {
    it("Deve encontrar produtos por categoria com sucesso", async () => {
      const produto1 = new Produto({
        nome: "Produto A",
        descricao: "Descrição do Produto A",
        categoria: "Categoria 1",
        valor: 100,
        disponivel: true,
      });

      const produto2 = new Produto({
        nome: "Produto B",
        descricao: "Descrição do Produto B",
        categoria: "Categoria 1",
        valor: 150,
        disponivel: true,
      });

      const produto3 = new Produto({
        nome: "Produto C",
        descricao: "Descrição do Produto C",
        categoria: "Categoria 2",
        valor: 200,
        disponivel: true,
      });

      await produtoGateway.saveAsync(produto1);
      await produtoGateway.saveAsync(produto2);
      await produtoGateway.saveAsync(produto3);

      const result = await produtoGateway.findByCategoriaAsync("Categoria 1");

      expect(result).toEqual([produto1, produto2]);
    });

    it("Deve retornar uma lista vazia se nenhum produto for encontrado por categoria", async () => {
      const result = await produtoGateway.findByCategoriaAsync("Categoria X");

      expect(result).toEqual([]);
    });
  });
});
