import { repository_permissoes } from "./repository.js";
import { Permissoes } from "./model.js";

export const permissoesService = {
  async create(dados) {
    Permissoes.validate(dados);
    await repository_permissoes.create(dados);
  },

  async findAll() {
    return await repository_permissoes.findAll();
  },

  async findOne(id) {
    const permissoes = await repository_permissoes.findOne(id);
    if (!permissoes) throw new Error("Permissão não encontrado");
    return permissoes;
  },

  async update(id, dados) {
    Permissoes.validate(dados);
    const permissoesExistente = await repository_permissoes.findOne(id);
    if (!permissoesExistente) throw new Error("Permissão não encontrado");
    await repository_permissoes.update(id, dados);
  },

  async patch(id, dados) {
    Permissoes.validate(dados);
    const permissoesExistente = await repository_permissoes.findOne(id);
    if (!permissoesExistente) throw new Error("Permissão não encontrado");
    await repository_permissoes.patch(id, dados);
  },

  async remove(id) {
    const permissoesExistente = await repository_permissoes.findOne(id);
    if (!permissoesExistente) throw new Error("Permissão não encontrado");
    await repository_permissoes.remove(id);
  },
};
