import { SolicitacaoLgpd } from "@/Domain/Entities/SolicitacaoLgpd";

export interface ISolicitacaoLgpdRepository {
    saveAsync(SolicitacaoLgpd: SolicitacaoLgpd): Promise<SolicitacaoLgpd>;
    findByCPFAsync(cpf: string): Promise<SolicitacaoLgpd[]>;
}