import express from "express";
import {
  getAllPermissoes,
  getPermissao,
  createPermissoes,
  updatePermissoes,
  patchPermissoes,
  deletePermissoes,
} from "./controller.js";

const router = express.Router();

router.get("/usuarios", getAllPermissoes);
router.get("/usuarios/:id", getPermissao);
router.post("/usuarios", createPermissoes);
router.put("/usuarios/:id", updatePermissoes);
router.patch("/usuarios/:id", patchPermissoes);
router.delete("/usuarios/:id", deletePermissoes);

export default router;