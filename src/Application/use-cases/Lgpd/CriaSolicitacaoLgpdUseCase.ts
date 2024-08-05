import { SolicitacaoLgpd } from "@/Domain/Entities/SolicitacaoLgpd";
import { ISolicitacaoLgpdGateway } from "@/Interfaces/Gataways/SolicitacaoLgpdGateway";

interface CriaSolicitacaoLgpdRequest {
    nome: string;
    descricao: string;
    cpf: string;
    telefone: string;
    endereco: string;
}

interface CriaSolicitacaoLgpdResponse {
    solicitacaoLgpd: SolicitacaoLgpd;
}

export class CriaSolicitacaoLgpdUseCase {
    constructor(private solicitacaoLgpdGateway: ISolicitacaoLgpdGateway) { }

    async executarAsync({
        nome,
        descricao,
        cpf,
        telefone,
        endereco,
    }: CriaSolicitacaoLgpdRequest): Promise<CriaSolicitacaoLgpdResponse> {

        const solicitacaoLgpd = await this.solicitacaoLgpdGateway.saveAsync(
            new SolicitacaoLgpd({ nome, descricao, cpf,telefone,endereco })
        );

        return { solicitacaoLgpd };
    }
}