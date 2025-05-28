import {repository_rolesPermissoes} from "./repository";
import {rolesPermissoes} from "./model";

export const rolesPermissoesService = {
  async create(dados) {
    rolesPermissoes.validate(dados);
    await repository_rolesPermissoes.create(dados);
  },

  async findAll() {
    return await repository_rolesPermissoes.findAll();
  },

  async findOne(id) {
    const permissoes = await repository_rolesPermissoes.findOne(id);
    if (!permissoes) throw new Error("Permissão não encontrado");
    return permissoes;
  },

  async update(id, dados) {
    rolesPermissoes.validate(dados);
    const rolespermissoesExistente = await repository_rolesPermissoes.findOne(id);
    if (!rolespermissoesExistente) throw new Error("Permissão não encontrado");
    await repository_rolesPermissoes.update(id, dados);
  },

  async patch(id, dados) {
    rolesPermissoes.validate(dados);
    const rolespermissoesExistente = await repository_rolesPermissoes.findOne(id);
    if (!rolespermissoesExistente) throw new Error("Permissão não encontrado");
    await repository_rolesPermissoes.patch(id, dados);
  },

  async remove(id) {
    const rolespermissoesExistente = await repository_rolesPermissoes.findOne(id);
    if (!rolespermissoesExistente) throw new Error("Permissão não encontrado");
    await repository_rolesPermissoes.remove(id);
  },
};
