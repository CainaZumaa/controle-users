import db from "../../db.js";

const tabela = "permissoes";

export const create = async (dados) => {
  const dadosMapeados = {
    user_email: dados.user_email,
    tipo_permissao: dados.tipo_permissao,
  };
  const [result] = await db(tabela).insert(dadosMapeados).returning("*");
  return result;
};

export const findAll = async () => {
  const permissoes = await db(tabela).select(
    "id",
    "user_email",
    "tipo_permissao"
  );
  return permissoes.map((permissao) => ({
    id: permissao.id,
    user_email: permissao.user_email,
    tipo_permissao: permissao.tipo_permissao,
  }));
};

export const findOne = async (id) => {
  const permissao = await db(tabela).where({ id }).first();
  if (permissao) {
    return {
      id: permissao.id,
      user_email: permissao.user_email,
      tipo_permissao: permissao.tipo_permissao,
    };
  }
  return null;
};

export const update = async (id, dados) => {
  const dadosMapeados = {
    user_email: dados.user_email,
    tipo_permissao: dados.tipo_permissao,
  };
  const [result] = await db(tabela)
    .where({ id })
    .update(dadosMapeados)
    .returning("*");

  if (!result) {
    throw new Error("Nenhum registro foi atualizado.");
  }
  return result;
};

export const patch = async (id, dados) => {
  const dadosMapeados = {};
  if (dados.user_email !== undefined) {
    dadosMapeados.user_email = dados.user_email;
  }
  if (dados.tipo_permissao !== undefined) {
    dadosMapeados.tipo_permissao = dados.tipo_permissao;
  }

  if (Object.keys(dadosMapeados).length === 0) {
    throw new Error("Nenhum dado válido fornecido para atualização parcial.");
  }

  const [result] = await db(tabela)
    .where({ id })
    .update(dadosMapeados)
    .returning("*");

  if (!result) {
    throw new Error("Nenhum registro foi atualizado.");
  }
  return result;
};

export const remove = async (id) => {
  const [result] = await db(tabela).where({ id }).delete().returning("*");

  if (!result) {
    throw new Error("Nenhum registro foi removido.");
  }
  return result;
};

export const repository_permissoes = {
  create,
  findAll,
  findOne,
  update,
  remove,
  patch,
};
