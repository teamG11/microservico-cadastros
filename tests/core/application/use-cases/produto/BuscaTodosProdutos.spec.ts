import { ProdutoTestRepository } from "@/Infrastructure/drivers/Repositories/TestsRepositories/ProdutoTestRepository";
import { BuscaTodosProdutosUseCase } from "@/Application/use-cases/produtos/BuscaTodosProdutosUseCase";
import { Produto } from "@/Domain/Entities/Produto";
import { CategoriaProduto } from "@/Domain/Enums/CategoriaProduto";
import { beforeEach, describe, expect, it } from "vitest";
import ProdutoGateway, {
  IProdutoGateway,
} from "@/Interfaces/Gataways/ProdutoGateway";
import { CriaProdutoUseCase } from "@/Application/use-cases/produtos/CriaProdutoUseCase";

let produtoGateway: IProdutoGateway;
let useCaseCria: CriaProdutoUseCase;
let useCaseBuscaTodosProduto: BuscaTodosProdutosUseCase;

describe("BuscaTodosProdutos use case", () => {
  beforeEach(() => {
    const produtoRepository = new ProdutoTestRepository();
    produtoGateway = new ProdutoGateway(produtoRepository);
    useCaseCria = new CriaProdutoUseCase(produtoGateway);
    useCaseBuscaTodosProduto = new BuscaTodosProdutosUseCase(produtoGateway);
  });

  it("Deve retornar todos os produtos da categoria certa", async () => {
    await produtoGateway.saveAsync(
      new Produto({
        nome: "X-Tudo",
        descricao: "Opção certa para matar grandes fomes",
        categoria: CategoriaProduto.lanche,
        valor: 10.99,
        disponivel: true,
      })
    );

    await produtoGateway.saveAsync(
      new Produto({
        nome: "X-Veggie",
        descricao: "Opção vegana com produtos sem origem animal",
        categoria: CategoriaProduto.lanche,
        valor: 15.99,
        disponivel: true,
      })
    );

    await produtoGateway.saveAsync(
      new Produto({
        nome: "Suco Açaí com Laranja",
        descricao: "Melhor bebida com sabor e refrescância",
        categoria: CategoriaProduto.bebida,
        valor: 5.99,
        disponivel: true,
      })
    );

    const itensCadastrados = await useCaseBuscaTodosProduto.executarAsync();

    expect(itensCadastrados.produtos).toHaveLength(3);
    expect(itensCadastrados.produtos[0].nome).toBe("X-Tudo");
    expect(itensCadastrados.produtos[1].nome).toBe("X-Veggie");
    expect(itensCadastrados.produtos[2].nome).toBe("Suco Açaí com Laranja");
  });

  it("Deve retornar uma lista de produtos vazia, caso não haja produtos cadastrados", async () => {
    const itensCadastrados = await useCaseBuscaTodosProduto.executarAsync();

    expect(itensCadastrados.produtos).toHaveLength(0);
  });
});
