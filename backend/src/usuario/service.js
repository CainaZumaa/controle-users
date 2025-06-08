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
    const novoUsuario = await repository_usuarios.create({
      nome: dados.nome,
      email: dados.email,
      senha: senhaHash,
    });
    return novoUsuario;
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
      is_active: usuario.is_active,
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
      is_active: usuario.is_active,
    };
  },

  async checkAndUpdateLogin(userId) {
    const usuario = await repository_usuarios.findOne(userId);

    if (!usuario) {
      throw new Error("Usuário não encontrado");
    }

    if (usuario.is_active === false) {
      throw new Error("Conta inativa. Entre em contato com o suporte.");
    }

    await repository_usuarios.updateLastLogin(userId);
  },
};
