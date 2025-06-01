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

router.get("/", getAllModulos);
router.get("/:id", getModulos);
router.post("/", createModulos);
router.put("/:id", updateModulos);
router.patch("/:id", patchModulos);
router.delete("/:id", deleteModulos);

export default router;
