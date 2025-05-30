import express from "express";
import {
  getAllRoles,
  getRole,
  createRole,
  updateRole,
  patchRole,
  deleteRole,
} from "./controller.js";

const router = express.Router();

router.get("/Roles", getAllRoles);
router.get("/Role/:id", getRole);
router.post("/Role", createRole);
router.put("/Role/:id", updateRole);
router.patch("/Role/:id", patchRole);
router.delete("/Role/:id", deleteRole);

export default router;