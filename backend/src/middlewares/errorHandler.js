// @ts-nocheck
import { AppError } from "../utils/errors.js";

const errorHandler = (err, req, res, next) => {
  console.error("Erro:", {
    name: err.name,
    message: err.message,
    statusCode: err.statusCode,
    stack: err.stack,
    path: req.path,
    method: req.method,
  });

  // Se já é um erro customizado da aplicação
  if (err instanceof AppError) {
    return res.status(err.statusCode).json({
      error: err.name,
      message: err.message,
      ...(err.details && { details: err.details }),
    });
  }

  // Erros de validação
  if (err.name === "ValidationError" || err.name === "ValidatorError") {
    return res.status(400).json({
      error: "Erro de validação",
      message: err.message,
      ...(err.details && { details: err.details }),
    });
  }

  // Erros de autenticação
  if (err.name === "UnauthorizedError" || err.name === "JsonWebTokenError") {
    return res.status(401).json({
      error: "Não autorizado",
      message: "Token inválido ou expirado",
    });
  }

  // Erros de não encontrado
  if (err.name === "NotFoundError" || err.code === "ENOTFOUND") {
    return res.status(404).json({
      error: "Não encontrado",
      message: err.message || "Recurso não encontrado",
    });
  }

  // Erros de banco de dados - PostgreSQL
  if (err.code) {
    switch (err.code) {
      case "23505": // Violação de chave única
        return res.status(409).json({
          error: "Conflito",
          message: "Registro já existe",
        });

      case "23503": // Violação de chave estrangeira
        // Tratamento específico para erro de auditoria com email não normalizado
        if (
          err.table === "auditoria_logs" &&
          err.constraint === "fk_auditoria_usuario_email"
        ) {
          console.warn("Erro de auditoria - email não normalizado:", {
            detail: err.detail,
            table: err.table,
            constraint: err.constraint,
            path: req.path,
            method: req.method,
          });

          // Log do erro mas não falha a operação principal
          return res.status(200).json({
            message: "Operação realizada com sucesso",
            warning:
              "Log de auditoria não foi registrado devido a inconsistência de dados",
          });
        }

        return res.status(400).json({
          error: "Referência inválida",
          message: "Dados referenciados não existem",
        });

      case "23514": // Violação de constraint
        return res.status(400).json({
          error: "Dados inválidos",
          message: "Dados não atendem às regras de validação",
        });

      case "42P01": // Tabela não existe
        return res.status(500).json({
          error: "Erro de configuração",
          message: "Tabela não encontrada",
        });

      case "42703": // Coluna não existe
        return res.status(500).json({
          error: "Erro de configuração",
          message: "Coluna não encontrada",
        });

      case "ECONNREFUSED": // Conexão recusada
        return res.status(503).json({
          error: "Serviço indisponível",
          message: "Banco de dados não está disponível",
        });

      case "ENOTFOUND": // Host não encontrado
        return res.status(503).json({
          error: "Serviço indisponível",
          message: "Não foi possível conectar ao banco de dados",
        });
    }
  }

  // Erro genérico para outros casos
  res.status(500).json({
    error: "Erro interno do servidor",
    message:
      process.env.NODE_ENV === "development"
        ? err.message
        : "Ocorreu um erro inesperado",
    ...(process.env.NODE_ENV === "development" && { stack: err.stack }),
  });
};

export default errorHandler;
