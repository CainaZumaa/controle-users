import express from "express";
import { login } from "./authController.js";
import { authMiddleware } from "../middlewares/auth.js";
import { magicAuthController } from "../magicAuth/controller.js";
import {
  getAllUsuarios,
  getUsuario,
  createUsuario,
  updateUsuario,
  patchUsuario,
  deleteUsuario,
} from "./controller.js";
import { checkPasswordStrength } from "../passwordCheckController/passwordController.js";

const router = express.Router();

// Magic Link Routes
router.post("/auth/magic", magicAuthController.requestMagicLink);

// Rotas Públicas

router.post("/login", login);
router.post("/usuarios", createUsuario);

// Rotas Privadas (protegidas)
router.get("/usuarios/:id", authMiddleware, getUsuario);
router.get("/usuarios", authMiddleware, getAllUsuarios);
router.put("/usuarios/:id", authMiddleware, updateUsuario);
router.patch("/usuarios/:id", authMiddleware, patchUsuario);
router.delete("/usuarios/:id", authMiddleware, deleteUsuario);

router.use("/", checkPasswordStrength);

export default router;
