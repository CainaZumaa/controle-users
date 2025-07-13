import express from "express";
import { authMiddleware } from "../middlewares/auth.js";
import {
  auditCreate,
  auditRead,
  auditUpdate,
  auditDelete,
} from "../middlewares/auditoria.js";
import {
  validateCreateUsuario,
  validateUpdateUsuario,
  validateId,
  validateUserFilters,
} from "../middlewares/validationMiddleware.js";
import {
  getAllUsuarios,
  getAllUsuariosWithFilters,
  getUsuario,
  createUsuario,
  updateUsuario,
  patchUsuario,
  deleteUsuario,
} from "./controller.js";

const router = express.Router();

// Rotas Públicas
router.post("/", validateCreateUsuario, auditCreate("usuarios"), createUsuario);

// Rotas Privadas (protegidas)
router.get(
  "/:id",
  validateId,
  authMiddleware,
  auditRead("usuarios"),
  getUsuario
);

// Nova rota para listar usuários com filtros e paginação
router.get(
  "/",
  validateUserFilters,
  authMiddleware,
  auditRead("usuarios"),
  getAllUsuariosWithFilters
);

// Rota antiga mantida para compatibilidade (será removida em versão futura)
router.get("/all", authMiddleware, auditRead("usuarios"), getAllUsuarios);

router.put(
  "/:id",
  validateId,
  validateUpdateUsuario,
  authMiddleware,
  auditUpdate("usuarios"),
  updateUsuario
);

router.patch(
  "/:id",
  validateId,
  authMiddleware,
  auditUpdate("usuarios"),
  patchUsuario
);

router.delete(
  "/:id",
  validateId,
  authMiddleware,
  auditDelete("usuarios"),
  deleteUsuario
);

export default router;
