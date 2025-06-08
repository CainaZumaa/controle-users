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

router.get("/", getAllPermissoes);
router.get("/:id", getPermissao);
router.post("/", createPermissao);
router.put("/:id", updatePermissao);
router.patch("/:id", patchPermissao);
router.delete("/:id", deletePermissao);

export default router;
