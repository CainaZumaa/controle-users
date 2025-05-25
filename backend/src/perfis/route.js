import express from "express";

import {
  getAllPerfis,
  getPerfil,
  createPerfil,
  updatePerfil,
  patchPerfil,
  deletePerfil,
} from "./controller.js";

const router = express.Router();

router.get("/perfis/:id", getPerfil);
router.get("/perfis", getAllPerfis);
router.get("/perfis/:id",createPerfil)
router.put("/perfis/:id", updatePerfil);
router.patch("/perfis/:id", patchPerfil);
router.delete("/perfil/:id", deletePerfil);

export default router;