// @ts-nocheck
import { repository_notificacoes } from "./repository.js";
import { Notificacoes } from "./model.js";

export const NotificacoesService = {
    async create(dados) {
        Notificacoes.validate(dados);
        await repository_notificacoes.create(dados);
    },

    async findAll() {
        return await repository_notificacoes.findAll();
    },

    async findOne(id) {
        const notificacao = await repository_perfis.findOne(id);
        if (!notificacao) throw new Error("Não encontrado");
        return notificacao;
    },

    async update(id, dados) {
        Notificacoes.validate(dados);
        const notificacaoExistente = await repository_notificacoes.findOne(id);
        if (!notificacaoExistente) throw new Error("Não encontrado");
        await repository_perfis.update(id, dados);
    },

    async patch(id, dados) {
        Notificacoes.validate(dados);
        const notificacaoExistente = await repository_notificacoes.findOne(id);
        if (!notificacaoExistente) throw new Error("Não encontrado");
        await repository_perfis.patch(id, dados);
    },

    async remove(id) {
        const notificacaoExistente = await repository_notificacoes.findOne(id);
        if (!notificacaoExistente) throw new Error("Não encontrado");
        await repository_perfis.remove(id);
    },
};
