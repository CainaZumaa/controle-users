// auth/routes.js
import express from "express";
import { login } from "../usuario/authController.js";
import { magicAuthController } from "../magicAuth/controller.js";
import { tokenValidationController, googleLogin } from "./auth.controller.js";
import { auditLogin } from "../middlewares/auditoria.js";

const router = express.Router();

// Rotas de Autenticação
router.post("/login", auditLogin, login);

// Login com Google
router.post("/google", googleLogin);

// Magic Link
router.post("/magic", magicAuthController.requestMagicLink);

// Rotas de Validação de Token (outras equipes)
router.post("/validate", tokenValidationController.validateToken);
router.post("/check", tokenValidationController.checkToken);

export default router;
