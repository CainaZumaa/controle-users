import express from "express";
import {
  getAllPermissoesUsuario,
  getPermissaoUsuario,
  createPermissoesUsuario,
  updatePermissoesUsuario,
  patchPermissoesUsuario,
  deletePermissoesUsuario,
} from "./controller.js";

const router = express.Router();

router.get("/usuarios", getAllPermissoesUsuario);
router.get("/usuarios/:id", getPermissaoUsuario);
router.post("/usuarios", createPermissoesUsuario);
router.put("/usuarios/:id", updatePermissoesUsuario);
router.patch("/usuarios/:id", patchPermissoesUsuario);
router.delete("/usuarios/:id", deletePermissoesUsuario);

export default router;