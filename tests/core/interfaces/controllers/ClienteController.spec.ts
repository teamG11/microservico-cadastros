import { ClienteController } from "@/Interfaces/controllers/ClienteController";
import { ClienteTestRepository } from "@/Infrastructure/drivers/Repositories/TestsRepositories/ClienteTestRepository";
import { NextFunction, Request, Response } from "express";
import { beforeEach, describe, expect, it, vi } from "vitest";

describe("ClienteController", () => {
  let mockRequest: Partial<Request>;
  let mockResponse: Partial<Response>;
  let mockNext: any;
  let clienteRepository: ClienteTestRepository;
  let clienteController: ClienteController;

  beforeEach(() => {
    clienteRepository = new ClienteTestRepository();
    clienteController = new ClienteController(clienteRepository);
    mockRequest = {};
    mockResponse = {
      status: vi.fn().mockReturnThis(),
      json: vi.fn(),
    };
    mockNext = vi.fn();
  });

  describe("criar", () => {
    it("Deve criar um cliente com sucesso", async () => {
      const mockRequest: Partial<Request> = {
        body: {
          nome: "John",
          sobrenome: "Doe",
          cpf: "12345678901",
        },
      };

      const mockResponse: Partial<Response> = {
        status: vi.fn().mockReturnThis(),
        send: vi.fn(),
      };

      await clienteController.criar(
        mockRequest as Request,
        mockResponse as Response,
        mockNext
      );

      expect(mockResponse.status).toHaveBeenCalledWith(201);
      expect(mockResponse.send).toHaveBeenCalledWith(
        expect.objectContaining({
          nome: "John",
          sobrenome: "Doe",
          cpf: "12345678901",
        })
      );
    });

    it("Não deve criar um cliente com sucesso", async () => {
      const mockRequest: Partial<Request> = {
        body: {
          nome: "John",
          sobrenome: "Doe",
        },
      };

      const mockResponse: Partial<Response> = {
        status: vi.fn().mockReturnThis(),
        send: vi.fn(),
      };

      await clienteController.criar(
        mockRequest as Request,
        mockResponse as Response,
        mockNext
      );

      expect(mockResponse.status).not.toHaveBeenCalledWith(201);
      expect(mockResponse.send).not.toHaveBeenCalledWith(
        expect.objectContaining({
          nome: "John",
          sobrenome: "Doe",
        })
      );
    });
  });

  describe("buscar", () => {
    it("Deve buscar um cliente com sucesso", async () => {
      const mockRequest: Partial<Request> = {
        body: {
          nome: "John",
          sobrenome: "Doe",
          cpf: "12345678901",
        },
      };

      const mockResponse: Partial<Response> = {
        status: vi.fn().mockReturnThis(),
        send: vi.fn(),
      };

      await clienteController.criar(
        mockRequest as Request,
        mockResponse as Response,
        mockNext
      );

      expect(mockResponse.status).toHaveBeenCalledWith(201);
      expect(mockResponse.send).toHaveBeenCalledWith(
        expect.objectContaining({
          nome: "John",
          sobrenome: "Doe",
          cpf: "12345678901",
        })
      );

      const mockRequest2: Partial<Request> = {
        params: {
          cpf: mockRequest.body.cpf,
        },
      };

      const mockResponse2: Partial<Response> = {
        status: vi.fn().mockReturnThis(),
        json: vi.fn(),
      };

      await clienteController.buscar(
        mockRequest2 as Request,
        mockResponse2 as Response,
        mockNext
      );

      expect(mockResponse2.status).toHaveBeenCalledWith(200);
      expect(mockResponse2.json).toHaveBeenCalledWith(
        expect.objectContaining({
          nome: "John",
          sobrenome: "Doe",
          cpf: "12345678901",
        })
      );
    });

    it("Deve lidar com cliente não encontrado", async () => {
      const mockRequest: Partial<Request> = {
        params: {
          cpf: "12345678901",
        },
      };

      const mockResponse: Partial<Response> = {
        status: vi.fn().mockReturnThis(),
        json: vi.fn(),
      };

      await clienteController.buscar(
        mockRequest as Request,
        mockResponse as Response,
        mockNext
      );

      expect(mockResponse.status).not.toHaveBeenCalledWith(200);
    });
  });
});
