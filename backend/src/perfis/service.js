// @ts-nocheck
import { repository_perfis } from "./repository.js";
import { Perfil } from "./model.js";

export const perfisService = {
    async create(dados) {
        Perfil.validate(dados);
        await repository_perfis.create(dados);
    },

    async findAll() {
        return await repository_perfis.findAll();
    },

    async findOne(id) {
        const perfil = await repository_perfis.findOne(id);
        if (!perfil) throw new Error("Usuário não encontrado");
        return perfil;
    },

    async update(id, dados) {
        Perfil.validate(dados);
        const perfilExistente = await repository_perfis.findOne(id);
        if (!perfilExistente) throw new Error("Perfil não encontrado");
        await repository_perfis.update(id, dados);
    },

    async patch(id, dados) {
        Perfil.validate(dados);
        const perfilExistente = await repository_perfis.findOne(id);
        if (!perfilExistente) throw new Error("Perfil não encontrado");
        await repository_perfis.patch(id, dados);
    },

    async remove(id) {
        const perfilExistente = await repository_perfis.findOne(id);
        if (!perfilExistente) throw new Error("Perfil não encontrado");
        await repository_perfis.remove(id);
    },
};
