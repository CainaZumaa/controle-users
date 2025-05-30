import db from "../../db.js";

const tabela = "rolesPermissoes";
const tabelaPermissao = "permissoes";
const tabelaRoles = "roles";

export const create = async (dados) => {
  const dadosMapeados = {
    id_role: dados.id_role,
    id_permissao: dados.id_permissao    
  };
  const result = await db(tabela).insert(dadosMapeados).returning("*");

  return result;
};

export const findAll = async () => {
  const modulos = await db("rolesPermissoes")
    .join("permissoes", "rolesPermissoes.id_permissao", "permissoes.id")
    .join("roles","rolesPermissoes.id_usuario","roles.id")
    .select("*");

    if (!modulos) {
      return null;
         
    };

  return modulos
};

export const findOne = async (id) => {
  const modulos = await db("rolesPermissoes")
    .join("permissoes", "rolesPermissoes.id_permissao", "permissoes.id")
    .join("roles","rolesPermissoes.id_usuario","roles.id")
    .where("usuarios.id", id)
    .select("*");

    if (!modulos) {
      return null;
         
    };

  return modulos
};

export const update = async (id, dados) => {
  const dadosMapeados = {
        id_role: dados.id_role,
        id_permissao: dados.id_permissao 
};

  const result = await db(tabela)
    .where({ id_role: id  })
    .update(dadosMapeados)
    .returning("*");

  if (!result || result.length === 0) {
    throw new Error("Nenhum registro foi atualizado.");
  }
  return result[0];
};

export const patch = async (id, dados) => {
  const dadosMapeados = {
        id_role: dados.id_role,
        id_permissao: dados.id_permissao
  };

  const result = await db(tabela)
    .where({id_role: id })
    .update(dadosMapeados)
    .returning("*");

  if (!result || result.length === 0) {
    throw new Error("Nenhum registro foi atualizado.");
  }
  return result[0];
};

export const remove = async (id) => {
  const result = await db(tabela).where({ id_role: id  }).delete().returning("*");

  if (!result || result.length === 0) {
    throw new Error("Nenhum registro foi removido.");
  }
  return result[0];
};

export const repository_rolesPermissoes = {
  create,
  findAll,
  findOne,
  update,
  patch,
  remove,
};
