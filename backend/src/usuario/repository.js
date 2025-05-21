import db from "../../db.js";

const tabela = "usuarios";

export const create = async (dados) => {
  const dadosMapeados = {
    nome: dados.nome,
    email: dados.email,
    senha: dados.senha,
  };
  const result = await db(tabela).insert(dadosMapeados).returning("*");

  return result;
};

export const findAll = async () => {
  const usuarios = await db(tabela).select("*");

  return usuarios.map((usuario) => ({
    id: usuario.id,
    nome: usuario.nome,
    email: usuario.email,
  }));
};

export const findOne = async (id) => {
  const usuario = await db(tabela).where({ id }).first();

  if (usuario) {
    return usuario;
  }
  return null;
};

export const findByEmail = async (email) => {
  const usuario = await db(tabela).where({ email }).first();
  return usuario;
};

export const update = async (id, dados) => {
  const dadosMapeados = {
    nome: dados.nome,
    email: dados.email,
    senha: dados.senha,
  };

  const result = await db(tabela)
    .where({ id })
    .update(dadosMapeados)
    .returning("*");

  if (!result || result.length === 0) {
    throw new Error("Nenhum registro foi atualizado.");
  }
  return result[0];
};

export const patch = async (id, dados) => {
  const dadosMapeados = {
    nome: dados.nome,
    email: dados.email,
  };

  const result = await db(tabela)
    .where({ id })
    .update(dadosMapeados)
    .returning("*");

  if (!result || result.length === 0) {
    throw new Error("Nenhum registro foi atualizado.");
  }
  return result[0];
};

export const remove = async (id) => {
  const result = await db(tabela).where({ id }).delete().returning("*");

  if (!result || result.length === 0) {
    throw new Error("Nenhum registro foi removido.");
  }
  return result[0];
};

export const repository_usuarios = {
  create,
  findAll,
  findOne,
  findByEmail,
  update,
  remove,
};
