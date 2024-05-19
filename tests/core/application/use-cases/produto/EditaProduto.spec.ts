import { ProdutoTestRepository } from "@/Infrastructure/drivers/Repositories/TestsRepositories/ProdutoTestRepository";
import { RegistroNaoEncontradoError } from "@/Application/errors/RegistroNaoEncontradoError";
import { EditaProdutoUseCase } from "@/Application/use-cases/produtos/EditaProdutoUseCase";
import { Produto } from "@/Domain/Entities/Produto";
import { CategoriaProduto } from "@/Domain/Enums/CategoriaProduto";
import { beforeEach, describe, expect, it } from "vitest";
import ProdutoGateway, {
  IProdutoGateway,
} from "@/Interfaces/Gataways/ProdutoGateway";
import { CriaProdutoUseCase } from "@/Application/use-cases/produtos/CriaProdutoUseCase";

let produtoGateway: IProdutoGateway;
let criaProdutoUseCase: CriaProdutoUseCase;
let editaProdutoUseCase: EditaProdutoUseCase;

describe("EditaProduto use case", () => {
  beforeEach(() => {
    const produtoRepository = new ProdutoTestRepository();
    produtoGateway = new ProdutoGateway(produtoRepository);
    criaProdutoUseCase = new CriaProdutoUseCase(produtoGateway);
    editaProdutoUseCase = new EditaProdutoUseCase(produtoGateway);
  });

  it("Deve permitir editar produto existente", async () => {
    const produtoCadastro: Produto = {
      nome: "Hamburguer",
      descricao: "Delicioso hambúrguer",
      categoria: CategoriaProduto.lanche,
      valor: 10.99,
      disponivel: true,
    };

    const respostaCadastro = await criaProdutoUseCase.executarAsync(
      produtoCadastro
    );
    expect(respostaCadastro.produto).toBeDefined();

    const novoNomeProduto = "Big Burger";
    const produtoEdicao = {
      id: respostaCadastro.produto!.id as number,
      nome: novoNomeProduto,
    };

    const respostaEdicao = await editaProdutoUseCase.executarAsync(
      produtoEdicao
    );
    expect(respostaEdicao.produto.nome).toBe(novoNomeProduto);
  });

  it("Deve retornar erro ao editar produto inexistente", async () => {
    const produtoEdicao = {
      id: 9999,
      nome: "Novo nome",
    };

    await expect(
      editaProdutoUseCase.executarAsync(produtoEdicao)
    ).rejects.toThrowError(RegistroNaoEncontradoError);
  });
});
