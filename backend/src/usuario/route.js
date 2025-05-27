import express from "express";
import {
  getAllUsuarios,
  getUsuario,
  createUsuario,
  updateUsuario,
  patchUsuario,
  deleteUsuario,
} from "./controller.js";

const router = express.Router();

router.get("/usuarios", getAllUsuarios);
router.get("/usuarios/:id", getUsuario);
router.post("/usuarios", createUsuario);
router.put("/usuarios/:id", updateUsuario);
router.patch("/usuarios/:id", patchUsuario);
router.delete("/usuarios/:id", deleteUsuario);

export default router;
