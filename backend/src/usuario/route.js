import express from "express";
import { register, login } from "./authController.js";
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
router.post("/register", register);
router.post("/login", login);
router.post("/usuarios", createUsuario);

// Rotas Privadas (protegidas)
router.get("/usuarios/:id", authMiddleware, getUsuario);
router.get("/usuarios", authMiddleware, getAllUsuarios);
router.put("/usuarios/:id", authMiddleware, updateUsuario);
router.patch("/usuarios/:id", authMiddleware, patchUsuario);
router.delete("/usuarios/:id", authMiddleware, deleteUsuario);

export default router;
