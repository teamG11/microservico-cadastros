import { ProdutoTestRepository } from "@/Infrastructure/drivers/Repositories/TestsRepositories/ProdutoTestRepository";
import { RegistroNaoEncontradoError } from "@/Application/errors/RegistroNaoEncontradoError";
import { RemoveProdutoUseCase } from "@/Application/use-cases/produtos/RemoveProdutoUseCase";
import { Produto } from "@/Domain/Entities/Produto";
import { CategoriaProduto } from "@/Domain/Enums/CategoriaProduto";
import { beforeEach, describe, expect, it } from "vitest";
import ProdutoGateway, {
  IProdutoGateway,
} from "@/Interfaces/Gataways/ProdutoGateway";
import { CriaProdutoUseCase } from "@/Application/use-cases/produtos/CriaProdutoUseCase";

let produtoGateway: IProdutoGateway;
let criaProdutoUseCase: CriaProdutoUseCase;
let removeProdutoUseCase: RemoveProdutoUseCase;

describe("RemoveProduto use case", () => {
  beforeEach(() => {
    const produtoRepository = new ProdutoTestRepository();
    produtoGateway = new ProdutoGateway(produtoRepository);
    criaProdutoUseCase = new CriaProdutoUseCase(produtoGateway);
    removeProdutoUseCase = new RemoveProdutoUseCase(produtoGateway);
  });

  it("Deve permitir remover produto existente", async () => {
    const dadosCadastro: Produto = {
      nome: "Hamburguer",
      descricao: "Delicioso hambúrguer",
      categoria: CategoriaProduto.lanche,
      valor: 10.99,
      disponivel: true,
    };

    const respostaCadastro = await criaProdutoUseCase.executarAsync(
      dadosCadastro
    );

    expect(respostaCadastro.produto).toBeDefined();

    const produtoCadastro = {
      id: respostaCadastro.produto!.id as number,
    };

    await removeProdutoUseCase.executarAsync(produtoCadastro);

    const produtoRemovido = await produtoGateway.findByIdAsync(
      produtoCadastro.id
    );

    expect(produtoRemovido).toBeNull();
  });

  it("Deve retornar erro ao remover produto inexistente", async () => {
    const produtoInexistente = {
      id: 9999,
    };

    await expect(
      removeProdutoUseCase.executarAsync(produtoInexistente)
    ).rejects.toThrowError(RegistroNaoEncontradoError);
  });
});
