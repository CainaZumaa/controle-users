import db from "../../db.js";

const tabela = "permissoesUsuario";
const tabelaPermissao = "permissoes";
const tabelaUsuarios = "usuarios";

export const create = async (dados) => {
  const dadosMapeados = {
    id_usuario: dados.id_usuario,
    id_permissao: dados.id_permissao    
  };
  const result = await db(tabela).insert(dadosMapeados).returning("*");

  return result;
};

export const findAll = async () => {
  const modulos = await db("permissoesUsuario")
    .join("permissoes", "permissoesUsuario.id_permissao", "permissoes.id")
    .join("usuarios","permissoesUsuario.id_usuario","usuarios.id")
    .select("*");

    if (!modulos) {
      return null;
         
    };

  return modulos
};

export const findOne = async (id) => {
  const modulos = await db("permissoesUsuario")
    .join("permissoes", "permissoesUsuario.id_permissao", "permissoes.id")
    .join("usuarios","permissoesUsuario.id_usuario","usuarios.id")
    .where("usuarios.id", id)
    .select("*");

    if (!modulos) {
      return null;
         
    };

  return modulos
};

export const update = async (id, dados) => {
  const dadosMapeados = {
        id_usuario: dados.id_usuario,
        id_permissao: dados.id_permissao 
};

  const result = await db(tabela)
    .where({ id_permissao: id  })
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
    .where({id_permissao: id })
    .update(dadosMapeados)
    .returning("*");

  if (!result || result.length === 0) {
    throw new Error("Nenhum registro foi atualizado.");
  }
  return result[0];
};

export const remove = async (id) => {
  const result = await db(tabela).where({ id: id  }).delete().returning("*");

  if (!result || result.length === 0) {
    throw new Error("Nenhum registro foi removido.");
  }
  return result[0];
};

export const repository_permissoesUsuario = {
  create,
  findAll,
  findOne,
  update,
  patch,
  remove,
};
