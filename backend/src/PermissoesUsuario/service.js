import {repository_permissoesUsuario} from "./repository";
import {permissaoUsuario} from "./model";

export const permissoesUsuarioService = {
  async create(dados) {
    permissaoUsuario.validate(dados);
    await repository_permissoesUsuario.create(dados);
  },

  async findAll() {
    return await repository_permissoesUsuario.findAll();
  },

  async findOne(id) {
    const permissoes = await repository_permissoesUsuario.findOne(id);
    if (!permissoes) throw new Error("Permissão não encontrado");
    return permissoes;
  },

  async update(id, dados) {
    permissaoUsuario.validate(dados);
    const permissoesExistente = await repository_permissoesUsuario.findOne(id);
    if (!permissoesExistente) throw new Error("Permissão não encontrado");
    await repository_permissoesUsuario.update(id, dados);
  },

  async patch(id, dados) {
    permissaoUsuario.validate(dados);
    const permissoesExistente = await repository_permissoesUsuario.findOne(id);
    if (!permissoesExistente) throw new Error("Permissão não encontrado");
    await repository_permissoesUsuario.patch(id, dados);
  },

  async remove(id) {
    const permissoesExistente = await repository_permissoesUsuario.findOne(id);
    if (!permissoesExistente) throw new Error("Permissão não encontrado");
    await repository_permissoesUsuario.remove(id);
  },
};
