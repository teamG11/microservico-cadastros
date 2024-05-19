import { ProdutoController } from "@/Interfaces/controllers/ProdutoController";
import { ProdutoTestRepository } from "@/Infrastructure/drivers/Repositories/TestsRepositories/ProdutoTestRepository";
import { Request, Response } from "express";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { CategoriaProduto } from "@/Domain/Enums/CategoriaProduto";

describe("ProdutoController", () => {
  let mockResponse: Partial<Response>;
  // eslint-disable-next-line
  let mockNext: any;
  let produtoRepository: ProdutoTestRepository;
  let produtoController: ProdutoController;

  beforeEach(() => {
    produtoRepository = new ProdutoTestRepository();
    produtoController = new ProdutoController(produtoRepository);
    mockResponse = {
      status: vi.fn().mockReturnThis(),
      json: vi.fn(),
      send: vi.fn(),
    };
    mockNext = vi.fn();
  });

  describe("criar", () => {
    it("Deve criar um produto com sucesso", async () => {
      const mockRequest: Partial<Request> = {
        body: {
          nome: "Produto A",
          descricao: "Descrição do Produto A",
          categoria: CategoriaProduto.lanche,
          valor: 100.0,
          disponivel: true,
        },
      };

      await produtoController.criar(
        mockRequest as Request,
        mockResponse as Response,
        mockNext
      );

      expect(mockResponse.status).toHaveBeenCalledWith(201);
      expect(mockResponse.send).toHaveBeenCalledWith(
        expect.objectContaining({
          nome: "Produto A",
          descricao: "Descrição do Produto A",
          categoria: CategoriaProduto.lanche,
          valor: 100.0,
          disponivel: true,
        })
      );
    });

    it("Não deve criar um produto com dados inválidos", async () => {
      const mockRequest: Partial<Request> = {
        body: {
          nome: "Produto A",
          descricao: "Descrição do Produto A",
        },
      };

      await produtoController.criar(
        mockRequest as Request,
        mockResponse as Response,
        mockNext
      );

      expect(mockNext).toHaveBeenCalledWith(expect.any(Error));
    });
  });

  describe("editar", () => {
    it("Deve editar um produto com sucesso", async () => {
      produtoRepository.produtos = [
        {
          id: 1,
          nome: "Produto A",
          descricao: "Descrição",
          categoria: CategoriaProduto.lanche,
          valor: 100,
          disponivel: true,
        },
      ];

      const mockRequest: Partial<Request> = {
        params: { id: "1" },
        body: {
          nome: "Produto A Editado",
        },
      };

      await produtoController.editar(
        mockRequest as Request,
        mockResponse as Response,
        mockNext
      );

      expect(mockResponse.status).toHaveBeenCalledWith(200);
      expect(mockResponse.send).toHaveBeenCalledWith(
        expect.objectContaining({
          id: 1,
          nome: "Produto A Editado",
          descricao: "Descrição",
          categoria: CategoriaProduto.lanche,
          valor: 100,
          disponivel: true,
        })
      );
    });

    it("Não deve editar um produto com dados inválidos", async () => {
      produtoRepository.produtos = [
        {
          id: 1,
          nome: "Produto A",
          descricao: "Descrição",
          categoria: CategoriaProduto.lanche,
          valor: 100,
          disponivel: true,
        },
      ];

      const mockRequest: Partial<Request> = {
        params: { id: "1" },
        body: {
          valor: -100,
        },
      };

      await produtoController.editar(
        mockRequest as Request,
        mockResponse as Response,
        mockNext
      );

      expect(mockNext).toHaveBeenCalledWith(expect.any(Error));
    });
  });

  describe("remover", () => {
    it("Deve remover um produto com sucesso", async () => {
      produtoRepository.produtos = [
        {
          id: 1,
          nome: "Produto A",
          descricao: "Descrição",
          categoria: CategoriaProduto.lanche,
          valor: 100,
          disponivel: true,
        },
      ];

      const mockRequest: Partial<Request> = {
        params: { id: "1" },
      };

      await produtoController.remover(
        mockRequest as Request,
        mockResponse as Response,
        mockNext
      );

      expect(mockResponse.status).toHaveBeenCalledWith(200);
      expect(mockResponse.json).toHaveBeenCalled();
    });

    it("Não deve remover um produto com id inválido", async () => {
      produtoRepository.produtos = [
        {
          id: 1,
          nome: "Produto A",
          descricao: "Descrição",
          categoria: CategoriaProduto.lanche,
          valor: 100,
          disponivel: true,
        },
      ];

      const mockRequest: Partial<Request> = {
        params: { id: "-100" },
      };

      await produtoController.remover(
        mockRequest as Request,
        mockResponse as Response,
        mockNext
      );

      expect(mockNext).toHaveBeenCalledWith(expect.any(Error));
    });
  });

  describe("buscarPorId", () => {
    it("Deve buscar um produto por ID com sucesso", async () => {
      produtoRepository.produtos = [
        {
          id: 1,
          nome: "Produto A",
          descricao: "Descrição",
          categoria: CategoriaProduto.lanche,
          valor: 100,
          disponivel: true,
        },
      ];

      const mockRequest: Partial<Request> = {
        params: { id: "1" },
      };

      await produtoController.buscarPorId(
        mockRequest as Request,
        mockResponse as Response,
        mockNext
      );

      expect(mockResponse.status).toHaveBeenCalledWith(200);
      expect(mockResponse.json).toHaveBeenCalledWith(
        expect.objectContaining({
          id: 1,
        })
      );
    });

    it("Deve lidar com produto não encontrado por ID", async () => {
      produtoRepository.produtos = [
        {
          id: 1,
          nome: "Produto A",
          descricao: "Descrição",
          categoria: CategoriaProduto.lanche,
          valor: 100,
          disponivel: true,
        },
      ];

      const mockRequest: Partial<Request> = {
        params: { id: "999" },
      };

      await produtoController.buscarPorId(
        mockRequest as Request,
        mockResponse as Response,
        mockNext
      );

      expect(mockNext).toHaveBeenCalledWith(expect.any(Error));
    });
  });

  describe("buscarPorCategoria", () => {
    it("Deve buscar produtos por categoria com sucesso", async () => {
      produtoRepository.produtos = [
        {
          id: 1,
          nome: "Produto A",
          descricao: "Descrição",
          categoria: CategoriaProduto.lanche,
          valor: 100,
          disponivel: true,
        },
      ];

      const mockRequest: Partial<Request> = {
        params: { categoria: CategoriaProduto.lanche },
      };

      await produtoController.buscarPorCategoria(
        mockRequest as Request,
        mockResponse as Response,
        mockNext
      );

      expect(mockResponse.status).toHaveBeenCalledWith(200);
      expect(mockResponse.json).toHaveBeenCalledWith([
        {
          produtos: [
            {
              id: 1,
              nome: "Produto A",
              descricao: "Descrição",
              categoria: CategoriaProduto.lanche,
              valor: 100,
              disponivel: true,
            },
          ],
        },
      ]);
    });

    it("Deve lidar com categoria não encontrada", async () => {
      const mockRequest: Partial<Request> = {
        params: { categoria: "CategoriaInexistente" },
      };

      await produtoController.buscarPorCategoria(
        mockRequest as Request,
        mockResponse as Response,
        mockNext
      );

      expect(mockNext).toHaveBeenCalledWith(expect.any(Error));
    });
  });

  describe("buscarTodos", () => {
    it("Deve buscar todos os produtos com sucesso", async () => {
      produtoRepository.produtos = [
        {
          id: 1,
          nome: "Produto A",
          descricao: "Descrição A",
          categoria: CategoriaProduto.lanche,
          valor: 500,
          disponivel: true,
        },
        {
          id: 2,
          nome: "Produto B",
          descricao: "Descrição B",
          categoria: CategoriaProduto.sobremesa,
          valor: 100,
          disponivel: true,
        },
      ];

      const mockRequest: Partial<Request> = {};

      await produtoController.buscarTodos(
        mockRequest as Request,
        mockResponse as Response,
        mockNext
      );

      expect(mockResponse.status).toHaveBeenCalledWith(200);
      expect(mockResponse.json).toHaveBeenCalledWith({
        produtos: produtoRepository.produtos,
      });
    });

    it("Deve lidar com erro de acesso ao banco de dados", async () => {
      produtoRepository.findAllAsync = async () => {
        throw new Error("Erro de acesso ao banco de dados");
      };

      const mockRequest: Partial<Request> = {};

      await produtoController.buscarTodos(
        mockRequest as Request,
        mockResponse as Response,
        mockNext
      );

      expect(mockNext).toHaveBeenCalledWith(expect.any(Error));
    });
  });
});
