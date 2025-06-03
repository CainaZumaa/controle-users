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

router.get("/:id", getPerfil);
router.get("/", getAllPerfis);
router.post("/:id", createPerfil);
router.put("/:id", updatePerfil);
router.patch("/:id", patchPerfil);
router.delete("/:id", deletePerfil);

export default router;
