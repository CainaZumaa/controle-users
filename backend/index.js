import express from "express";
import router from "../backend/src/usuario/route.js";
import { swaggerDocument, swaggerUi } from "./swagger.js";
// @ts-ignore

const app = express();
const port = 3000;

app.use(express.json());
app.use(router);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});
