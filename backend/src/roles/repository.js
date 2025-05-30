import db from "../../db.js";

const tabela = "roles";

export const create = async (dados) => {
  const dadosMapeados = {
    nome: dados.nome,
    admin: dados.admin,
    editor: dados.editor,
    leitor: dados.leitor
  };
  const result = await db(tabela).insert(dadosMapeados).returning("*");

  return result;
};

export const findAll = async () => {
  const modulos = await db(tabela).select("*");

  return modulos.map((modulos) => ({
    id: modulos.id,
    nome: modulos.nome,
    admin: modulos.admin,
    editor: modulos.editor,
    leitor: modulos.leitor
    
  }));
};

export const findOne = async (id) => {
  const modulos = await db(tabela).where({ id }).first();

  if (modulos) {
    return {
      id: modulos.id,
      nome: modulos.nome,
      admin: modulos.admin,
      editor: modulos.editor,
      leitor: modulos.leitor
    };
  }
  return null;
};

export const update = async (id, dados) => {
  const dadosMapeados = {
    nome: dados.nome,
    admin: dados.admin,
    editor: dados.editor,
    leitor: dados.leitor
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
    admin: dados.admin,
    editor: dados.editor,
    leitor: dados.leitor
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

export const repository_roles = {
  create,
  findAll,
  findOne,
  update,
  remove,
};
