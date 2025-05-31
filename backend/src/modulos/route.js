import express from "express";
import {
  getAllModulos,
  getModulos,
  createModulos,
  updateModulos,
  patchModulos,
  deleteModulos,
} from "./controller.js";

const router = express.Router();

router.get("/Modulos", getAllModulos);
router.get("/Modulos/:id", getModulos);
router.post("/Modulos", createModulos);
router.put("/Modulos/:id", updateModulos);
router.patch("/Modulos/:id", patchModulos);
router.delete("/Modulos/:id", deleteModulos);

export default router;