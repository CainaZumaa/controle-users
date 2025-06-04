import express from "express";
import { authMiddleware } from "../middlewares/auth.js";
import { 
  auditCreate, 
  auditRead, 
  auditUpdate, 
  auditDelete 
} from "../middlewares/auditoria.js";
import {
  getAllUsuarios,
  getUsuario,
  createUsuario,
  updateUsuario,
  patchUsuario,
  deleteUsuario,
} from "./controller.js";

const router = express.Router();

// Rotas Públicas
router.post("/", auditCreate('usuarios'), createUsuario);

// Rotas Privadas (protegidas)
router.get("/:id", 
  authMiddleware, 
  auditRead('usuarios'), 
  getUsuario
);

router.get("/", 
  authMiddleware, 
  auditRead('usuarios'), 
  getAllUsuarios
);

router.put("/:id", 
  authMiddleware, 
  auditUpdate('usuarios'), 
  updateUsuario
);

router.patch("/:id", 
  authMiddleware, 
  auditUpdate('usuarios'), 
  patchUsuario
);

router.delete("/:id", 
  authMiddleware, 
  auditDelete('usuarios'), 
  deleteUsuario
);

export default router;
