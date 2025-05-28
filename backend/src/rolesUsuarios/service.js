import {repository_rolesUsuarios} from "./repository";
import {rolesUsuarios} from "./model";

export const rolesUsuariosService = {
  async create(dados) {
    rolesUsuarios.validate(dados);
    await repository_rolesUsuarios.create(dados);
  },

  async findAll() {
    return await repository_rolesUsuarios.findAll();
  },

  async findOne(id) {
    const roles = await repository_rolesUsuarios.findOne(id);
    if (!roles) throw new Error("Não encontrado");
    return roles;
  },

  async update(id, dados) {
    rolesUsuarios.validate(dados);
    const Existente = await repository_rolesUsuarios.findOne(id);
    if (!Existente) throw new Error("Não encontrado");
    await repository_rolesUsuarios.update(id, dados);
  },

  async patch(id, dados) {
    rolesUsuarios.validate(dados);
    const Existente = await repository_rolesUsuarios.findOne(id);
    if (!Existente) throw new Error("Não encontrado");
    await repository_rolesUsuarios.patch(id, dados);
  },

  async remove(id) {
    const Existente = await repository_rolesUsuarios.findOne(id);
    if (!Existente) throw new Error("Não encontrado");
    await repository_rolesUsuarios.remove(id);
  },
};
