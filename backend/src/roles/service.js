import { repository_roles } from "./repository.js";
import { Roles } from "./model.js";

export const RolesService = {
  async create(dados) {
    Roles.validate(dados);
    await repository_roles.create(dados);
  },

  async findAll() {
    return await repository_roles.findAll();
  },

  async findOne(id) {
    const role = await repository_roles.findOne(id);
    if (!role) throw new Error("Roles não encontrado");
    return role;
  },

  async update(id, dados) {
    Roles.validate(dados);
    const roleExistente = await repository_roles.findOne(id);
    if (!roleExistente) throw new Error("Roles não encontrado");
    await repository_roles.update(id, dados);
  },

  async patch(id, dados) {
    Roles.validate(dados);
    const roleExistente = await repository_roles.findOne(id);
    if (!roleExistente) throw new Error("Roles não encontrado");
    await repository_roles.patch(id, dados);
  },

  async remove(id) {
    const roleExistente = await repository_roles.findOne(id);
    if (!roleExistente) throw new Error("Roles não encontrado");
    await repository_roles.remove(id);
  },
};
