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

router.get("/", getAllRoles);
router.get("/:id", getRole);
router.post("/", createRole);
router.put("/:id", updateRole);
router.patch("/:id", patchRole);
router.delete("/:id", deleteRole);

export default router;
