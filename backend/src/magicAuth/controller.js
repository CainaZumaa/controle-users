// @ts-nocheck
import { usuariosService } from "../usuario/service.js";
import { sendMagicLinkEmail } from "./emailService.js";
import { magicAuthService } from "./magicAuthService.js";
import { testEmailConfiguration, sendWelcomeEmail } from "./emailService.js";

const isValid = await testEmailConfiguration();
console.log("Email config:", isValid ? "OK" : "ERRO");

export const magicAuthController = {
  async requestMagicLink(req, res) {
    try {
      const { email } = req.body;

      if (!email || !email.includes("@")) {
        return res.status(400).json({
          error: "Formato de email inválido",
        });
      }

      const user = await usuariosService.findByEmail(email);

      if (!user) {
        return res.status(404).json({
          error: "Email não encontrado",
          message: "Crie uma conta primeiro ou verifique o email digitado",
        });
      }

      // Gera ambos tokens
      const { magicToken, authToken } = await magicAuthService.generateToken(
        user.id
      );

      await sendMagicLinkEmail(user.email, magicToken, authToken);

      res.json({
        success: true,
        message: "Link enviado! (Em prod isso não seria exibido)",
        Link: `http://localhost:3000/auth/magic/verify?token=${magicToken}`,
        TokenJwt: authToken, // Apenas para desenvolvimento
      });
    } catch (error) {
      console.error(`Erro no magic link [${email}]:`, error.stack);
      res.status(500).json({
        error: "Erro ao enviar link",
        details: process.env.NODE_ENV === "development" ? error.message : null,
      });
    }
  },
};
