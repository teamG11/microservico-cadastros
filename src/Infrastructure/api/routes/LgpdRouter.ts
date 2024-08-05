import SolicitacaoLgpdRepository from "@/Infrastructure/drivers/Repositories/SolicitacaoLgpdRepository";
import { LgpdController } from "@/Interfaces/controllers/LgpdController";
import { Router } from "express";

const lgpdRouter = Router();

const lgpdController = new LgpdController(new SolicitacaoLgpdRepository());

lgpdRouter.post("/solicitacao-exclusao", (req, res, next) => {
    void lgpdController.criar(req, res, next);
});

export { lgpdRouter };