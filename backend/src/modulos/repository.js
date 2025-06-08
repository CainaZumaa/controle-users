import db from "../../db.js";

const tabela = "modulos";

export const create = async (dados) => {
  const dadosMapeados = {
    nome: dados.nome,
    descricao: dados.descricao,
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
  }));
};

export const findOne = async (id) => {
  const modulos = await db(tabela).where({ id }).first();

  if (modulos) {
    return {
      id: modulos.id,
      nome: modulos.nome,
      descricao: modulos.descricao,
    };
  }
  return null;
};

export const update = async (id, dados) => {
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

export const incrementar_acessos = async (id) => {
  const [modulo] = await db("modulos")  
    .where({ id })
    .increment("acessos", 1)
    .returning("*");
  return modulo
}
export const buscar_modulo_mais_acessado = async() => {
  const modulo = await db("modulos")
  .orderBy("acessos", "DESC")
  .first();
  return modulo
}
export const buscar_modulo_menos_acessado = async() => {
  const modulo = await db("modulos")
  .orderBy("acessos", "ASC")
  .first();
  return modulo
}
export const findByNome = async (nome) => {
  const modulos = await db(tabela)
    .whereILike("nome", `%${nome}%`)
    .select("*");
  return modulos;
};
export const findAllPaginado = async (pagina = 1, limite = 10, ordem = "asc") => {
  const offset = (pagina - 1) * limite;
  const modulos = await db(tabela)
    .select("*")
    .orderBy("id", ordem)
    .limit(limite)
    .offset(offset);
  return modulos;
};
export const contarModulos = async () => {
  const [{ count }] = await db(tabela).count("*");
  return parseInt(count, 10);
};
export const resetarAcessos = async () => {
  await db(tabela).update({ acessos: 0 });
  return { message: "Acessos resetados com sucesso." };
};
export const nomeExiste = async (nome) => {
  const existe = await db(tabela).where({ nome }).first();
  return !!existe;
};
export const buscarUltimosModulos = async (quantidade = 5) => {
  const modulos = await db(tabela)
    .orderBy("id", "desc")
    .limit(quantidade);

  return modulos;
};
export const buscarPorAcessosMinimos = async (minimo = 10) => {
  const modulos = await db(tabela)
    .where("acessos", ">=", minimo)
    .orderBy("acessos", "desc");

  return modulos;
};
async function calcularPorcentagemDeAcessos() {
  const modulos = await db("modulos").select("id", "nome", "acessos");

  const totalAcessos = modulos.reduce((soma, m) => soma + (m.acessos || 0), 0);

  return modulos.map((m) => ({
    id: m.id,
    nome: m.nome,
    acessos: m.acessos,
    porcentagem: totalAcessos > 0 ? Number(((m.acessos / totalAcessos) * 100).toFixed(2)) : 0
  }));
}
export const repository_modulos = {
  create,
  findAll,
  findOne,
  update,
  patch,
  remove,
  incrementar_acessos,
  buscar_modulo_mais_acessado,
  buscar_modulo_menos_acessado,
  findByNome,
  findAllPaginado,
  contarModulos,
  resetarAcessos,
  nomeExiste,
  buscarUltimosModulos,
  buscarPorAcessosMinimos,
  calcularPorcentagemDeAcessos
};
