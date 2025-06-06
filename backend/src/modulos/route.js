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
  buscar_modulo_menos_acessado,
  paginacao,
  buscarPorNome,
  contar,
  ultimos,
  acessosMinimos,
  resetar,
  nomeExiste,
  porcentagemAcessos,
} from "./controller.js";

const router = express.Router();

/*Listar Módulo*/
router.get("/", getAllModulos);
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

router.get("/paginado", paginacao);

router.get("/buscar", buscarPorNome);

router.get("/contar", contar);

router.get("/nome-existe", nomeExiste);

router.get("/ultimos", ultimos);

router.get("/acessos-minimos", acessosMinimos);

router.post("/resetar-acessos", resetar);

router.get("/porcentagem-acessos", porcentagemAcessos);

/*Visualizar Módulo*/
router.get("/:id", getModulos);

export default router;
