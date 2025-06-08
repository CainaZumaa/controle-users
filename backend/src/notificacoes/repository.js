import db from "../../db.js";

const tabela = "notificacoes";

export const create = async (dados) => {
  const dadosMapeados = {
    titulo: dados.titulo,
    mensagem: dados.mensagem,
    tipo: dados.tipo    
  };
  const result = await db(tabela).insert(dadosMapeados).returning("*");

  return result;
};

export const findAll = async () => {
  const dados = await db(tabela).select("*");

  return dados.map((dados) => ({
    titulo: dados.titulo,
    mensagem: dados.mensagem,
    tipo: dados.tipo      
  }));
};

export const findOne = async (id) => {
  const dados = await db(tabela).where({ id }).first();

  if (dados) {
    return dados;
  }
  return null;
};

export const update = async (id, dados) => {
  const dadosMapeados = {
    titulo: dados.titulo,
    mensagem: dados.mensagem,
    tipo: dados.tipo      
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
    titulo: dados.titulo,
    mensagem: dados.mensagem,
    tipo: dados.tipo      
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

export const repository_notificacoes = {
  create,
  findAll,
  findOne,
  update,
  remove,
};
