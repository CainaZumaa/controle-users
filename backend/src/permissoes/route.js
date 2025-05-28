import express from "express";
import {
  getAllPermissoes,
  getPermissao,
  createPermissao,
  updatePermissao,
  patchPermissao,
  deletePermissao,
} from "./controller.js";

const router = express.Router();

router.get("/permissoes", getAllPermissoes);
router.get("/permissao/:id", getPermissao);
router.post("/permissao", createPermissao);
router.put("/permissao/:id", updatePermissao);
router.patch("/permissao/:id", patchPermissao);
router.delete("/permissao/:id", deletePermissao);

export default router;