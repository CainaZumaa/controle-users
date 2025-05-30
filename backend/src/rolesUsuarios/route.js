import express from "express";
import {
  getAllRolesUsuarios,
  getRolesUsuario,
  createRolesUsuario,
  updateRolesUsuario,
  patchRolesUsuario,
  deleteRolesUsuario,
} from "./controller.js";

const router = express.Router();

router.get("/RolesUsuarios", getAllRolesUsuarios);
router.get("/RoleUsuario/:id", getRolesUsuario);
router.post("/RoleUsuario", createRolesUsuario);
router.put("/RoleUsuario/:id", updateRolesUsuario);
router.patch("/RoleUsuario/:id", patchRolesUsuario);
router.delete("/RoleUsuario/:id", deleteRolesUsuario);

export default router;