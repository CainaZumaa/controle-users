// @ts-nocheck
import { repository_usuarios } from "./repository.js";
import { Usuario } from "./model.js";
import bcrypt from "bcrypt";

const passwordHash = async (password) => {
  const salt = await bcrypt.genSalt(10);
  return await bcrypt.hash(password, salt);
};

export const usuariosService = {
  async create(dados) {
    Usuario.validate(dados);
    const senhaHash = await passwordHash(dados.senha);
    await repository_usuarios.create({
      nome: dados.nome,
      email: dados.email,
      senha: senhaHash,
    });
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

  //auth
  async authenticate(email, senha) {
    const usuario = await repository_usuarios.findByEmail(email);
    if (!usuario) throw new Error("Usuário não encontrado");

    const senhaValida = await bcrypt.compare(senha, usuario.senha);

    if (!senhaValida) throw new Error("Senha inválida");

    return {
      id: usuario.id,
      nome: usuario.nome,
      email: usuario.email,
    };
  },

  // magicAuth
  async findByEmail(email) {
    const usuario = await repository_usuarios.findByEmail(email);
    if (!usuario) return null;
    return {
      id: usuario.id,
      nome: usuario.nome,
      email: usuario.email,
    };
  },

  async checkAndUpdateLogin(userId) {
    const user = await repository_usuarios.findOne(userId);
    if (!user.is_active) {
      throw new Error("Conta inativa. Entre em contato com o suporte.");
    }

    await repository_usuarios.updateLastLogin(userId);

    await repository_usuarios.blockInactiveUsers();
  },
};
