// Classe de erro personalizada
class AppError extends Error {
  constructor(message, statusCode = 500, name = "AppError") {
    super(message);
    this.statusCode = statusCode;
    this.name = name;
    this.isOperational = true; // diz que é um erro operacional conhecido

    Error.captureStackTrace(this, this.constructor);
  }

  static badRequest(message) {
    return new AppError(message, 400, "ValidationError");
  }

  static unauthorized(message = "Não autorizado") {
    return new AppError(message, 401, "UnauthorizedError");
  }

  static notFound(message = "Recurso não encontrado") {
    return new AppError(message, 404, "NotFoundError");
  }

  static conflict(message = "Conflito de dados") {
    return new AppError(message, 409, "ConflictError");
  }
}

export default AppError;
