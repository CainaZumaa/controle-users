import express from "express";

import {
  getAllNotificacoes,
  getNotificacao,
  createNotificacao,
  updateNotificacao,
  patchNotificacao,
  deleteNotificacao,
} from "./controller.js";

const router = express.Router();

router.get("/Notificacoes/:id", getNotificacao);
router.get("/Notificacoes", getAllNotificacoes);
router.post("/Notificacoes/:id", createNotificacao);
router.put("/Notificacoes/:id", updateNotificacao);
router.patch("/Notificacoes/:id", patchNotificacao);
router.delete("/Notificacoes/:id", deleteNotificacao);

export default router;
