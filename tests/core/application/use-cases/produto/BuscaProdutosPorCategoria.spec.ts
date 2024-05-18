import { ProdutoTestRepository } from "@/Infrastructure/drivers/Repositories/TestsRepositories/ProdutoTestRepository";
import { BuscaProdutosPorCategoriaUseCase } from "@/Application/use-cases/produtos/BuscaProdutosPorCategoriaUseCase";
import { Produto } from "@/Domain/Entities/Produto";
import { CategoriaProduto } from "@/Domain/Enums/CategoriaProduto";
import { beforeEach, describe, expect, it } from "vitest";
import ProdutoGateway, {
  IProdutoGateway,
} from "@/Interfaces/Gataways/ProdutoGateway";
import { CriaProdutoUseCase } from "@/Application/use-cases/produtos/CriaProdutoUseCase";

let produtoGateway: IProdutoGateway;
let useCaseCria: CriaProdutoUseCase;
let useCaseBuscaProdutoCategoria: BuscaProdutosPorCategoriaUseCase;

describe("BuscaProdutoPorCategoria use case", () => {
  beforeEach(() => {
    const produtoRepository = new ProdutoTestRepository();
    produtoGateway = new ProdutoGateway(produtoRepository);
    useCaseCria = new CriaProdutoUseCase(produtoGateway);
    useCaseBuscaProdutoCategoria = new BuscaProdutosPorCategoriaUseCase(
      produtoGateway
    );
  });

  it("Deve retornar produtos da categoria certa", async () => {
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

    const lanchesCadastrados = await useCaseBuscaProdutoCategoria.executarAsync(
      {
        categoria: CategoriaProduto.lanche,
      }
    );

    expect(lanchesCadastrados.produtos).toHaveLength(2);
    expect(lanchesCadastrados.produtos[0].nome).toBe("X-Tudo");
    expect(lanchesCadastrados.produtos[1].nome).toBe("X-Veggie");
  });

  it("Deve retornar uma lista de produtos vazia, caso não haja produtos da categoria", async () => {
    const categoriaVazia = await useCaseBuscaProdutoCategoria.executarAsync({
      categoria: CategoriaProduto.sobremesa,
    });

    expect(categoriaVazia.produtos).toHaveLength(0);
  });
});
