import express from "express";
import {
  getAllRolesPermissoes,
  getRolePermissao,
  createRolePermissao,
  updateRolePermissao,
  patchRolePermissao,
  deleteRolePermissao,
} from "./controller.js";

const router = express.Router();

router.get("/RolesPermissoes", getAllRolesPermissoes);
router.get("/RolePermissao/:id", getRolePermissao);
router.post("/RolePermissao", createRolePermissao);
router.put("/RolePermissao/:id", updateRolePermissao);
router.patch("/RolePermissao/:id", patchRolePermissao);
router.delete("/RolePermissao/:id", deleteRolePermissao);

export default router;