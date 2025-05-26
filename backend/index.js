import express from "express";
import router from "../backend/src/usuario/route.js";
// @ts-ignore
import nodemailer from "nodemailer";

const app = express();
const port = 3000;

app.use(express.json());
app.use(router);

app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});
