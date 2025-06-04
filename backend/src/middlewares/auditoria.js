// @ts-nocheck
import { AuditoriaService } from "../auditoria/service.js";
import db from "../../db.js";

const auditoriaService = new AuditoriaService();

export const auditMiddleware = (tabela, operacao = "auto") => {
  return async (req, res, next) => {
    if (["PUT", "PATCH", "DELETE"].includes(req.method) && req.params.id) {
      try {
        const dbConnection = await db;
        const dadosOriginais = await dbConnection
          .default(tabela)
          .where("id", req.params.id)
          .first();
        req.dadosOriginais = dadosOriginais;
      } catch (error) {
        console.warn("Erro ao capturar dados originais para auditoria:", error);
      }
    }

    const originalSend = res.send;
    res.send = function (data) {
      setImmediate(async () => {
        try {
          const usuario_email = req.user?.email || null;
          let acao = operacao;

          if (operacao === "auto") {
            switch (req.method) {
              case "POST":
                acao = "CREATE";
                break;
              case "PUT":
              case "PATCH":
                acao = "UPDATE";
                break;
              case "DELETE":
                acao = "DELETE";
                break;
              case "GET":
                acao = "READ";
                break;
              default:
                acao = req.method;
            }
          }

          if (res.statusCode >= 200 && res.statusCode < 300) {
            let dados_novos = null;
            try {
              const responseData = JSON.parse(data);
              dados_novos = responseData.data || responseData;
            } catch (e) {
              console.warn("Erro ao parsear dados da resposta:", e);
            }

            await auditoriaService.criarLog({
              usuario_email,
              acao,
              tabela_afetada: tabela,
              dados_anteriores: req.dadosOriginais || null,
              dados_novos,
              user_agent: req.headers["user-agent"] || null,
            });
          }
        } catch (error) {
          console.error("Erro na auditoria automática:", error);
        }
      });

      return originalSend.call(this, data);
    };

    next();
  };
};

export const auditCreate = (tabela) => auditMiddleware(tabela, "CREATE");
export const auditUpdate = (tabela) => auditMiddleware(tabela, "UPDATE");
export const auditDelete = (tabela) => auditMiddleware(tabela, "DELETE");
export const auditRead = (tabela) => auditMiddleware(tabela, "READ");

// Middleware para auditoria de login
export const auditLogin = async (req, res, next) => {
  const originalSend = res.send;
  res.send = function (data) {
    setImmediate(async () => {
      try {
        const responseData = JSON.parse(data);
        const sucesso = res.statusCode === 200 && responseData.success;
        const usuario_email = req.body.email || null;

        await auditoriaService.logLogin(usuario_email, sucesso, req);
      } catch (error) {
        console.error("Erro na auditoria de login:", error);
      }
    });

    return originalSend.call(this, data);
  };

  next();
};
