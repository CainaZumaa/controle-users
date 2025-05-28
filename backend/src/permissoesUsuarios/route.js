import express from "express";
import {
  getAllPermissoesUsuarios,
  getPermissaoUsuario,
  createPermissaoUsuario,
  updatePermissaoUsuario,
  patchPermissaoUsuario,
  deletePermissaoUsuario,
} from "./controller.js";

const router = express.Router();

router.get("/PermissoesUsuarios", getAllPermissoesUsuarios);
router.get("/PermissaoUsuario/:id", getPermissaoUsuario);
router.post("/PermissaoUsuario", createPermissaoUsuario);
router.put("/PermissaoUsuario/:id", updatePermissaoUsuario);
router.patch("/PermissaoUsuario/:id", patchPermissaoUsuario);
router.delete("/PermissaoUsuario/:id", deletePermissaoUsuario);

export default router;