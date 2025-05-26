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

router.get("/permissao", getAllPermissoes);
router.get("/permissao/:id", getPermissao);
router.post("/permissao", createPermissoes);
router.put("/permissao/:id", updatePermissoes);
router.patch("/permissao/:id", patchPermissoes);
router.delete("/permissao/:id", deletePermissoes);

export default router;