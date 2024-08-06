export class SolicitacaoLgpd {
    id?: number;
    nome: string;
    descricao: string;
    cpf: string;
    telefone: string;
    endereco: string;
    constructor({
        nome,
        descricao,
        cpf,
        telefone,
        endereco,
    }: typeof SolicitacaoLgpd.prototype) {
        (this.nome = nome),
        (this.descricao = descricao),
        (this.cpf = cpf),
        (this.telefone = telefone),
        (this.endereco = endereco)
    }
}