import express from "express";
import {
  getAllModulos,
  getModulos,
  createModulos,
  updateModulos,
  patchModulos,
  deleteModulos,
  incrementar_acessos,
  buscar_modulo_mais_acessado,
  buscar_modulo_menos_acessado
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

router.patch("/:id/acessos", incrementar_acessos);

router.get("/report/most-accessed", buscar_modulo_mais_acessado)

router.get("/report/less-accessed", buscar_modulo_menos_acessado)

export default router;
