// @ts-nocheck
import jwt from "jsonwebtoken";
import { usuariosService } from "../usuario/service.js";
import { OAuth2Client } from "google-auth-library";
import { throwConflict } from "../utils/errors.js";

const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

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
  validateToken: async (req, res, next) => {
    try {
      const authHeader = req.headers.authorization;

      if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return res.status(401).json({
          valid: false,
          error: "Token não fornecido",
        });
      }

      const token = authHeader.split(" ")[1];

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
      next(error);
    }
  },

  checkToken: async (req, res, next) => {
    try {
      const authHeader = req.headers.authorization;

      if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return res.json({ valid: false });
      }

      const token = authHeader.split(" ")[1];

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

export const googleLogin = async (req, res, next) => {
  try {
    const { access_token } = req.body;
    if (!access_token) {
      return res
        .status(400)
        .json({ success: false, error: "access_token é obrigatório" });
    }

    // Verifica o token com o Google
    const ticket = await client.getTokenInfo(access_token);
    const email = ticket.email;
    const nome = ticket.name || ticket.email.split("@")[0];
    const foto_perfil = ticket.picture || null;

    if (!email) {
      return res
        .status(400)
        .json({ success: false, error: "Token Google inválido (sem email)" });
    }

    // Busca/Cria usuário
    let usuario = await usuariosService.findByEmail(email);

    if (!usuario) {
      const newUser = await usuariosService.create({
        nome,
        email,
        senha: Math.random().toString(36).slice(-8), // senha random
        foto_perfil,
      });
    }

    // Gera JWT
    const token = jwt.sign(
      {
        sub: usuario.id,
        email: usuario.email,
        nome: usuario.nome,
        foto_perfil: usuario.foto_perfil,
        is_active: usuario.is_active,
      },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    res.json({
      success: true,
      message: "Login realizado com sucesso!",
      token,
      usuario: {
        id: usuario.id,
        nome: usuario.nome,
        email: usuario.email,
        foto_perfil: usuario.foto_perfil,
      },
    });
  } catch (error) {
    next(error);
  }
};
