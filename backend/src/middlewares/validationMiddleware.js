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
  const validation = Validation.validateId(req.params.id);

  if (!validation.isValid) {
    throw new ValidationError(validation.error);
  }

  req.validatedId = validation.value;
  next();
};
