import { SolicitacaoLgpd } from "@/Domain/Entities/SolicitacaoLgpd";
import { prisma } from "@/Infrastructure/lib/prisma";
import { ISolicitacaoLgpdRepository } from "@/Interfaces/Repositories/ISolicitacaoLgpdRepository";

export default class SolicitacaoLgpdRepository implements ISolicitacaoLgpdRepository {
    async saveAsync(data: SolicitacaoLgpd): Promise<SolicitacaoLgpd> {
        const solicitacaoLgpd = await prisma.solicitacaoLgpd.create({
            data,
        });
        return solicitacaoLgpd;
    }

    async findByCPFAsync(cpf: string): Promise<SolicitacaoLgpd[]> {
        
        const solicitacaoLgpd = await prisma.solicitacaoLgpd.findMany({
            where: {
                cpf: cpf,
            },
        });

        return solicitacaoLgpd;
    }

}