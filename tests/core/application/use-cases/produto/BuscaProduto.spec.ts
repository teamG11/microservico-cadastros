import { ProdutoTestRepository } from "@/Infrastructure/drivers/Repositories/TestsRepositories/ProdutoTestRepository";
import { RegistroNaoEncontradoError } from "@/Application/errors/RegistroNaoEncontradoError";
import { BuscaProdutoUseCase } from "@/Application/use-cases/produtos/BuscaProdutoUseCase";
import { Produto } from "@/Domain/Entities/Produto";
import { CategoriaProduto } from "@/Domain/Enums/CategoriaProduto";
import { beforeEach, describe, expect, it } from "vitest";
import ProdutoGateway from "@/Interfaces/Gataways/ProdutoGateway";
import { CriaProdutoUseCase } from "@/Application/use-cases/produtos/CriaProdutoUseCase";

let produtoGateway: ProdutoGateway;
let useCaseCria: CriaProdutoUseCase;
let useCaseBuscaProduto: BuscaProdutoUseCase;

describe("BuscaProduto use case", () => {
  beforeEach(() => {
    const produtoRepository = new ProdutoTestRepository();
    produtoGateway = new ProdutoGateway(produtoRepository);
    useCaseCria = new CriaProdutoUseCase(produtoGateway);
    useCaseBuscaProduto = new BuscaProdutoUseCase(produtoGateway);
  });

  it("Deve encontrar produto cadastrado", async () => {
    const produtoCadastro: Produto = {
      nome: "Hamburguer",
      descricao: "Delicioso hambúrguer",
      categoria: CategoriaProduto.lanche,
      valor: 10.99,
      disponivel: true,
    };

    const respostaCadastro = await useCaseCria.executarAsync(produtoCadastro);
    expect(respostaCadastro.produto).toBeDefined();

    const produtoBusca = {
      id: respostaCadastro.produto!.id as number,
    };
    const respostaBusca = await useCaseBuscaProduto.executarAsync(produtoBusca);

    expect(respostaBusca.produto.nome).toBe(produtoCadastro.nome);
  });

  it("Deve retornar um erro, quando um ID inexistente é fornecido", async () => {
    const produtoInexistente = {
      id: 9999,
    };

    await expect(
      useCaseBuscaProduto.executarAsync(produtoInexistente)
    ).rejects.toThrowError(RegistroNaoEncontradoError);
  });
});
