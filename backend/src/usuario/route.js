import express from "express";
import { authMiddleware } from "../middlewares/auth.js";
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
router.post("/", createUsuario);

// Rotas Privadas (protegidas)
router.get("/:id", authMiddleware, getUsuario);
router.get("/", authMiddleware, getAllUsuarios);
router.put("/:id", authMiddleware, updateUsuario);
router.patch("/:id", authMiddleware, patchUsuario);
router.delete("/:id", authMiddleware, deleteUsuario);

export default router;
