import { CriaSolicitacaoLgpdUseCaseFactory } from "@/Application/use-cases-factories/Lgpd/CriaSolicitacaoLgpdUseCaseFactory";
import SolicitacaoLgpdGateway from "../Gataways/SolicitacaoLgpdGateway";
import { ISolicitacaoLgpdRepository } from "../Repositories/ISolicitacaoLgpdRepository";
import { z } from "zod";
import { NextFunction, Request, Response } from "express";

export class LgpdController {
    constructor(private solicitacaoLgpdRepository: ISolicitacaoLgpdRepository) { }

    async criar(request: Request, response: Response, next: NextFunction) {
        try {
            const dados = request.body;

            const createBodySchema = z.object({
                nome: z.string().min(3).max(255),
                descricao: z.string().min(3).max(255).optional(),
                cpf: z.string().min(11).max(11),
                telefone: z.string().min(11).max(11).optional(),
                endereco: z.string().min(3).max(255).optional(),
            });

            const solicitacaoLgpdToCreate = createBodySchema.parse(dados);
            const solicitacaoLgpdGateway = new SolicitacaoLgpdGateway(this.solicitacaoLgpdRepository);
            const criaSolicitacaoUseCase = CriaSolicitacaoLgpdUseCaseFactory(solicitacaoLgpdGateway);
            const { solicitacaoLgpd } = await criaSolicitacaoUseCase.executarAsync({
                ...solicitacaoLgpdToCreate,
            });

            return response.status(201).send(solicitacaoLgpd);
        } catch (error) {
            next(error);
        }
    }
}
