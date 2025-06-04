import express from "express";
import { ComentariosController } from "./controller.js";
import { authMiddleware } from "../middlewares/auth.js";

const router = express.Router();
const controller = new ComentariosController();

router.use(authMiddleware);

router.post("/", controller.criarComentario.bind(controller));
router.get("/", controller.listarComentarios.bind(controller));
router.get("/:id", controller.buscarComentario.bind(controller));
router.put("/:id", controller.atualizarComentario.bind(controller));
router.delete("/:id", controller.deletarComentario.bind(controller));

// Rotas específicas
router.get(
  "/user/:email",
  controller.buscarComentariosPorUsuario.bind(controller)
);
router.get("/tipo/:tipo", controller.buscarComentariosPorTipo.bind(controller));

export default router;
