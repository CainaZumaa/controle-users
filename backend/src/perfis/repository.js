import db from "../../db.js";

const tabela = "perfil";

export const create = async (dados) => {
  const dadosMapeados = {
    id_usuario: dados.id_usuario,
    created_at: dados.created_at,
    nome_completo: dados.nome_completo,
    sexo: dados.sexo,
    data_nascimento: dados.data_nascimento,
    endereco: dados.endereco,
    numero: dados.numero,
    complemento: dados.complemento,
    bairro: dados.bairro,
    cidade: dados.cidade,
    cep: dados.cep,
    pais: dados.pais,
  };
  const result = await db(tabela).insert(dadosMapeados).returning("*");

  return result;
};

export const findAll = async () => {
  const perfil = await db(tabela).select("*");

  return perfil.map((perfil) => ({
    id: perfil.id,
    id_usuario: perfil.id_usuario,
    created_at: perfil.created_at,
    nome_completo: perfil.nome_completo,
    sexo: perfil.sexo,
    data_nascimento: perfil.data_nascimento,
    endereco: perfil.endereco,
    numero: perfil.numero,
    complemento: perfil.complemento,
    bairro: perfil.bairro,
    cidade: perfil.cidade,
    cep: perfil.cep,
    pais: perfil.pais,
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
    id_usuario: dados.id_usuario,
    created_at: dados.created_at,
    nome_completo: dados.nome_completo,
    sexo: dados.sexo,
    data_nascimento: dados.data_nascimento,
    endereco: dados.endereco,
    numero: dados.numero,
    complemento: dados.complemento,
    bairro: dados.bairro,
    cidade: dados.cidade,
    cep: dados.cep,
    pais: dados.pais,
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
    created_at: dados.created_at,
    nome_completo: dados.nome_completo,
    sexo: dados.sexo,
    data_nascimento: dados.data_nascimento,
    endereco: dados.endereco,
    numero: dados.numero,
    complemento: dados.complemento,
    bairro: dados.bairro,
    cidade: dados.cidade,
    cep: dados.cep,
    pais: dados.pais,
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
