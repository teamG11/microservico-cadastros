import { CriaSolicitacaoLgpdUseCase } from "@/Application/use-cases/Lgpd/CriaSolicitacaoLgpdUseCase";
import { ISolicitacaoLgpdGateway } from "@/Interfaces/Gataways/SolicitacaoLgpdGateway";

export function CriaSolicitacaoLgpdUseCaseFactory(solicitacaoLgpdGateway: ISolicitacaoLgpdGateway) {
    const criaSolicitacao = new CriaSolicitacaoLgpdUseCase(solicitacaoLgpdGateway);
    return criaSolicitacao;
}