// @ts-nocheck
import jwt from "jsonwebtoken";
import { usuariosService } from "../usuario/service.js";

function formatDateTime(date) {
  return date.toLocaleString("pt-BR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false,
  });
}

export const tokenValidationController = {
  validateToken: async (req, res) => {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({
        valid: false,
        error: "Token não fornecido",
      });
    }

    const token = authHeader.split(" ")[1];

    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      const usuario = await usuariosService.findOne(decoded.sub);

      if (!usuario) {
        return res.status(401).json({
          valid: false,
          error: "Usuário não encontrado",
        });
      }

      if (!usuario.is_active) {
        return res.status(401).json({
          valid: false,
          error: "Usuário inativo",
        });
      }

      const issuedAt = new Date(decoded.iat * 1000);
      const expiresAt = new Date(decoded.exp * 1000);
      const currentTimestamp = Math.floor(Date.now() / 1000);
      const expiresInSeconds = decoded.exp - currentTimestamp;

      res.json({
        valid: true,
        user: {
          id: decoded.sub,
          email: decoded.email,
          is_active: decoded.is_active,
        },
        token_info: {
          issued_at: formatDateTime(issuedAt),
          expires_at: formatDateTime(expiresAt),
          expires_in_seconds: expiresInSeconds,
        },
      });
    } catch (error) {
      let errorMessage = "Token inválido";

      if (error.name === "TokenExpiredError") {
        errorMessage = "Token expirado";
      } else if (error.name === "JsonWebTokenError") {
        errorMessage = "Token malformado";
      }

      res.status(401).json({
        valid: false,
        error: errorMessage,
      });
    }
  },

  checkToken: async (req, res) => {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.json({ valid: false });
    }

    const token = authHeader.split(" ")[1];

    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      const usuario = await usuariosService.findOne(decoded.sub);

      res.json({
        valid: !!(usuario && usuario.is_active),
      });
    } catch (error) {
      res.json({ valid: false });
    }
  },
};
