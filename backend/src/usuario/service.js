import { repository_usuarios } from "./repository.js";
import { Usuario } from "./model.js";

export const usuariosService = {
  async create(dados) {
    Usuario.validate(dados);
    await repository_usuarios.create(dados);
  },

  async findAll() {
    return await repository_usuarios.findAll();
  },

  async findOne(id) {
    const usuario = await repository_usuarios.findOne(id);
    if (!usuario) throw new Error("Usuário não encontrado");
    return usuario;
  },

  async update(id, dados) {
    Usuario.validate(dados);
    const usuarioExistente = await repository_usuarios.findOne(id);
    if (!usuarioExistente) throw new Error("Usuário não encontrado");
    await repository_usuarios.update(id, dados);
  },

  async patch(id, dados) {
    Usuario.validate(dados);
    const usuarioExistente = await repository_usuarios.findOne(id);
    if (!usuarioExistente) throw new Error("Usuário não encontrado");
    await repository_usuarios.patch(id, dados);
  },

  async remove(id) {
    const usuarioExistente = await repository_usuarios.findOne(id);
    if (!usuarioExistente) throw new Error("Usuário não encontrado");
    await repository_usuarios.remove(id);
  },
};
