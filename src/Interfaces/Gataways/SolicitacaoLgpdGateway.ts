import { SolicitacaoLgpd } from "@/Domain/Entities/SolicitacaoLgpd";
import { ISolicitacaoLgpdRepository } from "../Repositories/ISolicitacaoLgpdRepository";

export interface ISolicitacaoLgpdGateway {
    saveAsync(SolicitacaoLgpd: SolicitacaoLgpd): Promise<SolicitacaoLgpd>;
    findByCPFAsync(cpf: string): Promise<SolicitacaoLgpd[]>;
}

export default class SolicitacaoLgpdGateway implements ISolicitacaoLgpdGateway {
    constructor(private solicitacaoLgpdRepository: ISolicitacaoLgpdRepository) { }
    saveAsync(SolicitacaoLgpd: SolicitacaoLgpd): Promise<SolicitacaoLgpd> {
        return this.solicitacaoLgpdRepository.saveAsync(SolicitacaoLgpd);
    }

    findByCPFAsync(cpf: string): Promise<SolicitacaoLgpd[]> {
        return this.solicitacaoLgpdRepository.findByCPFAsync(cpf);
    }
}

