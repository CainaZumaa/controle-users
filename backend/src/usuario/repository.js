import db from "../../db.js";

const tabela = "usuarios";

export const create = async (dados) => {
  const dadosMapeados = {
    nome: dados.nome,
    email: dados.email,
    senha: dados.senha,
  };
  const result = await db(tabela).insert(dadosMapeados).returning("*");

  return result;
};

export const findAll = async () => {
  const usuarios = await db(tabela).select("*");

  return usuarios.map((usuario) => ({
    id: usuario.id,
    nome: usuario.nome,
    email: usuario.email,
    is_active: usuario.is_active,
    created_at: usuario.created_at,
    last_login: usuario.last_login,
  }));
};

// Novo método para paginação e filtros
export const findAllWithFilters = async (filtros = {}) => {
  const {
    page = 1,
    limit = 10,
    search = "",
    status = null,
    orderBy = "nome",
    orderDirection = "asc",
    dataInicio = null,
    dataFim = null,
  } = filtros;

  const offset = (page - 1) * limit;

  // Construir condições de filtro
  const whereConditions = {};

  if (status !== null && status !== undefined) {
    whereConditions.is_active = status;
  }

  // Query base para aplicar filtros
  let baseQuery = db(tabela);

  // Aplicar filtros de busca
  if (search) {
    baseQuery = baseQuery.where(function () {
      this.where("nome", "ilike", `%${search}%`).orWhere(
        "email",
        "ilike",
        `%${search}%`
      );
    });
  }

  // Aplicar filtros de status
  if (Object.keys(whereConditions).length > 0) {
    baseQuery = baseQuery.where(whereConditions);
  }

  // Aplicar filtros de data
  if (dataInicio) {
    baseQuery = baseQuery.where("created_at", ">=", dataInicio);
  }

  if (dataFim) {
    baseQuery = baseQuery.where("created_at", "<=", dataFim);
  }

  // Contar total de registros (query separada)
  const countResult = await baseQuery.clone().count("* as total").first();
  const totalCount = parseInt(countResult.total);

  // Buscar dados com ordenação e paginação
  const usuarios = await baseQuery
    .select("*")
    .orderBy(orderBy, orderDirection)
    .limit(limit)
    .offset(offset);

  return {
    usuarios: usuarios.map((usuario) => ({
      id: usuario.id,
      nome: usuario.nome,
      email: usuario.email,
      is_active: usuario.is_active,
      created_at: usuario.created_at,
      last_login: usuario.last_login,
    })),
    pagination: {
      page: parseInt(page),
      limit: parseInt(limit),
      total: totalCount,
      totalPages: Math.ceil(totalCount / limit),
      hasNext: page * limit < totalCount,
      hasPrev: page > 1,
    },
  };
};

export const findOne = async (id) => {
  const usuario = await db(tabela).where({ id }).first();

  if (usuario) {
    return usuario;
  }
  return null;
};

export const findByEmail = async (email) => {
  const usuario = await db(tabela).where({ email }).first();
  return usuario;
};

export const update = async (id, dados) => {
  const dadosMapeados = {
    nome: dados.nome,
    email: dados.email,
    is_active: dados.is_active,
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
    email: dados.email,
    is_active: dados.is_active,
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

export const updateLastLogin = async (userId) => {
  return await db(tabela).where({ id: userId }).update({
    last_login: new Date(),
  });
};

// regra de negócio
export const blockInactiveUsers = async () => {
  const thirtyDaysAgo = new Date();
  thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

  return await db(tabela)
    .where("is_active", true)
    .where("last_login", "<", thirtyDaysAgo)
    .orWhereNull("last_login")
    .update({
      is_active: false,
    });
};

export const repository_usuarios = {
  create,
  findAll,
  findAllWithFilters,
  findOne,
  findByEmail,
  update,
  patch,
  remove,
  updateLastLogin,
};
