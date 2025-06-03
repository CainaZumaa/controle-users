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

/*Listar Módulo*/
router.get("/", getAllModulos);
/*Visualizar Módulo*/
router.get("/:id", getModulos);
/*Criar Módulo*/
router.post("/", createModulos);
/*Atualizar Módulo*/
router.put("/:id", updateModulos);
/*Editar Módulo*/
router.patch("/:id", patchModulos);
/*Deletar Módulo*/
router.delete("/:id", deleteModulos);
/*Criar Módulo*/
export default router;
