// @ts-nocheck
import db from "../../db.js";
import crypto from "crypto"; // Adicionar importação faltante
import jwt from "jsonwebtoken"; // Importar JWT

export const magicAuthService = {
  async generateToken(userId) {
    // Gera token único para o link
    const magicToken = crypto.randomBytes(32).toString("hex");

    // Gera JWT adicional para autenticação direta
    const authToken = jwt.sign(
      { sub: userId, type: "magic_link" },
      process.env.JWT_SECRET,
      { expiresIn: "15m" } // Expira em 15 minutos
    );

    await db("magic_tokens").insert({
      token: magicToken,
      auth_token: authToken, // Armazena também o JWT
      user_id: userId,
      expires_at: new Date(Date.now() + 15 * 60 * 1000),
    });

    return { magicToken, authToken }; // Retorna ambos tokens
  },
};
