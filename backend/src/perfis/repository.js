import db from "../../db.js";

const tabela = "perfils";

export const create = async (dados) => {
  const dadosMapeados = {
    nome: dados.nome,
    descricao: dados.descricao,
    };
  const result = await db(tabela).insert(dadosMapeados).returning("*");

  return result;
};

export const findAll = async () => {
  const perfil = await db(tabela).select("*");

  return perfil.map((perfil) => ({
    id: perfil.id,
    nome: perfil.nome,
    descricao: perfil.descricao,
  }));
};

export const findOne = async (id) => {
  const perfil = await db(tabela).where({ id }).first();

  if (perfil) {
    return perfil;
  }
  return null;
};

export const update = async (id, dados) => {
  const dadosMapeados = {
    id: dados.id,
    nome: dados.nome,
    descricao: dados.descricao,
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
    descricao: dados.descricao,
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

export const repository_perfis = {
  create,
  findAll,
  findOne,
  update,
  remove,
};