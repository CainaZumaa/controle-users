import db from "../../db";

const tabela = "Usuarios";

export const create = async (dados) => {
  await db(tabela).insert({});
};

export const findAll = async () => {
  return await db(tabela).select("*");
};

export const findOne = async (id) => {
  return await db(tabela).where({ id: id }).first();
};

export const update = async (id, dados) => {
  await db(tabela).where({ id: id }).update({});
};

export const remove = async (id) => {
  await db(tabela).where({ id: id }).delete();
};

export const repository_usuarios = {
  create,
  findAll,
  findOne,
  update,
  remove,
};
