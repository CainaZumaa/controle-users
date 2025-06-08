const errorHandler = (err, req, res, next) => {
  console.error("Erro:", {
    message: err.message,
    stack: err.stack,
    path: req.path,
    method: req.method,
  });

  // Erros de validação
  if (err.name === "ValidationError") {
    return res.status(400).json({
      error: "Erro de validação",
      details: err.message,
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
  if (err.name === "NotFoundError") {
    return res.status(404).json({
      error: "Não encontrado",
      message: err.message,
    });
  }

  // Erros de banco de dados
  if (err.code === "23505") {
    // Código de erro de chave única violada no Postgres
    return res.status(409).json({
      error: "Conflito",
      message: "Registro já existe",
    });
  }

  // Erro genérico para outros casos
  res.status(500).json({
    error: "Erro interno do servidor",
    message:
      process.env.NODE_ENV === "development"
        ? err.message
        : "Ocorreu um erro inesperado",
  });
};

export default errorHandler;
