import db from "../../db.js";

const tabela = "permissoes";

export const create = async (dados) => {
  const dadosMapeados = {
    nome: dados.nome,
    descricao: dados.descricao,
    inserir:dados.inserir,
    editar:dados.editar,
    deletar: dados.deletar,
    ler:dados.ler
  };
  const result = await db(tabela).insert(dadosMapeados).returning("*");

  return result;
};

export const findAll = async () => {
  const modulos = await db(tabela).select("*");

  return modulos.map((modulos) => ({
    id: modulos.id,
    nome: modulos.nome,
    descricao: modulos.descricao,
    criado_em: modulos.criado_em,
    inserir:modulos.inserir,
    editar:modulos.editar,
    deletar: modulos.deletar,
    ler:modulos.ler
  }));
};

export const findOne = async (id) => {
  const modulos = await db(tabela).where({ id }).first();

  if (modulos) {
    return {
      id: modulos.id,
      descricao: modulos.descricao,
      nome: modulos.nome,
      criado_em: modulos.criado_em,
      inserir:modulos.inserir,
      editar:modulos.editar,
      deletar: modulos.deletar,
      ler:modulos.ler
    };
  }
  return null;
};

export const update = async (id, dados) => {
  const dadosMapeados = {
    nome: dados.nome,
    descricao: dados.descricao,
    inserir:dados.inserir,
    editar:dados.editar,
    deletar: dados.deletar,
    ler:dados.ler
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
    inserir:dados.inserir,
    editar:dados.editar,
    deletar: dados.deletar,
    ler:dados.ler
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

export const repository_permissoes = {
  create,
  findAll,
  findOne,
  update,
  remove,
};
