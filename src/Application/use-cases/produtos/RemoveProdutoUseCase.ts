import { RegistroNaoEncontradoError } from "../../errors/RegistroNaoEncontradoError";
import { IProdutoGateway } from "@/Interfaces/Gataways/ProdutoGateway";

interface RemoveProdutoRequest {
  id: number;
}

export class RemoveProdutoUseCase {
  constructor(private produtoGateway: IProdutoGateway) {}

  async executarAsync({ id }: RemoveProdutoRequest): Promise<void> {
    const produto = await this.produtoGateway.findByIdAsync(id);

    if (!produto) throw new RegistroNaoEncontradoError();

    return await this.produtoGateway.removeAsync(id);
  }
}
