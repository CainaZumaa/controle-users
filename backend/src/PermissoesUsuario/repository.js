import db from "../../db.js";

const tabela = "permissoesUsuario";

export const create = async (dados) => {
  const dadosMapeados = {
    id_usuario: dados.id_usuario,
    id_permissao: dados.id_permissao    
  };
  const result = await db(tabela).insert(dadosMapeados).returning("*");

  return result;
};

export const findAll = async () => {
  const modulos = await db(tabela).select("*");

  return modulos.map((modulos) => ({
    id_usuario: modulos.id_usuario,
    id_permissao: modulos.id_permissao 
  }));
};

export const findOne = async (id) => {
  const modulos = await db(tabela).where({ id }).first();

  if (modulos) {
    return {
        id_usuario: modulos.id_usuario,
        id_permissao: modulos.id_permissao 
    };
  }
  return null;
};

export const update = async (id, dados) => {
  const dadosMapeados = {
        id_usuario: dados.id_usuario,
        id_permissao: dados.id_permissao 
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
        id_usuario: dados.id_usuario,
        id_permissao: dados.id_permissao
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

export const findPermissoesDoUsuario = async (id_usuario) => {
  return await db("permissoesUsuario as pu")
    .join("permissoes as p", "pu.id_permissao", "p.id")
    .where("pu.id_usuario", id_usuario)
    .select(
      "p.id",
      "p.nome",
      "p.descricao",
      "p.inserir",
      "p.editar",
      "p.deletar",
      "p.ler"
    );
};

export const repository_permissoesUsuario = {
  create,
  findAll,
  findOne,
  update,
  remove,
  findPermissoesDoUsuario

};