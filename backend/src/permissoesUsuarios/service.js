import {repository_permissoesUsuarios} from "./repository";
import {permissoesUsuarios} from "./model";

export const permissoesUsuariosService = {
  async create(dados) {
    permissoesUsuarios.validate(dados);
    await repository_permissoesUsuarios.create(dados);
  },

  async findAll() {
    return await repository_permissoesUsuarios.findAll();
  },

  async findOne(id) {
    const permissaoUsuario = await repository_permissoesUsuarios.findOne(id);
    if (!permissaoUsuario) throw new Error("Usuário com permissão não encontrado");
    return permissaoUsuario;
  },

  async update(id, dados) {
    permissoesUsuarios.validate(dados);
    const permissaoUsuarioExistente = await repository_permissoesUsuarios.findOne(id);
    if (!permissaoUsuarioExistente) throw new Error("Usuário com permissãoo não encontrado");
    await repository_permissoesUsuarios.update(id, dados);
  },

  async patch(id, dados) {
    permissoesUsuarios.validate(dados);
    const permissaoUsuarioExistente = await repository_permissoesUsuarios.findOne(id);
    if (!permissaoUsuarioExistente) throw new Error("Usuário com permissão não encontrado");
    await permissaoUsuarioExistente.patch(id, dados);
  },

  async remove(id) {
    const permissaoUsuarioExistente = await repository_permissoesUsuarios.findOne(id);
    if (!permissaoUsuarioExistente) throw new Error("Usuário com permissão não encontrado");
    await repository_permissoesUsuarios.remove(id);
  },
};
