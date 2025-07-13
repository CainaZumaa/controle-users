// @ts-nocheck
import { Validation } from "../validators/validation.js";
import { ValidationError } from "../utils/errors.js";

export const validateCreateUsuario = (req, res, next) => {
  const validation = Validation.validateCreateUsuario(req.body);

  if (!validation.isValid) {
    if (validation.details) {
      throw new ValidationError(validation.error, validation.details);
    }

    throw new ValidationError("Dados inválidos", validation.errors);
  }

  req.validatedData = validation.data;
  next();
};

export const validateUpdateUsuario = (req, res, next) => {
  const validation = Validation.validateUpdateUsuario(req.body);

  if (!validation.isValid) {
    if (validation.details) {
      throw new ValidationError(validation.error, validation.details);
    }

    throw new ValidationError("Dados inválidos", validation.errors);
  }

  req.validatedData = validation.data;
  next();
};

export const validateId = (req, res, next) => {
  const { id } = req.params;
  const validation = Validation.validateId(id);

  if (!validation.isValid) {
    throw new ValidationError("ID inválido", validation.error);
  }

  req.validatedId = validation.value;
  next();
};

// Novo middleware para validar filtros de usuários
export const validateUserFilters = (req, res, next) => {
  const {
    page = 1,
    limit = 10,
    search = "",
    status,
    orderBy = "nome",
    orderDirection = "asc",
    dataInicio,
    dataFim,
  } = req.query;

  const errors = [];

  const pageNum = parseInt(page);
  if (isNaN(pageNum) || pageNum < 1) {
    errors.push("page deve ser um número maior que 0");
  }

  const limitNum = parseInt(limit);
  if (isNaN(limitNum) || limitNum < 1 || limitNum > 100) {
    errors.push("limit deve ser um número entre 1 e 100");
  }

  if (search && typeof search !== "string") {
    errors.push("search deve ser uma string");
  }

  if (status !== undefined && status !== null) {
    if (!["true", "false", "1", "0"].includes(status)) {
      errors.push("status deve ser 'true', 'false', '1' ou '0'");
    }
  }

  const allowedOrderBy = [
    "nome",
    "email",
    "created_at",
    "last_login",
    "is_active",
    "id",
  ];
  if (!allowedOrderBy.includes(orderBy)) {
    errors.push(
      `orderBy deve ser um dos seguintes valores: ${allowedOrderBy.join(", ")}`
    );
  }

  if (!["asc", "desc"].includes(orderDirection.toLowerCase())) {
    errors.push("orderDirection deve ser 'asc' ou 'desc'");
  }

  if (dataInicio) {
    const dataInicioDate = new Date(dataInicio);
    if (isNaN(dataInicioDate.getTime())) {
      errors.push("dataInicio deve ser uma data válida (YYYY-MM-DD)");
    }
  }

  if (dataFim) {
    const dataFimDate = new Date(dataFim);
    if (isNaN(dataFimDate.getTime())) {
      errors.push("dataFim deve ser uma data válida (YYYY-MM-DD)");
    }
  }

  if (dataInicio && dataFim) {
    const dataInicioDate = new Date(dataInicio);
    const dataFimDate = new Date(dataFim);
    if (dataInicioDate > dataFimDate) {
      errors.push("dataInicio deve ser menor ou igual a dataFim");
    }
  }

  if (errors.length > 0) {
    throw new ValidationError("Filtros inválidos", errors);
  }

  req.validatedFilters = {
    page: pageNum,
    limit: limitNum,
    search: search.trim(),
    status:
      status !== undefined
        ? status === "true" || status === "1"
          ? true
          : false
        : null,
    orderBy,
    orderDirection: orderDirection.toLowerCase(),
    dataInicio: dataInicio || null,
    dataFim: dataFim || null,
  };

  next();
};
